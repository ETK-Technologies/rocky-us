"use client";

import { useEffect, useState } from "react";
import { logger } from "@/utils/devLogger";
import { useRouter } from "next/navigation";
import PaymentModal from "@/components/convert_test/PreConsultation/components/PaymentModal";
import Loader from "@/components/Loader";
import { getAwinFromUrlOrStorage } from "@/utils/awin";
import {
  isWordPressCriticalError,
  transformPaymentError,
  handlePaymentResponse,
  safeParsePaymentResponse,
} from "@/utils/paymentErrorHandler";
import { toast } from "react-toastify";

export default function PaymentPage() {
  const router = useRouter();
  const [billing, setBilling] = useState(null);
  const [payload, setPayload] = useState(null);

  const [loading, setLoading] = useState(false);

  // Payment form state compatible with CheckoutPageContent
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
      { key: "wc-bambora-credit-card-js-token", value: "" },
      { key: "wc-bambora-credit-card-account-number", value: "" },
      { key: "wc-bambora-credit-card-card-type", value: "" },
      { key: "wc-bambora-credit-card-exp-month", value: "" },
      { key: "wc-bambora-credit-card-exp-year", value: "" },
    ],
  });
  const [cartItems, setCartItems] = useState(null);
  const [savedCards, setSavedCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardType, setCardType] = useState("");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  useEffect(() => {
    try {
      const b = sessionStorage.getItem("ed_billing_and_shipping");
      logger.log("Billing Data From sessionStorage", b);
      if (b) {
        const parsed = JSON.parse(b);
        setBilling(parsed);
        setFormData((prev) => ({
          ...prev,
          billing_address: parsed.billing_address || parsed,
        }));

        logger.log("Form billing Data From formData", parsed);
      }
      const raw = sessionStorage.getItem("ed_onboarding_payload");
      if (raw) setPayload(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
    // Fetch cart items so coupon UI and totals are available on payment page
    (async function fetchCart() {
      try {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          setCartItems(data);
          logger.log("Cart items loaded on payment page", data);
        }
      } catch (err) {
        logger.error("Failed to load cart on payment page", err);
      }
    })();
  }, []);

  const submitCheckout = async (dataToSend) => {
    try {
      const res = await fetch("/api/create-pending-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      // Use centralized response parser
      const parseResult = await safeParsePaymentResponse(res);
      if (parseResult.success) {
        return parseResult.data;
      } else {
        return {
          success: false,
          error: parseResult.error,
        };
      }
    } catch (e) {
      logger.error("Error in submitCheckout:", e);
      return { success: false, error: e.message };
    }
  };

  const payWithSavedCard = async ({
    orderId,
    token,
    cardId,
    billingAddress,
  }) => {
    try {
      const res = await fetch("/api/pay-order-with-saved-card", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          savedCardToken: token,
          cardId,
          cvv: "",
          // Include billing address for address verification
          billing_address: billingAddress,
        }),
      });

      // Use centralized payment response handler
      return await handlePaymentResponse(res, orderId);
    } catch (e) {
      logger.error("Error in payWithSavedCard:", e);
      return { success: false, error: e.message };
    }
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

  const handleSubmit = async () => {
    // Build minimal dataToSend that matches CheckoutPageContent expectations
    setLoading(true);
    logger.log("Submitting payment, formData:", formData);
    const { awc: awinAwc, channel: awinChannel } = getAwinFromUrlOrStorage();
    const useShippingAddress =
      formData.shipping_address &&
      formData.shipping_address.ship_to_different_address;
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

      // NEW: Use Stripe for new card payments
      useStripe: !selectedCard, // Use Stripe only when NOT using a saved card

      // Add total amount for saved card payments
      totalAmount: productForModal.price,

      // ED Flow parameter
      //isEdFlow: isEdFlow,

      // AWIN affiliate metadata (frontend-sourced)
      awin_awc: awinAwc || "",
      awin_channel: awinChannel || "other",
    };

    logger.log("Submitting payment with data:", dataToSend);

    // If using a saved card, follow two-step flow: create order, then pay
    // if (selectedCard) {
    //   const checkoutResult = await submitCheckout(dataToSend);
    //   if (checkoutResult.error) {
    //     setLoading(false);
    //     alert(checkoutResult.error || "Failed to create order");

    //     return;
    //   }
    //   const orderId =
    //     checkoutResult.details?.order_id || checkoutResult.data?.id;
    //   if (!orderId) {
    //     alert("Unable to determine order id");
    //     return;
    //   }

    //   const paymentResult = await payWithSavedCard({
    //     orderId,
    //     token: selectedCard.token,
    //     cardId: selectedCard.id,
    //     billingAddress: {
    //       first_name: formData.billing_address.first_name,
    //       last_name: formData.billing_address.last_name,
    //       address_1: formData.billing_address.address_1,
    //       address_2: formData.billing_address.address_2 || "",
    //       city: formData.billing_address.city,
    //       state: formData.billing_address.state,
    //       postcode: formData.billing_address.postcode,
    //       country: formData.billing_address.country || "CA",
    //       email: formData.billing_address.email,
    //       phone: formData.billing_address.phone,
    //     },
    //   });
    //   if (!paymentResult.success) {
    //     alert(paymentResult.message || "Payment failed with saved card");
    //     return;
    //   }

    //   // success
    //   try {
    //     sessionStorage.removeItem("ed_onboarding_payload");
    //     sessionStorage.removeItem("ed_billing_and_shipping");
    //   } catch (e) {}
    //   router.push(
    //     `/checkout/order-received/${paymentResult.order_id || orderId}`
    //   );
    //   return;
    // }

    // Continue with regular checkout for new cards
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify(dataToSend),
      });

      // Use centralized payment response handler
      // Note: For regular checkout, we don't have an orderId yet, so pass null
      const data = await handlePaymentResponse(res, null);
      logger.log("Checkout response:", data);

      // handlePaymentResponse may return a parsed result object (success/data)
      // or a statusResult from verifyOrderStatus. Check common shapes.
      if (!data) {
        setLoading(false);
        toast.error("Empty response from payment handler");
        return;
      }

      // If the handler returned an object with success boolean
      if (data.success === false) {
        const errMsg = data.error || "Payment failed. Please try again.";
        const userFriendlyMessage = isWordPressCriticalError(errMsg)
          ? transformPaymentError(errMsg)
          : errMsg;
        setLoading(false);
        toast.error(userFriendlyMessage);
        return;
      }

      // If handler returned a success wrapper (verifyOrderStatus style)
      const orderData = data.data || data;
      const order_id = orderData?.id || orderData?.order_id || null;
      const order_key = orderData?.order_key || "";

      // Ensure we have a valid order id before navigating. If missing, surface
      // a friendly message to the user and log the raw response for diagnostics.
      if (!order_id) {
        setLoading(false);
        const raw = JSON.stringify(orderData || data);
        logger.error(
          "Payment succeeded but missing order id in response:",
          raw
        );
        toast.error(
          "Payment appears successful but we couldn't find your order ID. Please contact support or check your email for order confirmation."
        );
        return;
      }

      setLoading(false);
      toast.success("Order created successfully!");
      router.push(
        `/checkout/order-received/${order_id}?key=${order_key}${
          buildFlowQueryString() ? buildFlowQueryString() : ""
        }`
      );
    } catch (err) {
      logger.error("Error during checkout/payment:", err);
      setLoading(false);

      // Prefer already transformed messages, otherwise transform here
      const rawMessage = err?.message || err?.toString() || "Payment failed.";
      const userFriendlyMessage = isWordPressCriticalError(rawMessage)
        ? transformPaymentError(rawMessage)
        : transformPaymentError(rawMessage);

      toast.error(userFriendlyMessage);
      return;
    }
  };

  // Build a product-like object for the modal using ED payload or cart first item
  const productForModal = (() => {
    if (payload) {
      return {
        name: payload.productName || payload.name,
        dosage: payload.dosage,
        image: payload.image,
        price: payload.price,
        activeIngredient: payload.activeIngredient,
      };
    }

    const first = cartItems?.items?.[0];
    if (first) {
      return {
        name: first.name,
        dosage: first.meta_data?.find((m) => m.key === "_dosage")?.value || "",
        image: first.images?.[0]?.thumbnail,
        price: first.totals?.line_total
          ? (first.totals.line_total / 100).toFixed(2)
          : 0,
        activeIngredient: first.activeIngredient || "",
      };
    }

    return {};
  })();

  return (
    <>
      {loading && (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-30">
          <Loader />
        </div>
      )}
      <div className="bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto p-6">
          {/* Coupon apply input and shipping/totals summary (same behavior as main checkout) */}

          <PaymentModal
            isOpen={paymentModalOpen}
            onClose={() => setPaymentModalOpen(false)}
            product={productForModal}
            billingAndShippingDetails={billing}
            onPay={() => {
              setPaymentModalOpen(false);
              handleSubmit();
            }}
            setFormData={setFormData}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expiry={expiry}
            setExpiry={setExpiry}
            cvc={cvc}
            setCvc={setCvc}
            cardType={cardType}
            setCardType={setCardType}
            savedCards={savedCards}
            setSavedCards={setSavedCards}
            selectedCard={selectedCard}
            setSelectedCard={setSelectedCard}
            isLoadingSavedCards={false}
          />
        </div>
      </div>
    </>
  );
}
