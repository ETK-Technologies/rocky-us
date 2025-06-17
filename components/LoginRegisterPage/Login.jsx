"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { GrGoogle } from "react-icons/gr";
import { MdOutlineRemoveRedEye, MdOutlineVisibilityOff } from "react-icons/md";
import {
  getSavedProducts,
  clearSavedProducts,
} from "../../utils/crossSellCheckout";
import { createCartUrl } from "../../utils/urlCartHandler";
import Link from "next/link";
import { migrateLocalCartToServer } from "@/lib/cart/cartService";

const LoginContent = ({ setActiveTab, loginRef }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberme: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const redirectTo = searchParams.get("redirect_to");
  const isEdFlow = searchParams.get("ed-flow") === "1";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle adding saved cross-sell products to cart after login
  const handleCrossSellProducts = async () => {
    try {
      // Check if there are saved products from cross-sell
      const savedProducts = getSavedProducts();

      if (savedProducts) {
        console.log(
          "Processing saved cross-sell products after login:",
          savedProducts
        );

        // Determine the flow type from URL parameters or saved products
        const flowType =
          searchParams.get("ed-flow") === "1"
            ? "ed"
            : searchParams.get("wl-flow") === "1"
            ? "wl"
            : searchParams.get("hair-flow") === "1"
            ? "hair"
            : searchParams.get("mh-flow") === "1"
            ? "mh"
            : savedProducts.flowType || "ed"; // Use saved flow type or default to "ed"

        console.log("Using flow type for redirect after login:", flowType);

        // Use the centralized URL cart utility to create the redirect URL
        const redirectUrl = createCartUrl(
          savedProducts.mainProduct,
          savedProducts.addons,
          flowType, // Pass the correctly determined flow type
          true // User is now authenticated after login
        );

        // Clear saved products
        clearSavedProducts();

        console.log("Redirecting to:", redirectUrl);
        return redirectUrl;
      }
    } catch (error) {
      console.error("Error handling cross-sell products:", error);
    }

    return null;
  };

  // Validate form before submission
  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", password: "" };

    // Validate email
    if (!formData.username.trim()) {
      newErrors.username = "Email address is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.username)) {
      newErrors.username = "Please enter a valid email address";
      valid = false;
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Parse the response data
      let data;
      try {
        data = await res.json();
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        toast.error("Unable to connect to the server. Please try again later.");
        setSubmitting(false);
        return;
      }

      // Log the response for debugging (without causing errors if data is null)
      console.log("Login response:", {
        status: res.status,
        data: data || "No data",
      });

      if (res.ok) {
        // We'll trigger the cart refresh AFTER migration, not here
        if (data?.data?.name) {
          toast.success("You logged in successfully, " + data.data.name);
        } else {
          toast.success("You logged in successfully");
        }

        // Migrate any localStorage cart items to the server cart
        let migrateSuccess = false;
        try {
          console.log("Starting cart migration process...");
          await migrateLocalCartToServer();
          migrateSuccess = true;
          console.log("Cart migration completed successfully");

          // Now that migration is complete, refresh the cart display
          document.getElementById("cart-refresher")?.click();
          console.log("Cart display refreshed after migration");

          // Dispatch a custom event to ensure cart is updated throughout the app
          const cartUpdatedEvent = new CustomEvent("cart-updated");
          document.dispatchEvent(cartUpdatedEvent);
        } catch (migrateError) {
          console.error("Error migrating cart items:", migrateError);
          // Don't block login flow if migration fails
        }

        // Small delay to ensure cart migration has time to complete server-side
        if (migrateSuccess && redirectTo && redirectTo.includes("/checkout")) {
          console.log(
            "Waiting for cart migration to complete before checkout redirect..."
          );
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        // Determine the redirect path after successful login
        let redirectPath;

        // Always check for saved products from cross-sell flows
        redirectPath = await handleCrossSellProducts();

        // If no redirect from cross-sell processing, use the provided redirect_to parameter
        if (!redirectPath) {
          if (redirectTo) {
            try {
              // Decode the redirectTo URL if it's encoded
              redirectPath = decodeURIComponent(redirectTo);
              console.log("Decoded redirectTo:", redirectPath);
            } catch (e) {
              console.error("Error decoding redirectTo URL:", e);
              redirectPath = redirectTo; // Use as-is if decoding fails
            }
          } else {
            // If no redirect_to parameter, check for flow-specific parameters
            const isFlow =
              searchParams.get("ed-flow") === "1" ||
              searchParams.get("wl-flow") === "1" ||
              searchParams.get("hair-flow") === "1" ||
              searchParams.get("mh-flow") === "1";

            if (isFlow) {
              // For flow-specific logins without a redirect_to parameter,
              // preserve all URL parameters when redirecting to checkout
              const params = new URLSearchParams(searchParams.toString());

              // Get all the cart-related parameters
              const cartParams = Array.from(params.entries()).filter(
                ([key]) =>
                  key.includes("onboarding-add-to-cart") ||
                  key.includes("convert_to_sub") ||
                  key.includes("dose_") ||
                  key.includes("quantity") ||
                  key.includes("add-product-subscription") ||
                  key.includes("variation_") ||
                  key.includes("ed-flow") ||
                  key.includes("wl-flow") ||
                  key.includes("hair-flow") ||
                  key.includes("mh-flow")
              );

              // Create a new URLSearchParams for checkout
              const checkoutParams = new URLSearchParams();
              cartParams.forEach(([key, value]) => {
                checkoutParams.append(key, value);
              });

              redirectPath = `/checkout?${checkoutParams.toString()}`;
              console.log(
                "Created checkout URL with flow parameters:",
                redirectPath
              );
            } else {
              // Default redirect to home
              redirectPath = "/";
            }
          }
        }

        console.log("Final redirect path:", redirectPath);

        // Use window.location for more reliable redirection on production
        if (process.env.NODE_ENV === "production") {
          window.location.href = redirectPath;
        } else {
          router.push(redirectPath);
        }

        setTimeout(() => {
          router.refresh();
        }, 300);
      } else {
        // Handle error responses - display error in toast notification
        let errorMessage =
          "Login failed. Please check your email and password and try again.";

        // Safely extract error message from response
        if (data) {
          // Handle specific error structure from API
          if (data.message) {
            errorMessage = data.message;
          } else if (data.code === "invalid_email") {
            errorMessage = "Unknown email address. Please check and try again.";
          } else if (data.code === "incorrect_password") {
            errorMessage =
              "The password you entered is incorrect. Please try again.";
          }
        }

        // Always show a toast error regardless of the response structure
        toast.error(errorMessage);

        // Safely log error data
        //console.error("Login error:", data || "No error data available");
      }
    } catch (err) {
      // Handle any unexpected errors during the fetch operation
      console.error("Login exception:", err);
      toast.error("An error occurred during login. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="px-3 mx-auto pt-5 text-center">
        <h2 className="text-[#251f20] text-[32px] headers-font font-[450] leading-[44.80px]">
          Sign in to your account
        </h2>
        <h3 className="text-sm text-center font-normal pt-2 tracking-normal">
          Don't have an account?
          <a
            href={(() => {
              const currentParams = new URLSearchParams(
                searchParams.toString()
              );
              currentParams.set("viewshow", "register");
              return `/login-register?${currentParams.toString()}`;
            })()}
            className="font-[400] text-[#AE7E56] underline ml-1"
          >
            Sign up
          </a>
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col flex-wrap items-center justify-center mx-auto py-3 px-8 pt-5 w-[100%] max-w-[400px] space-y-4">
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label htmlFor="username">Email Address</label>
            <input
              type="email"
              id="username"
              name="username"
              className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
              tabIndex="1"
              autoComplete="email"
              placeholder="Enter your email address"
              onChange={handleChange}
              style={{ outlineColor: "black" }}
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-2 password-field">
            <div className="flex flex-row justify-between items-center w-full">
              <label htmlFor="password">Password</label>
              {/* <Link
                href="/forgot-password"
                className="text-xs text-[#AE7E56] font-normal underline"
              >
                Forgot Password?
              </Link> */}
            </div>
            <div className="w-full relative items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                name="password"
                className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
                tabIndex="2"
                autoComplete="off"
                onChange={handleChange}
                style={{ outlineColor: "black" }}
              />
              {showPassword ? (
                <MdOutlineVisibilityOff
                  size={16}
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                  aria-label="Hide password"
                />
              ) : (
                <MdOutlineRemoveRedEye
                  size={16}
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                  aria-label="Show password"
                />
              )}
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">{errors.password}</span>
            )}
          </div>
          <div className="quiz-option flex w-full py-2 items-center justify-between">
            <div className="basis-1/2">
              <label
                htmlFor="rememberme"
                className=" text-left text-sm text-[#212121] flex items-center"
              >
                <input
                  type="checkbox"
                  id="rememberme"
                  className="rounded border-gray-500 relative"
                  name="rememberme"
                  value="1"
                  tabIndex="3"
                  onChange={handleChange}
                />
                &nbsp;Remember me
              </label>
            </div>
            <div className="basis-1/2">
              <Link
                href={`/forgot-password${
                  redirectTo ? "?redirect_to=" + redirectTo : ""
                }${isEdFlow ? (redirectTo ? "&" : "?") + "ed-flow=1" : ""}`}
                className="text-[#AE7E56] text-sm font-normal block text-right underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="w-full flex justify-center items-center my-5">
            <button
              type="submit"
              className="bg-black text-white py-[12.5px] w-full rounded-full"
              disabled={submitting}
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default function Login({ setActiveTab, loginRef }) {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<Loader />}>
        <LoginContent setActiveTab={setActiveTab} loginRef={loginRef} />
      </Suspense>
    </div>
  );
}
