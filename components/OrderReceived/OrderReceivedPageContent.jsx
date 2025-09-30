"use client";

import { useEffect, useState, Suspense } from "react";
import { CiCircleAlert, CiCircleCheck } from "react-icons/ci";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import Loader from "../Loader";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import CustomImage from "../utils/CustomImage";

// Function to fetch product details including categories
const fetchProductDetails = async (productId) => {
  if (!productId) return null;

  try {
    // Use the dedicated product ID endpoint to get category information
    const response = await fetch(`/api/products/id/${productId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product details for ID ${productId}`);
    }
    return await response.json();
  } catch (error) {
    console.error(
      `[GA4] Error fetching product details for ID ${productId}:`,
      error
    );
    return null;
  }
};

// Function to send GA4 Purchase Event with proper ecommerce structure
const sendGA4PurchaseEvent = async (orderData) => {
  if (!orderData || !orderData.id) return;

  try {
    console.log(`[GA4] Preparing purchase data for order ${orderData.id}...`);

    // Define dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];

    // Fetch product details for each line item to get proper categories
    const lineItemPromises = Array.isArray(orderData.line_items)
      ? orderData.line_items.map(async (item) => {
        console.log(
          `[GA4] Fetching product details for ID ${item.product_id}...`
        );

        // Fetch product details including categories
        const productDetails = await fetchProductDetails(item.product_id);

        console.log(
          `[GA4] Product details for ID ${item.product_id}:`,
          productDetails
        );

        // Extract category information
        let mainCategory = "";
        let subCategory = "";

        if (productDetails && productDetails.categories) {
          mainCategory = productDetails.categories[0]?.name || "";
          subCategory = productDetails.categories[1]?.name || "";
          console.log(
            `[GA4] Categories for product ${item.name}:`,
            mainCategory,
            subCategory
          );
        } else {
          // Fallback to any categories in the line item
          const categories =
            item.categories && item.categories.length > 0
              ? item.categories
              : item.meta_data?.find(
                (meta) => meta.key === "_product_categories"
              )?.value || [];

          console.log("[GA4] Fallback categories found:", categories);

          mainCategory =
            typeof categories === "object" && categories[0]?.name
              ? categories[0].name
              : Array.isArray(categories) && categories.length > 0
                ? categories[0]
                : "";

          subCategory =
            typeof categories === "object" && categories[1]?.name
              ? categories[1].name
              : Array.isArray(categories) && categories.length > 1
                ? categories[1]
                : "";
        }

        return {
          item_id: item.product_id.toString(),
          item_name: item.name,
          price: parseFloat(item.total) / Math.max(1, item.quantity) || 0,
          quantity: item.quantity || 1,
          item_brand: "Rocky",
          item_category: mainCategory,
          item_category2: subCategory,
          item_variant:
            item.variation?.attributes
              ?.map((attr) => `${attr.name}: ${attr.option}`)
              .join(", ") || "",
          discount: parseFloat(item.discount || 0) || 0,
        };
      })
      : [];

    // Wait for all product detail requests to complete
    const lineItems = await Promise.all(lineItemPromises);

    // Create purchase event with proper ecommerce structure
    const purchaseData = {
      event: "purchase",
      ecommerce: {
        transaction_id: orderData.id.toString(),
        affiliation: "Rocky",
        value: parseFloat(orderData.total) || 0,
        tax: parseFloat(orderData.total_tax) || 0,
        shipping: parseFloat(orderData.shipping_total) || 0,
        currency: orderData.currency || "CAD",
        coupon:
          orderData.coupon_lines?.map((coupon) => coupon.code).join(", ") || "",
        payment_type: orderData.payment_method_title || "Visa",
        shipping_tier: orderData.shipping_lines?.[0]?.method_title || "Express",
        items: lineItems,
      },
    };

    console.log("[GA4] Pushing purchase event to dataLayer:", purchaseData);
    window.dataLayer.push(purchaseData);

    console.log("[GA4] ✅ GA4 purchase event pushed successfully");
  } catch (error) {
    console.error("[GA4] Error sending purchase event:", error);
  }
};

// Function to check if a questionnaire has already been completed
const checkQuestionnaireCompletion = async (questionnaireId) => {
  try {
    const response = await fetch("/api/check-questionnaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        questionnaire_id: questionnaireId,
      }),
    });

    const data = await response.json();
    console.log("[Debug] Questionnaire completion data:", data);
    return data.completed;
  } catch (error) {
    console.error("Error checking questionnaire completion:", error);
    return false;
  }
};

