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
    if (!cartItems?.totals || selectedCard) return;

    try {
      const totalAmount = cartItems.totals.total_price
        ? parseFloat(cartItems.totals.total_price) / 100
        : cartItems.totals.total
        ? parseFloat(cartItems.totals.total.replace(/[^0-9.]/g, ""))
        : 0;

      if (totalAmount <= 0) return; // Skip for free orders

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
          "Payment Intent created successfully:",
          result.data.paymentIntent.id
        );
      } else {
        console.error("Failed to create Payment Intent:", result.error);
        // Set a fallback message
        setClientSecret("error");
      }
    } catch (error) {
      console.error("Error creating Payment Intent:", error);
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

        // Process URL parameters if needed
        if (onboardingAddToCart) {
          setIsProcessingUrlParams(true);
          const urlParamsPromise = processUrlCartParameters(searchParams);

          // Wait for cart to load first as we need it for proper display
          const cartData = await cartPromise;
          setCartItems(cartData);

          // Then process the URL parameters in parallel with other data loading
          urlParamsPromise
            .then((result) => {
              if (result.status === "success") {
                // Refresh cart after adding products
                fetchCartItems().then((updatedCart) => {
                  setCartItems(updatedCart);
                  toast.success("Products added to your cart!");
                });

                // Clean up URL parameters - use the detected flow type from result
                cleanupCartUrlParameters(
                  result.flowType ||
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
              } else if (result.status === "error") {
                toast.error(
                  result.message || "Failed to add products to cart."
                );
              }
            })
            .finally(() => {
              setIsProcessingUrlParams(false);
            });
        } else {
          // If no URL parameters to process, just set the cart items
          const cartData = await cartPromise;
          setCartItems(cartData);
        }

        // Start other data loading operations in parallel
        // These don't depend on the cart or URL processing
        Promise.all([fetchSavedCards(), fetchUserProfile()]);

        // Create Payment Intent after cart is loaded
        setTimeout(() => {
          createPaymentIntent();
        }, 1000); // Small delay to ensure cart state is set
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

        // Stripe payment data array
        payment_data: [
          {
            key: "stripe_source",
            value: "src_xxxxxxxxxxxxx", // Replace with actual Stripe payment source
          },
          {
            key: "billing_email",
            value: formData.billing_address.email,
          },
          {
            key: "billing_first_name",
            value: formData.billing_address.first_name,
          },
          {
            key: "billing_last_name",
            value: formData.billing_address.last_name,
          },
          {
            key: "paymentMethod",
            value: "stripe",
          },
          {
            key: "paymentRequestType",
            value: "cc",
          },
          {
            key: "wc-stripe-new-payment-method",
            value: true,
          },
        ],
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
              body: JSON.stringify(dataToSend),
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

      // For new cards, use Payment Element with manual capture
      if (!selectedCard && clientSecret) {
        try {
          console.log(
            "Processing new card payment with Payment Element and manual capture"
          );

          // Step 1: Confirm the payment with Stripe Payment Element
          const stripe = await stripePromise;
          if (!stripe) {
            toast.error("Stripe is not initialized. Please refresh the page.");
            return;
          }

          // For Payment Element, we need to confirm the payment first
          console.log("Confirming Payment Element payment...");

          // Use the Elements instance from the Payment component
          if (!stripeElements) {
            toast.error("Payment form not ready. Please try again.");
            return;
          }

          console.log("Using Elements instance for confirmation:", {
            elementsType: typeof stripeElements,
            elementsConstructor: stripeElements?.constructor?.name,
            hasElements: !!stripeElements,
          });

          // Confirm the payment using the Payment Element
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

          console.log("Payment authorized successfully:", {
            status: paymentIntent.status,
            id: paymentIntent.id,
            amount: paymentIntent.amount,
          });

          console.log("Payment confirmed successfully:", {
            paymentIntentId: paymentIntent.id,
            status: paymentIntent.status,
            amount: paymentIntent.amount,
          });

          // Step 2: Assemble the Store API checkout payload with confirmed payment intent
          const payload = {
            ...dataToSend,
            // Clear sensitive card details - we now have the confirmed payment
            cardNumber: "",
            cardExpMonth: "",
            cardExpYear: "",
            cardCVD: "",
            // Update payment_data with confirmed payment intent for manual capture
            payment_data: [
              {
                key: "stripe_source",
                value: paymentIntent.id, // Use the confirmed payment intent ID
              },
              {
                key: "billing_email",
                value: formData.billing_address.email,
              },
              {
                key: "billing_first_name",
                value: formData.billing_address.first_name,
              },
              {
                key: "billing_last_name",
                value: formData.billing_address.last_name,
              },
              {
                key: "paymentMethod",
                value: "stripe_cc",
              },
              {
                key: "paymentRequestType",
                value: "cc",
              },
              {
                key: "wc-stripe-new-payment-method",
                value: true,
              },
              {
                key: "capture_method",
                value: "manual",
              },
            ],
            useSavedCard: false,
          };

          console.log(
            "Checkout payload with confirmed Stripe payment intent:",
            {
              ...payload,
              payment_data: payload.payment_data.map((item) => ({
                ...item,
                value: item.key === "stripe_source" ? "***" : item.value,
              })),
              paymentIntentId: paymentIntent.id,
            }
          );

          // Step 3: POST to /wc/store/v1/checkout (via our API)
          const checkoutResponse = await fetch("/api/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const checkoutData = await checkoutResponse.json();

          // Step 4: Handle the response
          if (checkoutData.error) {
            console.error(
              "Checkout with payment handle failed:",
              checkoutData.error
            );
            toast.error(checkoutData.error || "Checkout failed");
            return;
          }

          if (checkoutData.success) {
            const order_id = checkoutData.data.id || checkoutData.data.order_id;
            const order_key = checkoutData.data.order_key || "";

            logOrder("🎉 ORDER CREATED SUCCESS!", {
              order_id,
              order_key,
              payment_result: checkoutData.data.payment_result,
              data_sent: checkoutData.data.data_sent,
              all_data: checkoutData.data.order_data,
            });

            // Check if we need to confirm the Stripe payment
            const paymentResult = checkoutData.data.payment_result;
            let paymentConfirmed = false;
            if (
              paymentResult?.redirect_url &&
              paymentResult.redirect_url.includes("#response=")
            ) {
              try {
                // Extract and decode the Stripe response data
                const encodedData =
                  paymentResult.redirect_url.split("#response=")[1];

                console.log("Raw encoded data:", encodedData);

                // Clean up the encoded data - remove any URL encoding
                const cleanEncodedData = decodeURIComponent(encodedData);
                console.log("Cleaned encoded data:", cleanEncodedData);

                let decodedData;
                try {
                  decodedData = JSON.parse(atob(cleanEncodedData));
                } catch (base64Error) {
                  console.error("Failed to decode base64 data:", base64Error);
                  console.log("Problematic data:", cleanEncodedData);
                  throw new Error("Invalid response data format");
                }

                console.log("Stripe payment confirmation data:", decodedData);

                // Get the original PaymentIntent ID from the payment_data we sent
                const originalPaymentIntentId =
                  checkoutData.data.data_sent?.payment_data?.find(
                    (item) => item.key === "stripe_payment_intent_id"
                  )?.value;

                console.log(
                  "Original PaymentIntent ID:",
                  originalPaymentIntentId
                );
                console.log(
                  "WooCommerce PaymentIntent ID:",
                  decodedData.client_secret?.split("_secret_")[0]
                );

                if (
                  decodedData.client_secret &&
                  decodedData.status === "requires_payment_method"
                ) {
                  logPayment("Payment requires confirmation with Stripe");

                  // For Payment Element, the payment should already be confirmed
                  // We just need to check the status
                  console.log(
                    "Payment Element flow - payment already confirmed, checking status"
                  );

                  // Since we already confirmed the payment above, we need to update the order status
                  console.log(
                    "Updating order status after payment confirmation..."
                  );

                  // Use the confirmed payment intent ID from the payment confirmation above
                  const confirmedPaymentIntentId = paymentIntent.id;
                  console.log(
                    "Using confirmed Payment Intent ID:",
                    confirmedPaymentIntentId
                  );

                  try {
                    const confirmResponse = await fetch(
                      `/api/orders/${order_id}/confirm-payment`,
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          payment_intent_id: confirmedPaymentIntentId,
                          order_key: order_key,
                        }),
                      }
                    );

                    if (!confirmResponse.ok) {
                      throw new Error(
                        `Order update failed: ${confirmResponse.status}`
                      );
                    }

                    const confirmResult = await confirmResponse.json();

                    if (!confirmResult.success) {
                      throw new Error(
                        `Order update failed: ${confirmResult.message}`
                      );
                    }

                    console.log(
                      "✅ Order status updated to on-hold successfully"
                    );
                    logOrder("✅ Payment note added to order");
                    logPayment(
                      "✅ Payment Intent ID:",
                      confirmedPaymentIntentId
                    );

                    paymentConfirmed = true;
                  } catch (confirmError) {
                    console.error("❌ Order update failed:", confirmError);
                    toast.error(
                      "Order update failed. Payment succeeded but order status could not be updated. Please contact support."
                    );

                    // IMPORTANT: Don't redirect if order update fails
                    // Payment succeeded but order wasn't updated properly
                    return;
                  }
                } else {
                  // No payment confirmation needed (shouldn't happen with Stripe)
                  toast.success(
                    "Order created and payment processed successfully!"
                  );
                  paymentConfirmed = true;
                }
              } catch (error) {
                console.error(
                  "Error processing Stripe payment confirmation:",
                  error
                );
                toast.error("Payment confirmation failed. Please try again.");
                return; // Don't continue with redirect
              }
            } else {
              // No redirect_url means payment was processed differently
              toast.success(
                "Order created and payment processed successfully!"
              );
              paymentConfirmed = true;
            }

            // Only proceed with cart emptying and redirect if payment was confirmed
            if (!paymentConfirmed) {
              logPayment("Payment not confirmed, staying on checkout page");
              return;
            }

            // Empty the cart after successful payment
            try {
              const emptyCartResponse = await fetch("/api/cart/empty", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (emptyCartResponse.ok) {
                console.log(
                  "Cart emptied successfully after payment handle checkout"
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
                console.error(
                  "Failed to empty cart after payment handle checkout"
                );
              }
            } catch (cartError) {
              console.error(
                "Error emptying cart after payment handle checkout:",
                cartError
              );
              // Don't fail the redirect if cart emptying fails
            }

            // Final success message
            toast.success("Payment successful! Your order has been placed.");

            // Redirect to order received page
            router.push(
              `/checkout/order-received/${order_id}?key=${order_key}${buildFlowQueryString()}`
            );
            return;
          }
        } catch (error) {
          console.error("Error processing payment handle checkout:", error);
          toast.error("Payment processing failed. Please try again.");
          return;
        }
      } else {
        // Fallback to regular WooCommerce checkout for non-card payments
        const res = await fetch("/api/checkout", {
          method: "POST",
          body: JSON.stringify(dataToSend),
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

  // Show loading indicator if cart is not yet loaded or URL parameters are being processed
  if (!cartItems || isProcessingUrlParams) {
    return <CheckoutSkeleton />;
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
