"use client";

import Loader from "@/components/Loader";
import CheckoutSkeleton from "@/components/ui/skeletons/CheckoutSkeleton";
import { useEffect, useState } from "react";
import BillingAndShipping from "./BillingAndShipping";
import CartAndPayment from "./CartAndPayment";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import {
  processUrlCartParameters,
  cleanupCartUrlParameters,
} from "@/utils/urlCartHandler";
import QuestionnaireNavbar from "../EdQuestionnaire/QuestionnaireNavbar";

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
    payment_method: "bambora_credit_card",
    payment_data: [
      {
        key: "wc-bambora-credit-card-js-token",
        value: "",
      },
      {
        key: "wc-bambora-credit-card-account-number",
        value: "",
      },
      {
        key: "wc-bambora-credit-card-card-type",
        value: "",
      },
      {
        key: "wc-bambora-credit-card-exp-month",
        value: "",
      },
      {
        key: "wc-bambora-credit-card-exp-year",
        value: "",
      },
    ],
  });

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardType, setCardType] = useState("");

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

      // Log cart items to debug what products are actually being added
      console.log("Cart items received from API:", data.items);

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
      console.error("Error fetching cart items:", error);
      return null;
    }
  };

  // Function to fetch saved payment cards
  const fetchSavedCards = async () => {
    try {
      setIsLoadingSavedCards(true);
      console.log("Fetching saved cards from API...");

      // Explicitly wait for the fetch to complete
      const res = await fetch("/api/payment-methods", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });

      if (!res.ok) {
        console.error("API returned error status:", res.status);
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
      console.error("Error fetching saved cards:", error);
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
      } catch (error) {
        console.error("Error loading checkout data:", error);
        toast.error(
          "There was an issue loading your checkout data. Please refresh the page."
        );
      }
    };

    loadCheckoutData();
  }, []);

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
        cardType: selectedCard
          ? ""
          : formData.payment_data.find(
              (d) => d.key === "wc-bambora-credit-card-card-type"
            )?.value,
        cardExpMonth: selectedCard ? "" : expiry.slice(0, 2),
        cardExpYear: selectedCard ? "" : expiry.slice(3),
        cardCVD: selectedCard ? "" : cvc,

        // If using a saved card, include the token and id
        savedCardToken: selectedCard ? selectedCard.token : null,
        savedCardId: selectedCard ? selectedCard.id : null,
        useSavedCard: !!selectedCard,

        // Add total amount for saved card payments
        totalAmount:
          cartItems.totals && cartItems.totals.total_price
            ? parseFloat(cartItems.totals.total_price) / 100
            : cartItems.totals && cartItems.totals.total
            ? parseFloat(cartItems.totals.total.replace(/[^0-9.]/g, ""))
            : 0,

        // ED Flow parameter
        isEdFlow: isEdFlow,
      };

      // Enhanced client-side logging
      console.log("Client-side checkout data:", {
        ...dataToSend,
        cardNumber: dataToSend.cardNumber ? "[REDACTED]" : "",
        cardCVD: dataToSend.cardCVD ? "[REDACTED]" : "",
        cartTotals: cartItems.totals,
        selectedCardId: selectedCard,
        totalAmount: dataToSend.totalAmount,
      });

      // For saved cards, we'll use a two-step approach but check for duplicate payments
      if (selectedCard && cartItems.totals) {
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
              console.log("Payment already successful in initial checkout!");
              toast.success(
                "Order created and payment processed successfully!"
              );

              // Redirect to order received page with the order details from the initial checkout
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
          console.log("Payment result:", paymentResult);

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

          // Debugging logs
          console.log(
            `Redirecting to order received page: /checkout/order-received/${paymentOrderId}?key=${paymentOrderKey}`
          );

          // Redirect to order received page with the correct order details
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

      // Continue with regular checkout for new cards
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      });

      const data = await res.json();

      if (data.error) {
        toast.error(data.error);
        // Reload the page after showing error for new card payments
        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000); // Wait 2 seconds to show the error message
        return;
      }

      if (data.success) {
        toast.success("Order created successfully!");
        const order_id = data.data.id || data.data.order_id;
        const order_key = data.data.order_key || "";
        router.push(
          `/checkout/order-received/${order_id}?key=${order_key}${
            buildFlowQueryString() ? buildFlowQueryString() : ""
          }`
        );
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
        />
      </div>
    </>
  );
};

export default CheckoutPageContent;