const OrderReceivedContent = ({ userId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(null);
  const [isQuestionnaireCompleted, setIsQuestionnaireCompleted] =
    useState(false);
  const [questionnaireCheckComplete, setQuestionnaireCheckComplete] =
    useState(false);
  const key = searchParams.get("key");
  const params = useParams();
  const orderId = params.id;

  // Get flow parameters
  const mhFlow = searchParams.get("mh-flow");
  const edFlow = searchParams.get("ed-flow");
  const wlFlow = searchParams.get("wl-flow");
  const hairFlow = searchParams.get("hair-flow");
  const smokingFlow = searchParams.get("smoking-flow");

  // Determine if we should redirect and where to
  const shouldRedirect =
    mhFlow === "1" ||
    edFlow === "1" ||
    wlFlow === "1" ||
    hairFlow === "1" ||
    smokingFlow === "1";

  // Function to generate the seskey
  const generateSeskey = (userId) => {
    const expiration = Math.floor(Date.now() / 1000) + 10 * 60;
    const seskeyData = {
      user_id: userId,
      expiration: expiration,
    };
    return btoa(JSON.stringify(seskeyData));
  };
  // Determine the redirect destination
  const getRedirectPath = () => {
    // Build the base path based on flow type
    let basePath = "";
    if (mhFlow === "1") basePath = "/mh-quiz";
    if (edFlow === "1") basePath = "/ed-consultation-quiz";
    if (wlFlow === "1") basePath = "/wl-consultation";
    if (hairFlow === "1") basePath = "/hair-main-questionnaire";
    if (smokingFlow === "1") basePath = "/smoking-consultation/?checked-out=1";

    console.log("[Debug] Base path:", basePath);
    console.log("[Debug] Flow parameters:", {
      mhFlow,
      edFlow,
      wlFlow,
      hairFlow,
      smokingFlow,
    });

    // Build the query parameters
    const queryParams = new URLSearchParams();

    // Add order_id if available
    if (order && order.id) {
      queryParams.append("order-id", order.id);
    }

    // Add standard parameters
    queryParams.append("stage", "consultation-after-checkout");
    queryParams.append("view", "consultation");

    // Add purchased_product parameter (use first product name from order if available)
    if (order && order.line_items && order.line_items.length > 0) {
      queryParams.append("purchased_product", order.line_items[0].name);
    }

    // Dynamically generate and add the seskey parameter
    const currentUserId = userId;
    const seskey = generateSeskey(currentUserId);
    queryParams.append("seskey", seskey);

    const finalUrl = `${basePath}?${queryParams.toString()}`;
    console.log("[Debug] Final redirect URL:", finalUrl);
    return finalUrl;
  };

  // Start countdown after order loads and questionnaire check is complete
  useEffect(() => {
    console.log("order", order);
    console.log("shouldRedirect", shouldRedirect);
    console.log("countdown", countdown);
    console.log("isQuestionnaireCompleted", isQuestionnaireCompleted);
    console.log("questionnaireCheckComplete", questionnaireCheckComplete);
    // Only start countdown if:
    // 1. Order has loaded successfully
    // 2. We have a flow parameter
    // 3. Countdown hasn't been initialized yet
    // 4. Questionnaire is not completed
    // 5. For ED/Hair flows: questionnaire check is complete
    // 6. For other flows: no questionnaire check needed
    const shouldStartCountdown =
      order &&
      shouldRedirect &&
      countdown === null &&
      !isQuestionnaireCompleted &&
      (edFlow === "1" || hairFlow === "1" ? questionnaireCheckComplete : true);

    if (shouldStartCountdown) {
      console.log("Starting countdown for redirect to", getRedirectPath());
      setCountdown(10);
    }
  }, [
    order,
    shouldRedirect,
    countdown,
    isQuestionnaireCompleted,
    questionnaireCheckComplete,
    edFlow,
    hairFlow,
  ]);

  // Handle the countdown timer
  useEffect(() => {
    // Only run this effect if countdown has been initialized and is > 0
    if (countdown !== null && countdown > 0 && !isQuestionnaireCompleted) {
      console.log(`Countdown: ${countdown} seconds remaining`);

      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
    // When countdown reaches 0, redirect
    else if (countdown === 0 && !isQuestionnaireCompleted) {
      console.log("Countdown complete, redirecting now");

      const redirectPath = getRedirectPath();
      console.log("[Debug] Final Redirect URL:", redirectPath);

      // Use Next.js router for internal navigation
      router.push(redirectPath);
    }
  }, [countdown, isQuestionnaireCompleted]);

  // Get order data and handle redirections
  useEffect(() => {
    const getOrderAndPrepareRedirect = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/order/?order_id=${orderId}&order_key=${key}`
        );
        const data = await res.json();
        setOrder(data);
        console.log("Order loaded successfully");

        // Send GA4 event after successfully fetching the order
        if (data && data.id) {
          // Short delay to ensure GTM is ready
          setTimeout(() => {
            sendGA4PurchaseEvent(data);
            try {
              window._conv_q = window._conv_q || [];
              window._conv_q.push([
                "pushRevenue",
                `${parseFloat(data.total) || 0}`,
                `${data.line_items?.length || 0}`,
                "100430995",
              ]);
              window._conv_q.push([
                "pushRevenue",
                `${parseFloat(data.total) || 0}`,
                `${data.line_items?.length || 0}`,
                "100467959",
              ]);
              console.log("[Convert] Revenue tracking pushed");
            } catch (err) {
              console.error("[Convert] Error pushing revenue tracking:", err);
            }
          }, 1000);
        }

        // Check if we need to redirect to a questionnaire
        if (shouldRedirect) {
          // Only perform questionnaire completion check for ED and Hair flows
          if (edFlow === "1" || hairFlow === "1") {
            // Determine which questionnaire ID to check based on flow type
            let questionnaireId = null;
            if (edFlow === "1") questionnaireId = 2; // ED questionnaire
            if (hairFlow === "1") questionnaireId = 1; // Hair questionnaire

            if (questionnaireId) {
              // Check if questionnaire is already completed
              const isCompleted = await checkQuestionnaireCompletion(
                questionnaireId
              );

              if (isCompleted) {
                console.log(
                  `Questionnaire ID ${questionnaireId} already completed, not redirecting`
                );
                setIsQuestionnaireCompleted(true); // Set the state to prevent redirect
                setQuestionnaireCheckComplete(true); // Mark check as complete
                return; // Add return statement to prevent further execution
              } else {
                console.log(
                  `Questionnaire ID ${questionnaireId} not completed, will start redirect countdown`
                );
                setIsQuestionnaireCompleted(false); // Ensure state is false
                setQuestionnaireCheckComplete(true); // Mark check as complete
                // Countdown will start automatically via useEffect when questionnaireCheckComplete becomes true
              }
            }
          } else {
            // For other flows (mental health, weight loss), start redirect countdown without checking
            console.log("Starting redirect countdown for non-ED/Hair flow");
            setIsQuestionnaireCompleted(false); // Ensure state is false
            // Don't set questionnaireCheckComplete to true here - let the useEffect handle the countdown
            // The countdown will start automatically via useEffect when all conditions are met
          }
        } else {
          // No redirect needed, mark check as complete
          setQuestionnaireCheckComplete(true);
        }
      } catch (error) {
        console.error("Error fetching order:", error);
        // Mark questionnaire check as complete even on error to prevent infinite loading
        setQuestionnaireCheckComplete(true);
      } finally {
        setLoading(false);
      }
    };

    if (orderId && key) {
      getOrderAndPrepareRedirect();
    } else {
      console.warn("Order ID or Key missing from URL params.");
      setLoading(false);
    }
  }, [orderId, key, shouldRedirect, mhFlow, edFlow, wlFlow, hairFlow]);

  if (loading) {
    return <Loader />;
  }

  if (!order) {
    return (
      <section className="px-5 sectionWidth:px-0 py-4 md:py-8 undefined">
        <div className="flex justify-center">
          <div className="border rounded-xl w-full max-w-[480px] p-6 text-center">
            <div className="flex justify-center">
              <CiCircleAlert size={60} color="red" className="mb-3" />
            </div>
            Sorry, couldn't get your order...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 sectionWidth:px-0 py-4 md:py-8 undefined">
      <div className="flex justify-center">
        <div className="border rounded-xl w-full max-w-[480px] p-6">
          <ThankYouMessage userEmail={order.billing.email} />
          {countdown !== null && countdown > 0 && !isQuestionnaireCompleted && (
            <div className="mt-2 mb-2 py-4 px-6 bg-[#03A670] rounded-lg text-center">
              <p className="text-[16px] font-[600] text-white">
                You will be redirected to your consultation in {countdown}{" "}
                seconds....
              </p>
            </div>
          )}
          <BasicOrderInfo order={order} />
          <OrderItems order={order} />
          <Totals order={order} />
          {(!shouldRedirect ||
            (shouldRedirect && countdown <= 5 && !isQuestionnaireCompleted) ||
            (shouldRedirect && isQuestionnaireCompleted)) && (
            <Link
              href={
                shouldRedirect && !isQuestionnaireCompleted
                  ? getRedirectPath()
                  : "/"
              }
              className="mt-3 flex items-center justify-center gap-3 bg-black text-white px-5 py-3 rounded-[64px] hover:bg-gray-800 transition"
            >
              <span className="text-[14px] font-[500] text-[#FFFFFF] poppins-font">
                {shouldRedirect && !isQuestionnaireCompleted
                  ? "Continue to Consultation"
                  : "Continue to Home Page"}
              </span>
              <FaArrowRight color="white" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default function OrderReceivedPageContent({ userId }) {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<Loader />}>
        <OrderReceivedContent userId={userId} />
      </Suspense>
    </div>
  );
}

const Totals = ({ order }) => {
  return (
    <ul>
      <li className="flex justify-between py-3 border-b">
        <span className="text-[#4E4E4E] text-[14px] font-[500] poppins-font">
          Subtotal:
        </span>
        <span className="text-[14px] font-[400] poppins-font">
          <span className="woocommerce-Price-amount amount">
            <bdi>
              <span className="woocommerce-Price-currencySymbol">$</span>
              {order.total}
            </bdi>
          </span>
        </span>
      </li>
      <li className="flex justify-between py-1.5">
        <span className="text-[#4E4E4E] text-[14px] font-[500] poppins-font">
          Applied Discount Code:
        </span>
        <span className="text-[14px] font-[400] poppins-font"></span>
      </li>
      <li className="flex justify-between py-1.5">
        <span className="text-[#4E4E4E] text-[14px] font-[500] poppins-font">
          Discount:
        </span>
        <span className="text-[14px] font-[400] poppins-font">
          -
          <span className="woocommerce-Price-amount amount">
            <bdi>
              <span className="woocommerce-Price-currencySymbol">$</span>
              {order.discount_total}
            </bdi>
          </span>
        </span>
      </li>
      <li className="flex justify-between py-1.5">
        <span className="text-[#4E4E4E] text-[14px] font-[500] poppins-font">
          Initial Shipment:
        </span>
        <span className="text-[14px] font-[400] poppins-font">
          {order.shipping_lines[0]?.method_title || "N/A"}
        </span>
      </li>
      <li className="flex justify-between pt-1.5 pb-3 border-b">
        <span className="text-[#4E4E4E] text-[14px] font-[500] poppins-font">
          Tax:
        </span>
        <span className="text-[14px] font-[400] poppins-font">
          <span className="woocommerce-Price-amount amount">
            <bdi>
              <span className="woocommerce-Price-currencySymbol">$</span>
              {order.total_tax}
            </bdi>
          </span>
        </span>
      </li>
      <li className="flex justify-between font-[600] text-black pt-5">
        <span className="text-[14px] poppins-font">Total:</span>
        <span className="text-[16px] poppins-font">
          <span className="woocommerce-Price-amount amount">
            <bdi>
              <span className="woocommerce-Price-currencySymbol">$</span>
              {order.total}
            </bdi>
          </span>
        </span>
      </li>
    </ul>
  );
};

const OrderItems = ({ order }) => {
  return (
    <>
      <h3 className="text-[14px] font-[500] pt-3">Your Order</h3>
      {order.line_items.map((item) => {
        return (
          <div key={item.id} className="flex items-start gap-3 py-3 border-b">
            <div className="min-w-[70px] w-[70px] min-h-[70px] h-[70px] rounded-[12px] overflow-hidden relative">
              {item.image && item.image.src ? (
                <CustomImage fill alt={item.name} src={item.image.src} />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                  No Image
                </div>
              )}
            </div>
            <div>
              <p className="text-[14px] font-[500]">{item.name}</p>
              <p className="text-[12px] font-[500]">
                Quantity: {item.quantity}
              </p>
              <p className="text-[12px] font-[500]">
                Total:{" "}
                <span className="woocommerce-Price-amount amount">
                  <bdi>
                    <span className="woocommerce-Price-currencySymbol">$</span>
                    {item.total}
                  </bdi>
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
};

const ThankYouMessage = ({ userEmail }) => {
  return (
    <div className="text-center flex flex-col items-center justify-center">
      <CiCircleCheck size={60} color="#03A670" className="mb-3" />
      <h2 className="text-[20px] font-[500] text-[#251F20] mb-3">
        Thanks for your order!
      </h2>
      <p className="text-[14px] text-[#251F20] font-[400]">
        The order confirmation has been sent to
      </p>
      <p className="text-[14px] text-[#251F20] font-[400]">{userEmail}</p>
    </div>
  );
};

const BasicOrderInfo = ({ order }) => {
  return (
    <div className="border-y border-[#E2E2E1] mt-3">
      <div className="text-[#212121]">
        <div className="py-3 border-b border-[#E2E2E1]">
          <p className="text-[14px] font-[500] mb-3">Transaction Date</p>
          <p className="text-[12px] font-[400]">
            {formatDate(order.date_created)}
          </p>
        </div>
        <div className="py-3 border-b border-[#E2E2E1]">
          <p className="text-[14px] font-[500] mb-3">Payment Method</p>
          <p className="text-[12px] font-[400]">{order.payment_method_title}</p>
        </div>
        <div className="py-3">
          <p className="text-[14px] font-[500] mb-3">Shipping Method</p>
          <p className="text-[12px] font-[400]">
            {order.shipping_lines[0]?.method_title || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

const formatDate = (isoString) => {
  if (!isoString) return "Invalid Date";
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};
