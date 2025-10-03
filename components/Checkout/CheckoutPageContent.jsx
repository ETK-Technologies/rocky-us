"use client";

import Loader from "@/components/Loader";
import CheckoutSkeleton from "@/components/ui/skeletons/CheckoutSkeleton";
import { useEffect, useState } from "react";
import BillingAndShipping from "./BillingAndShipping";
import CartAndPayment from "./CartAndPayment";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import {
  processUrlCartParameters,
  cleanupCartUrlParameters,
} from "@/utils/urlCartHandler";
import QuestionnaireNavbar from "../EdQuestionnaire/QuestionnaireNavbar";
import {
  log,
  logPayment,
  logOrder,
  logError,
  logDebug,
} from "@/lib/utils/logger";

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const CheckoutPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isEdFlow = searchParams.get("ed-flow") === "1";
  const isSmokingFlow = searchParams.get("smoking-flow") === "1";
  const onboardingAddToCart = searchParams.get("onboarding-add-to-cart");

  // Keep track of various flow parameters to preserve them after checkout
  const flowParams = {
    "ed-flow": searchParams.get("ed-flow"),
    "wl-flow": searchParams.get("wl-flow"),
    "hair-flow": searchParams.get("hair-flow"),
    "mh-flow": searchParams.get("mh-flow"),
    "smoking-flow": searchParams.get("smoking-flow"),
  };

  // Build flow query string to append to redirects
  const buildFlowQueryString = () => {
    const params = [];
    Object.entries(flowParams).forEach(([key, value]) => {
      if (value) {
        params.push(`${key}=${value}`);
      }
    });
    console.log("FLOW BUILDED -> ->", params);
    return params.length > 0 ? `&${params.join("&")}` : "";
  };

  const [submitting, setSubmitting] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [isProcessingUrlParams, setIsProcessingUrlParams] = useState(false);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoadingSavedCards, setIsLoadingSavedCards] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const [stripeElements, setStripeElements] = useState(null);
  const [isInitialLoadingComplete, setIsInitialLoadingComplete] =
    useState(false);
  const [formData, setFormData] = useState({
    additional_fields: [],
    shipping_address: {},
    billing_address: {},
    extensions: {
      "checkout-fields-for-blocks": {
        _meta_discreet: true,
        _meta_mail_box: true,
      },
    },
    payment_method: "stripe",
    payment_data: [
      {
        key: "wc-stripe-new-payment-method",
        value: "true",
      },
    ],
    customer_note: "",
    meta_data: [
      {
        key: "_meta_discreet",
        value: "0",
      },
      {
        key: "_meta_mail_box",
        value: "0",
      },
    ],
  });

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardType, setCardType] = useState("");
  const [saveCard, setSaveCard] = useState(true);

  // Retry mechanism state for saved card payments
  const [shouldUseDirectPayment, setShouldUseDirectPayment] = useState(false);
  const [savedOrderId, setSavedOrderId] = useState("");
  const [savedOrderKey, setSavedOrderKey] = useState("");

  // Function to check if cart contains Zonnic products
  const hasZonnicProducts = (cartItems) => {
    if (!cartItems || !cartItems.items || !Array.isArray(cartItems.items)) {
      return false;
    }

    return cartItems.items.some((item) => {
      // Check if the product name contains "zonnic" (case insensitive)
      return (
        item &&
        item.name &&
        typeof item.name === "string" &&
        item.name.toLowerCase().includes("zonnic")
      );
    });
  };

  // Function to update URL with smoking-flow parameter
  const updateUrlWithSmokingFlow = () => {
    // Only update if smoking-flow parameter is not already present
    if (!isSmokingFlow) {
      // Create a new URLSearchParams instance from the current search params
      const newParams = new URLSearchParams(window.location.search);
      newParams.set("smoking-flow", "1");

      // Update the URL without triggering a page reload
      const newUrl = `${window.location.pathname}?${newParams.toString()}`;
      window.history.replaceState({ path: newUrl }, "", newUrl);

      // Update the flowParams object
      flowParams["smoking-flow"] = "1";
    }
  };

  // Function to fetch cart items
  const fetchCartItems = async () => {
    try {
      const res = await fetch("/api/cart");
      const data = await res.json();

      // If we're coming from ED flow with specific products, verify the products are correct
      if (onboardingAddToCart) {
        const expectedProducts = onboardingAddToCart
          .split("%2C")
          .map((id) => id.trim());
        console.log("Expected product IDs from URL:", expectedProducts);

        // Check if products match what we expect
        if (data.items && data.items.length > 0) {
          console.log("First product in cart:", {
            id: data.items[0].id,
            name: data.items[0].name,
            product_id: data.items[0].product_id,
          });
        }
      }

      // Update cart items
      setCartItems(data);

      // Check for Zonnic products and update URL if necessary
      if (hasZonnicProducts(data)) {
        updateUrlWithSmokingFlow();
      }

      // Update form data with shipping and billing addresses
      setFormData((prev) => {
        return {
          ...prev,
          billing_address: data.billing_address || prev.billing_address,
          shipping_address: data.shipping_address || prev.shipping_address,
        };
      });

      return data;
    } catch (error) {
      logError("Error fetching cart items:", error);
      return null;
    }
  };

  // Function to create Payment Intent for new cards
  const createPaymentIntent = async () => {
    if (!cartItems?.totals || selectedCard) {
      console.log("Skipping Payment Intent creation:", {
        hasCartTotals: !!cartItems?.totals,
        hasSelectedCard: !!selectedCard,
      });
      return;
    }

    try {
      const totalAmount = cartItems.totals.total_price
        ? parseFloat(cartItems.totals.total_price) / 100
        : cartItems.totals.total
        ? parseFloat(cartItems.totals.total.replace(/[^0-9.]/g, ""))
        : 0;

      if (totalAmount <= 0) {
        console.log("Skipping Payment Intent creation for free order");
        return; // Skip for free orders
      }

      // Create a basic billing address if not available
      const billingAddress = formData.billing_address?.email
        ? {
            ...formData.billing_address,
            country: "US", // Always use USA
          }
        : {
            first_name: "Customer",
            last_name: "Name",
            email: "customer@example.com",
            address_1: "123 Main St",
            city: "City",
            state: "State",
            postcode: "12345",
            country: "US",
          };

      console.log("Creating Payment Intent with:", {
        amount: totalAmount,
        hasBillingAddress: !!formData.billing_address?.email,
        cartItemsCount: cartItems?.items?.length || 0,
        billingAddress: billingAddress,
      });

      const response = await fetch("/api/stripe/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
          currency: "USD",
          billingAddress: billingAddress,
          description: `Order payment for ${billingAddress.email}`,
          saveCard: saveCard,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setClientSecret(result.data.paymentIntent.client_secret);
        console.log(
          "✅ Payment Intent created successfully:",
          result.data.paymentIntent.id
        );
      } else {
        console.error("❌ Failed to create Payment Intent:", result.error);
        // Set a fallback message
        setClientSecret("error");
      }
    } catch (error) {
      console.error("❌ Error creating Payment Intent:", error);
      setClientSecret("error");
    }
  };

  // Function to fetch saved payment cards
  const fetchSavedCards = async () => {
    try {
      setIsLoadingSavedCards(true);
      console.log("Fetching saved cards from API...");

      // Fetch saved cards from Stripe API
      const res = await fetch("/api/stripe/payment-methods", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!res.ok) {
        logError("API returned error status:", res.status);
        throw new Error(`API error: ${res.status}`);
      }

      // Log the raw response
      console.log("API response status:", res.status);

      // Parse the response
      const data = await res.json();

      console.log("Saved cards API full response:", data);

      if (
        data.success &&
        data.cards &&
        Array.isArray(data.cards) &&
        data.cards.length > 0
      ) {
        console.log("Setting saved cards in state:", data.cards);
        setSavedCards(data.cards);

        // Set the default card as selected if available
        const defaultCard = data.cards.find((card) => card.is_default);
        if (defaultCard) {
          console.log("Setting default card as selected:", defaultCard);
          // Store the card object to have access to both id and token
          setSelectedCard(defaultCard);
        }
      } else {
        console.log("No saved cards found in API response or invalid format");
        setSavedCards([]);
      }
    } catch (error) {
      logError("Error fetching saved cards:", error);
      setSavedCards([]);
    } finally {
      setIsLoadingSavedCards(false);
    }
  };

  // Function to fetch user profile data
  const fetchUserProfile = async () => {
    try {
      // Check localStorage first for cached profile data
      const cachedProfileData = localStorage.getItem("userProfileData");
      let profileData = null;

      if (cachedProfileData) {
        try {
          profileData = JSON.parse(cachedProfileData);
          console.log(
            "Using cached profile data from localStorage:",
            profileData
          );
        } catch (e) {
          console.error("Error parsing cached profile data:", e);
        }
      }

      // If no cached data or it's older than 24 hours, fetch from API
      const shouldFetchFromApi =
        !profileData ||
        (profileData._cachedAt &&
          Date.now() - profileData._cachedAt > 24 * 60 * 60 * 1000);

      if (shouldFetchFromApi) {
        // Get user name from cookies if available
        const cookies = document.cookie.split(";").reduce((cookies, cookie) => {
          const [name, value] = cookie.trim().split("=");
          cookies[name] = value;
          return cookies;
        }, {});

        // Decode cookie values to prevent URL encoding issues
        const storedFirstName = decodeURIComponent(cookies.displayName || "");
        const storedUserName = decodeURIComponent(cookies.userName || "");

        // Fetch fresh profile data
        const res = await fetch("/api/profile");
        const data = await res.json();

        if (data.success) {
          console.log("User profile data fetched successfully from API:", data);

          // Add timestamp and save to localStorage
          data._cachedAt = Date.now();
          localStorage.setItem("userProfileData", JSON.stringify(data));

          profileData = data;
        } else {
          console.log("No user profile data available or user not logged in");
          return;
        }
      }

      if (profileData) {
        // Get user name from cookies if available (even if using cached data)
        const cookies = document.cookie.split(";").reduce((cookies, cookie) => {
          const [name, value] = cookie.trim().split("=");
          cookies[name] = value;
          return cookies;
        }, {});

        // Decode cookie values to prevent URL encoding issues
        const storedFirstName = decodeURIComponent(cookies.displayName || "");
        const storedUserName = decodeURIComponent(cookies.userName || "");

        // Update form data with user profile information
        setFormData((prev) => {
          // Create updated billing address with user data
          const updatedBillingAddress = {
            ...prev.billing_address,
            // Use cookie data first, then fall back to API data - with decoding for URL encoded values
            first_name:
              storedFirstName ||
              profileData.first_name ||
              prev.billing_address.first_name ||
              "",
            last_name: storedUserName
              ? decodeURIComponent(storedUserName)
                  .replace(storedFirstName, "")
                  .trim()
              : profileData.last_name || prev.billing_address.last_name || "",
            email: profileData.email || prev.billing_address.email || "",
            phone: profileData.phone || prev.billing_address.phone || "",
            address_1:
              profileData.billing_address_1 ||
              prev.billing_address.address_1 ||
              "",
            address_2:
              profileData.billing_address_2 ||
              prev.billing_address.address_2 ||
              "",
            city: profileData.billing_city || prev.billing_address.city || "",
            state:
              profileData.billing_state ||
              profileData.province ||
              prev.billing_address.state ||
              "",
            postcode:
              profileData.billing_postcode ||
              prev.billing_address.postcode ||
              "",
            country: profileData.billing_country || "CA",
            // Add the date of birth field to billing address
            date_of_birth:
              profileData.date_of_birth ||
              profileData.raw_profile_data?.custom_meta?.date_of_birth ||
              "",
          };

          // Create updated shipping address with user data
          const updatedShippingAddress = {
            ...prev.shipping_address,
            // Use cookie data first, then fall back to API data
            first_name:
              storedFirstName ||
              profileData.first_name ||
              prev.shipping_address.first_name ||
              "",
            last_name: storedUserName
              ? decodeURIComponent(storedUserName)
                  .replace(storedFirstName, "")
                  .trim()
              : profileData.last_name || prev.shipping_address.last_name || "",
            phone: profileData.phone || prev.shipping_address.phone || "",
            address_1:
              profileData.shipping_address_1 ||
              profileData.billing_address_1 ||
              prev.shipping_address.address_1 ||
              "",
            address_2:
              profileData.shipping_address_2 ||
              profileData.billing_address_2 ||
              prev.shipping_address.address_2 ||
              "",
            city:
              profileData.shipping_city ||
              profileData.billing_city ||
              prev.shipping_address.city ||
              "",
            state:
              profileData.shipping_state ||
              profileData.billing_state ||
              profileData.province ||
              prev.shipping_address.state ||
              "",
            postcode:
              profileData.shipping_postcode ||
              profileData.billing_postcode ||
              prev.shipping_address.postcode ||
              "",
            country: profileData.shipping_country || "CA",
            // Add the date of birth field to shipping address
            date_of_birth:
              profileData.date_of_birth ||
              profileData.raw_profile_data?.custom_meta?.date_of_birth ||
              "",
          };

          console.log(
            "Updated billing address with DOB:",
            updatedBillingAddress
          );

          return {
            ...prev,
            billing_address: updatedBillingAddress,
            shipping_address: updatedShippingAddress,
            // Also add date_of_birth at the form data root level for accessibility
            date_of_birth:
              profileData.date_of_birth ||
              profileData.raw_profile_data?.custom_meta?.date_of_birth ||
              "",
          };
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Initial loading of cart and processing URL parameters
  useEffect(() => {
    // Reset retry mechanism state on page load/refresh
    setShouldUseDirectPayment(false);
    setSavedOrderId("");
    setSavedOrderKey("");

    // Initialize loading
    const loadCheckoutData = async () => {
      try {
        // Start all data loading operations in parallel
        const cartPromise = fetchCartItems();

        let finalCartData = null;

        // Process URL parameters if needed
        if (onboardingAddToCart) {
          setIsProcessingUrlParams(true);
          const urlParamsPromise = processUrlCartParameters(searchParams);

          // Wait for cart to load first as we need it for proper display
          const cartData = await cartPromise;
          setCartItems(cartData);
          finalCartData = cartData;

          // Process URL parameters and wait for completion
          const urlResult = await urlParamsPromise;

          if (urlResult.status === "success") {
            // Refresh cart after adding products
            const updatedCart = await fetchCartItems();
            setCartItems(updatedCart);
            finalCartData = updatedCart; // Use the updated cart data
            toast.success("Products added to your cart!");

            // Clean up URL parameters - use the detected flow type from result
            cleanupCartUrlParameters(
              urlResult.flowType ||
                (isEdFlow
                  ? "ed"
                  : flowParams["hair-flow"]
                  ? "hair"
                  : flowParams["wl-flow"]
                  ? "wl"
                  : flowParams["mh-flow"]
                  ? "mh"
                  : "general")
            );
          } else if (urlResult.status === "error") {
            toast.error(urlResult.message || "Failed to add products to cart.");
          }

          setIsProcessingUrlParams(false);
        } else {
          // If no URL parameters to process, just set the cart items
          const cartData = await cartPromise;
          setCartItems(cartData);
          finalCartData = cartData;
        }

        // Start other data loading operations in parallel
        // These don't depend on the cart or URL processing
        await Promise.all([fetchSavedCards(), fetchUserProfile()]);

        // Mark initial loading as complete
        setIsInitialLoadingComplete(true);

        // Create Payment Intent after ALL loading operations are complete
        // This ensures cart is fully loaded and URL parameters are processed
        console.log("All loading operations complete, initializing payment...");
        console.log(
          "Final cart items count:",
          finalCartData?.items?.length || 0
        );
        console.log("Final cart totals:", finalCartData?.totals);

        // Only create payment intent if we have items in cart
        if (finalCartData?.items && finalCartData.items.length > 0) {
          console.log("Cart has items, initializing payment...");
          setTimeout(() => {
            createPaymentIntent();
          }, 500); // Small delay to ensure all state is properly set
        } else {
          console.log("No items in cart, skipping payment initialization");
        }
      } catch (error) {
        console.error("Error loading checkout data:", error);
        toast.error(
          "There was an issue loading your checkout data. Please refresh the page."
        );
      }
    };

    loadCheckoutData();
  }, []);

  // Recreate Payment Intent when billing address is updated
  useEffect(() => {
    if (cartItems?.totals && !selectedCard && formData.billing_address?.email) {
      createPaymentIntent();
    }
  }, [formData.billing_address?.email]);

  // Initialize payment when cart items are added after initial load
  useEffect(() => {
    if (
      isInitialLoadingComplete &&
      cartItems?.items &&
      cartItems.items.length > 0 &&
      !clientSecret &&
      !selectedCard
    ) {
      console.log(
        "Cart items detected after initial load, initializing payment..."
      );
      setTimeout(() => {
        createPaymentIntent();
      }, 300);
    }
  }, [cartItems?.items, isInitialLoadingComplete, clientSecret, selectedCard]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      // Check if shipping address fields are empty, if so, use billing address
      const useShippingAddress =
        formData.shipping_address.ship_to_different_address;

      // Create the data object to send
      const dataToSend = {
        // Billing Details
        firstName: formData.billing_address.first_name,
        lastName: formData.billing_address.last_name,
        addressOne: formData.billing_address.address_1,
        addressTwo: formData.billing_address.address_2,
        city: formData.billing_address.city,
        state: formData.billing_address.state,
        postcode: formData.billing_address.postcode,
        country: formData.billing_address.country,
        phone: formData.billing_address.phone,
        email: formData.billing_address.email,

        // Shipping Details - use billing address if shipping address is not explicitly specified
        shipToAnotherAddress: useShippingAddress || false,
        shippingFirstName: useShippingAddress
          ? formData.shipping_address.first_name
          : formData.billing_address.first_name,
        shippingLastName: useShippingAddress
          ? formData.shipping_address.last_name
          : formData.billing_address.last_name,
        shippingAddressOne: useShippingAddress
          ? formData.shipping_address.address_1
          : formData.billing_address.address_1,
        shippingAddressTwo: useShippingAddress
          ? formData.shipping_address.address_2
          : formData.billing_address.address_2,
        shippingCity: useShippingAddress
          ? formData.shipping_address.city
          : formData.billing_address.city,
        shippingState: useShippingAddress
          ? formData.shipping_address.state
          : formData.billing_address.state,
        shippingPostCode: useShippingAddress
          ? formData.shipping_address.postcode
          : formData.billing_address.postcode,
        shippingCountry: useShippingAddress
          ? formData.shipping_address.country
          : formData.billing_address.country || "CA",
        shippingPhone: useShippingAddress
          ? formData.shipping_address.phone
          : formData.billing_address.phone,

        // Delivery Details
        discreet:
          formData.extensions["checkout-fields-for-blocks"]._meta_discreet,
        toMailBox:
          formData.extensions["checkout-fields-for-blocks"]._meta_mail_box,
        customerNotes: formData.customer_note,

        // Payment Details
        cardNumber: selectedCard ? "" : cardNumber,
        cardType: selectedCard ? "" : cardType,
        cardExpMonth: selectedCard ? "" : expiry.slice(0, 2),
        cardExpYear: selectedCard ? "" : expiry.slice(3),
        cardCVD: selectedCard ? "" : cvc,

        // If using a saved card, include the token and id
        savedCardToken: selectedCard ? selectedCard.token : null,
        savedCardId: selectedCard ? selectedCard.id : null,
        useSavedCard: !!selectedCard,

        // Add total amount for saved card payments
        totalAmount: cartItems?.totals?.total_price
          ? parseFloat(cartItems.totals.total_price) / 100
          : cartItems?.totals?.total
          ? parseFloat(cartItems.totals.total.replace(/[^0-9.]/g, ""))
          : 0,

        // ED Flow parameter
        isEdFlow: isEdFlow,

        // Payment Method
        paymentMethod: "stripe_cc", // Use Stripe credit card payment method

        // Stripe payment data array - will be populated with actual client_secret
        payment_data: [],
      };

      // Enhanced client-side logging
      console.log("Client-side checkout data:", {
        ...dataToSend,
        cardNumber: dataToSend.cardNumber ? "[REDACTED]" : "",
        cardCVD: dataToSend.cardCVD ? "[REDACTED]" : "",
        cartTotals: cartItems?.totals,
        selectedCardId: selectedCard,
        totalAmount: dataToSend.totalAmount,
      });

      // Check for zero-amount orders (100% coupon discount)
      const isFreeOrder = dataToSend.totalAmount === 0;

      if (isFreeOrder) {
        console.log("Processing free order with 100% coupon discount");

        try {
          // Create order directly in WooCommerce with free payment method
          const freeOrderResponse = await fetch("/api/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...dataToSend,
              // Clear card details for free orders
              cardNumber: "",
              cardExpMonth: "",
              cardExpYear: "",
              cardCVD: "",
              useSavedCard: false,
              savedCardToken: null,
              savedCardId: null,
              // Flag to indicate this is a free order
              isFreeOrder: true,
              paymentMethod: "coupon_100_percent",
              // Add origin for headless checkout (free orders don't have payment_intent_id)
              origin: "headless",
            }),
          });

          const freeOrderData = await freeOrderResponse.json();

          if (freeOrderData.error) {
            toast.error(freeOrderData.error);
            setSubmitting(false);
            return;
          }

          const order_id = freeOrderData.data.id || freeOrderData.data.order_id;
          const order_key = freeOrderData.data.order_key || "";

          console.log("✅ Free order created successfully:", {
            order_id,
            order_key,
            totalAmount: dataToSend.totalAmount,
          });

          toast.success(
            "Order created successfully with 100% coupon discount!"
          );

          // Empty the cart after successful payment
          try {
            const emptyCartResponse = await fetch("/api/cart/empty", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (emptyCartResponse.ok) {
              console.log("Cart emptied successfully after free order");
              // Update local cart state to reflect empty cart
              setCartItems({
                items: [],
                total_items: 0,
                total_price: "0.00",
                needs_shipping: false,
                coupons: [],
                shipping_rates: [],
              });
            } else {
              console.error("Failed to empty cart after free order");
            }
          } catch (cartError) {
            console.error("Error emptying cart after free order:", cartError);
            // Don't fail the redirect if cart emptying fails
          }

          // Redirect to order received page
          router.push(
            `/checkout/order-received/${order_id}?key=${order_key}${buildFlowQueryString()}`
          );
          return;
        } catch (error) {
          console.error("Error processing free order:", error);
          toast.error("Unable to process free order. Please try again.");
          setSubmitting(false);
          return;
        }
      }

      // For saved cards, we'll use a two-step approach but check for duplicate payments
      if (selectedCard && cartItems?.totals) {
        try {
          console.log(
            `Processing checkout with saved card: ${selectedCard.id}`
          );

          let orderId = savedOrderId;
          let orderKey = savedOrderKey;

          // Check if we should use direct payment (retry scenario)
          if (shouldUseDirectPayment && savedOrderId) {
            console.log(
              `Using direct payment for existing order: ${savedOrderId}`
            );
          } else {
            // Step 1: Call standard checkout to create the order
            const checkoutResponse = await fetch("/api/checkout", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...dataToSend,
                // Add origin for headless checkout (saved card flow doesn't have payment_intent_id yet)
                origin: "headless",
              }),
            });

            const checkoutResult = await checkoutResponse.json();
            console.log("Initial checkout result:", checkoutResult);

            // Check if payment was already successful in the initial checkout
            // This shouldn't happen but we'll check just in case
            if (
              checkoutResult.success &&
              checkoutResult.data?.payment_result?.payment_status === "success"
            ) {
              logPayment("Payment already successful in initial checkout!");
              toast.success(
                "Order created and payment processed successfully!"
              );

              logOrder("🎉 SAVED CARD SUCCESS! Payment processed:", {
                order_id: checkoutResult.data.id,
                order_key: checkoutResult.data.order_key,
                payment_result: checkoutResult.data.payment_result,
              });

              router.push(
                `/checkout/order-received/${checkoutResult.data.id}?key=${
                  checkoutResult.data.order_key || ""
                }${buildFlowQueryString()}`
              );
              return;
            }

            // If we got an order ID and payment failed (expected for saved cards)
            if (checkoutResult.details && checkoutResult.details.order_id) {
              orderId = checkoutResult.details.order_id;
              orderKey = checkoutResult.details.order_key || "";
              console.log(
                `Order created with ID: ${orderId}, now processing payment`
              );

              // Before processing payment, check the order status to avoid duplicate payments
              try {
                const orderCheckResponse = await fetch(
                  `/api/order/status?id=${orderId}`
                );
                const orderStatus = await orderCheckResponse.json();

                if (
                  orderStatus.status === "processing" ||
                  orderStatus.status === "on-hold" ||
                  orderStatus.status === "completed" ||
                  orderStatus.success === false
                ) {
                  console.log(
                    "Order is already paid or being processed, skipping payment"
                  );
                  toast.success("Order is already being processed!");

                  // Redirect to order received page
                  router.push(
                    `/checkout/order-received/${orderId}?key=${orderKey}${buildFlowQueryString()}`
                  );
                  return;
                }
              } catch (orderCheckError) {
                console.log("Error checking order status:", orderCheckError);
                // Continue with payment if we can't check the status
              }
            } else if (checkoutResult.error) {
              // Something else went wrong
              toast.error(checkoutResult.error || "Failed to create order");
              setSubmitting(false);
              return;
            }
          }

          // Step 2: Process the payment with the saved card
          const paymentResponse = await fetch(
            "/api/pay-order-with-saved-card",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: orderId,
                savedCardToken: selectedCard.token,
                cardId: selectedCard.id,
                cvv: "",
                // Include billing address for address verification
                billing_address: {
                  first_name: formData.billing_address.first_name,
                  last_name: formData.billing_address.last_name,
                  address_1: formData.billing_address.address_1,
                  address_2: formData.billing_address.address_2 || "",
                  city: formData.billing_address.city,
                  state: formData.billing_address.state,
                  postcode: formData.billing_address.postcode,
                  country: formData.billing_address.country || "CA",
                  email: formData.billing_address.email,
                  phone: formData.billing_address.phone,
                },
              }),
            }
          );

          const paymentResult = await paymentResponse.json();
          logPayment("Payment result:", paymentResult);

          if (!paymentResult.success) {
            // Store order details for retry mechanism
            setSavedOrderId(orderId);
            setSavedOrderKey(orderKey);
            setShouldUseDirectPayment(true);

            toast.error(
              paymentResult.message ||
                "Payment failed. Please try another payment method."
            );
            setSubmitting(false);
            return;
          }

          // Successfully created order and processed payment
          // Reset retry mechanism state on success
          setShouldUseDirectPayment(false);
          setSavedOrderId("");
          setSavedOrderKey("");

          toast.success("Order created and payment processed successfully!");

          // Get the order ID and key from the payment result
          const paymentOrderId = paymentResult.order_id;
          const paymentOrderKey = paymentResult.order_key || "";

          // Empty the cart after successful payment
          try {
            const emptyCartResponse = await fetch("/api/cart/empty", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (emptyCartResponse.ok) {
              console.log("Cart emptied successfully after saved card payment");
              // Update local cart state to reflect empty cart
              setCartItems({
                items: [],
                total_items: 0,
                total_price: "0.00",
                needs_shipping: false,
                coupons: [],
                shipping_rates: [],
              });
            } else {
              console.error("Failed to empty cart after saved card payment");
            }
          } catch (cartError) {
            console.error(
              "Error emptying cart after saved card payment:",
              cartError
            );
            // Don't fail the redirect if cart emptying fails
          }

          logOrder("🎉 SAVED CARD PAYMENT SUCCESS!", {
            paymentOrderId,
            paymentOrderKey,
            paymentResult: paymentResult,
          });

          router.push(
            `/checkout/order-received/${paymentOrderId}?key=${paymentOrderKey}${buildFlowQueryString()}`
          );
          return;
        } catch (error) {
          console.error("Error processing order with saved card:", error);
          toast.error(
            "Unable to process payment with saved card. Please try another payment method."
          );
          setSubmitting(false);
          return;
        }
      }

      // For new cards, use WooCommerce AJAX API approach (MD file method)
      if (!selectedCard) {
        try {
          console.log(
            "Processing new card payment using WooCommerce AJAX API approach"
          );

          // Step 1: Create order WITHOUT payment processing
          const orderPayload = {
            ...dataToSend,
            // Clear sensitive card details
            cardNumber: "",
            cardExpMonth: "",
            cardExpYear: "",
            cardCVD: "",
            origin: "headless",
            // NO payment_intent_id - we'll create it after order
            payment_data: [], // Empty array - no payment processing
            useSavedCard: false,
          };

          console.log("Creating order WITHOUT payment processing:", {
            origin: "headless",
            payment_data: "[] (empty)",
            note: "Will create PaymentIntent via WooCommerce AJAX API after order creation",
          });

          const orderResponse = await fetch("/api/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(orderPayload),
          });

          const orderData = await orderResponse.json();

          if (orderData.error) {
            console.error("Order creation failed:", orderData.error);
            toast.error(orderData.error || "Order creation failed");
            return;
          }

          if (!orderData.success) {
            console.error("Order creation failed:", orderData);
            toast.error("Failed to create order");
            return;
          }

          const order_id = orderData.data.id || orderData.data.order_id;
          const order_key = orderData.data.order_key || "";

          console.log("✅ Order created successfully:", {
            order_id,
            order_key,
            note: "No PaymentIntent created yet - will create via AJAX API",
          });

          // Step 2: Process payment via WooCommerce AJAX API
          console.log("Processing payment via WooCommerce AJAX API...");

          const processPaymentResponse = await fetch(
            "/api/woocommerce/stripe/process-payment",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                payment_request_type: "apple_pay", // Can be apple_pay, google_pay, payment_request_api
                shipping_address: formData.shipping_address,
                billing_address: formData.billing_address,
              }),
            }
          );

          const processPaymentData = await processPaymentResponse.json();

          if (!processPaymentData.success) {
            console.error(
              "Payment processing failed:",
              processPaymentData.error
            );

            // Provide specific error messages
            let errorMessage = "Failed to process payment. Please try again.";
            if (processPaymentData.error) {
              if (processPaymentData.error.includes("nonce")) {
                errorMessage =
                  "Security verification failed. Please refresh the page and try again.";
              } else if (processPaymentData.error.includes("cart")) {
                errorMessage =
                  "Cart is empty or invalid. Please add items and try again.";
              } else if (processPaymentData.error.includes("payment")) {
                errorMessage =
                  "Payment method not available. Please try a different payment method.";
              }
            }

            toast.error(errorMessage);
            return;
          }

          console.log(
            "✅ Payment processed via WooCommerce AJAX API:",
            processPaymentData.data
          );

          // Extract order details from the response
          const stripeOrderId = processPaymentData.data.order_id;
          const stripeOrderKey = processPaymentData.data.order_key;
          const clientSecret = processPaymentData.data.client_secret;
          const paymentIntentId = processPaymentData.data.payment_intent_id;

          console.log("✅ Stripe order details:", {
            stripe_order_id: stripeOrderId,
            stripe_order_key: stripeOrderKey,
            payment_intent_id: paymentIntentId,
            client_secret: clientSecret ? "***" : "none",
          });

          // Step 3: Confirm payment with Stripe Elements
          const stripe = await stripePromise;
          if (!stripe) {
            toast.error("Stripe is not initialized. Please refresh the page.");
            return;
          }

          if (!stripeElements) {
            toast.error("Payment form not ready. Please try again.");
            return;
          }

          console.log("Confirming payment with Stripe Elements...");

          const { error, paymentIntent } = await stripe.confirmPayment({
            elements: stripeElements,
            confirmParams: {
              return_url: `${window.location.origin}/checkout/confirmation`,
              payment_method_data: {
                billing_details: {
                  name: `${formData.billing_address.first_name} ${formData.billing_address.last_name}`,
                  email: formData.billing_address.email,
                  phone: formData.billing_address.phone,
                  address: {
                    line1: formData.billing_address.address_1,
                    line2: formData.billing_address.address_2 || undefined,
                    city: formData.billing_address.city,
                    state: formData.billing_address.state,
                    postal_code: formData.billing_address.postcode,
                    country: formData.billing_address.country || "US",
                  },
                },
              },
            },
            redirect: "if_required",
          });

          if (error) {
            console.error("Payment confirmation failed:", error);
            toast.error(`Payment failed: ${error.message}`);
            return;
          }

          if (
            paymentIntent.status !== "succeeded" &&
            paymentIntent.status !== "requires_capture"
          ) {
            console.error("Payment not in valid state:", paymentIntent.status);
            toast.error("Payment confirmation failed. Please try again.");
            return;
          }

          console.log("✅ Payment confirmed successfully:", {
            payment_intent_id: paymentIntent.id,
            status: paymentIntent.status,
            amount: paymentIntent.amount,
          });

          // Step 4: Update order status via WooCommerce AJAX API
          console.log("Updating order status via WooCommerce AJAX API...");

          const updateResponse = await fetch(
            "/api/woocommerce/stripe/update-order-status",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                order_id: stripeOrderId || order_id,
                payment_intent_id: paymentIntent.id,
                payment_status: paymentIntent.status,
                payment_method_id: paymentIntent.payment_method,
                customer_id: paymentIntent.customer,
              }),
            }
          );

          const updateData = await updateResponse.json();

          if (!updateData.success) {
            console.error("Order status update failed:", updateData.error);

            // Provide more specific error messages for order status update
            let errorMessage =
              "Payment succeeded but failed to update order. Please contact support.";
            if (updateData.error) {
              if (updateData.error.includes("nonce")) {
                errorMessage =
                  "Payment succeeded but security verification failed. Please contact support.";
              } else if (updateData.error.includes("order")) {
                errorMessage =
                  "Payment succeeded but order update failed. Please contact support.";
              } else if (updateData.error.includes("payment_intent")) {
                errorMessage =
                  "Payment succeeded but payment verification failed. Please contact support.";
              }
            }

            toast.error(errorMessage);

            // Log the successful payment even if order update failed
            logOrder("⚠️ PAYMENT SUCCESS BUT ORDER UPDATE FAILED:", {
              order_id,
              payment_intent_id: paymentIntent.id,
              payment_status: paymentIntent.status,
              update_error: updateData.error,
            });

            return;
          }

          console.log("✅ Order status updated successfully:", {
            order_id,
            payment_intent_id: paymentIntent.id,
            payment_status: paymentIntent.status,
            order_status: updateData.data?.status,
          });

          logOrder("🎉 PAYMENT SUCCESS WITH AJAX API!", {
            order_id,
            payment_intent_id: paymentIntent.id,
            payment_status: paymentIntent.status,
            method: "WooCommerce AJAX API",
          });

          // Step 5: Empty the cart after successful payment
          try {
            const emptyCartResponse = await fetch("/api/cart/empty", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (emptyCartResponse.ok) {
              console.log("Cart emptied successfully after payment");
              setCartItems({
                items: [],
                total_items: 0,
                total_price: "0.00",
                needs_shipping: false,
                coupons: [],
                shipping_rates: [],
              });
            } else {
              console.error("Failed to empty cart after payment");
            }
          } catch (cartError) {
            console.error("Error emptying cart after payment:", cartError);
          }

          // Final success message
          toast.success("Payment successful! Your order has been placed.");

          // Redirect to order received page
          router.push(
            `/checkout/order-received/${stripeOrderId || order_id}?key=${
              stripeOrderKey || order_key
            }${buildFlowQueryString()}`
          );
          return;
        } catch (error) {
          console.error("Error processing payment handle checkout:", error);
          toast.error("Payment processing failed. Please try again.");
          return;
        }
      } else {
        // Fallback to regular WooCommerce checkout for non-card payments
        // Update payment_data to use proper WooCommerce Stripe plugin format
        const fallbackData = {
          ...dataToSend,
          // Add origin for headless checkout (fallback flow doesn't have payment_intent_id)
          origin: "headless",
          payment_data: [
            {
              key: "wc-stripe-new-payment-method",
              value: "true",
            },
            {
              key: "wc-stripe-capture-method",
              value: "manual",
            },
          ],
        };

        const res = await fetch("/api/checkout", {
          method: "POST",
          body: JSON.stringify(fallbackData),
        });

        const data = await res.json();

        if (data.error) {
          toast.error(data.error);
          return;
        }

        if (data.success) {
          toast.success("Order created successfully!");
          const order_id = data.data.id || data.data.order_id;
          const order_key = data.data.order_key || "";

          logOrder("🎉 SUCCESS! Order created:", {
            order_id,
            order_key,
            full_response: data,
          });

          // Empty the cart after successful order creation
          try {
            const emptyCartResponse = await fetch("/api/cart/empty", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (emptyCartResponse.ok) {
              console.log(
                "Cart emptied successfully after WooCommerce checkout"
              );
              // Update local cart state to reflect empty cart
              setCartItems({
                items: [],
                total_items: 0,
                total_price: "0.00",
                needs_shipping: false,
                coupons: [],
                shipping_rates: [],
              });
            } else {
              console.error("Failed to empty cart after WooCommerce checkout");
            }
          } catch (cartError) {
            console.error(
              "Error emptying cart after WooCommerce checkout:",
              cartError
            );
            // Don't fail the redirect if cart emptying fails
          }

          router.push(
            `/checkout/order-received/${order_id}?key=${order_key}${buildFlowQueryString()}`
          );
        }
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error(
        "There was an error processing your order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Show loading indicator if cart is not yet loaded, URL parameters are being processed, or initial loading is not complete
  if (!cartItems || isProcessingUrlParams || !isInitialLoadingComplete) {
    return <CheckoutSkeleton />;
  }

  // Check if cart is empty
  if (!cartItems.items || cartItems.items.length === 0) {
    return (
      <>
        <QuestionnaireNavbar />
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6">
              You don't have any products in your cart yet. Browse our products
              and add some items to get started.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/")}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Products
              </button>
              <button
                onClick={() => router.push("/ed")}
                className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                ED Treatment
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <QuestionnaireNavbar />
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-100px)] border-t">
        {submitting && <Loader />}
        <BillingAndShipping setFormData={setFormData} formData={formData} />
        {clientSecret && clientSecret !== "error" ? (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: clientSecret,
              appearance: {
                theme: "stripe",
              },
              locale: "en",
              country: "US",
            }}
          >
            <CartAndPayment
              items={cartItems.items}
              cartItems={cartItems}
              setCartItems={setCartItems}
              setFormData={setFormData}
              formData={formData}
              handleSubmit={handleSubmit}
              cardNumber={cardNumber}
              setCardNumber={setCardNumber}
              expiry={expiry}
              setExpiry={setExpiry}
              cvc={cvc}
              setCvc={setCvc}
              cardType={cardType}
              setCardType={setCardType}
              isEdFlow={isEdFlow}
              savedCards={savedCards}
              setSavedCards={setSavedCards}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              isLoadingSavedCards={isLoadingSavedCards}
              saveCard={saveCard}
              setSaveCard={setSaveCard}
              amount={
                cartItems?.totals?.total_price
                  ? parseFloat(cartItems.totals.total_price) / 100
                  : cartItems?.total_price
                  ? parseFloat(cartItems.total_price)
                  : 0
              }
              billingAddress={formData.billing_address}
              clientSecret={clientSecret}
              onElementsReady={setStripeElements}
            />
          </Elements>
        ) : (
          <CartAndPayment
            items={cartItems.items}
            cartItems={cartItems}
            setCartItems={setCartItems}
            setFormData={setFormData}
            formData={formData}
            handleSubmit={handleSubmit}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiry={expiry}
            setExpiry={setExpiry}
            cvc={cvc}
            setCvc={setCvc}
            cardType={cardType}
            setCardType={setCardType}
            isEdFlow={isEdFlow}
            savedCards={savedCards}
            setSavedCards={setSavedCards}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            isLoadingSavedCards={isLoadingSavedCards}
            saveCard={saveCard}
            setSaveCard={setSaveCard}
            amount={
              cartItems?.totals?.total_price
                ? parseFloat(cartItems.totals.total_price) / 100
                : cartItems?.total_price
                ? parseFloat(cartItems.total_price)
                : 0
            }
            billingAddress={formData.billing_address}
            clientSecret={clientSecret}
            onElementsReady={setStripeElements}
          />
        )}
      </div>
    </>
  );
};

// Wrap the checkout component with Stripe Elements provider
const CheckoutWithElements = () => {
  return <CheckoutPageContent />;
};

export default CheckoutWithElements;
