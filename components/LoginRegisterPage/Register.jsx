"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import {
  MdOutlineRemoveRedEye,
  MdOutlineVisibilityOff,
  MdArrowForward,
  MdArrowBack,
  MdClose,
} from "react-icons/md";
import { toast } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Datepicker from "react-tailwindcss-datepicker";
import {
  getSavedProducts,
  clearSavedProducts,
} from "../../utils/crossSellCheckout";
import { migrateLocalCartToServer } from "@/lib/cart/cartService";
import {
  ALL_US_STATES,
  PHASE_1_STATES,
  getStateLabel,
} from "@/lib/constants/usStates";

// Popup component for unsupported states
const UnsupportedStatePopup = ({ isOpen, onClose, selectedState, router }) => {
  if (!isOpen) return null;

  const handleUnderstood = () => {
    onClose();
    router.push("/service-coverage");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <MdClose size={24} />
        </button>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Service Not Available
          </h3>
          <p className="text-gray-600 mb-6">
            We apologize, but our services are not currently available in{" "}
            {getStateLabel(selectedState) || selectedState}. We are actively
            working to expand our coverage and will notify you once we are
            available in your state.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleUnderstood}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors font-medium"
            >
              See Where We Serve
            </button>
            <button
              onClick={onClose}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-50 transition-colors font-medium"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const RegisterContent = ({ setActiveTab, registerRef }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    date_of_birth: "",
    province: "", // We'll keep this field name for backend compatibility but use it for states
    gender: "",
  });
  const [datePickerValue, setDatePickerValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showUnsupportedPopup, setShowUnsupportedPopup] = useState(false);
  const [selectedUnsupportedState, setSelectedUnsupportedState] = useState("");
  const redirectTo = searchParams.get("redirect_to");
  const isEdFlow = searchParams.get("ed-flow") === "1";

  const genderOptions = [
    { value: "", label: "Select gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for state selection
    if (name === "province") {
      // We keep the field name as "province" for backend compatibility
      // Check if the selected state is supported (Phase 1)
      if (value && !PHASE_1_STATES.includes(value)) {
        setSelectedUnsupportedState(value);
        setShowUnsupportedPopup(true);
        return; // Don't update the form data
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeUnsupportedPopup = () => {
    setShowUnsupportedPopup(false);
    setSelectedUnsupportedState("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCrossSellProducts = async () => {
    try {
      const savedProducts = getSavedProducts();

      if (savedProducts) {
        const products = [
          {
            id: savedProducts.mainProduct.id,
            quantity: 1,
          },
          ...savedProducts.addons.map((addon) => ({
            id: addon.id,
            quantity: 1,
          })),
        ];

        const response = await fetch("/api/cart/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ products }),
        });

        if (!response.ok) {
          console.error("Failed to add cross-sell products to cart");
        }

        clearSavedProducts();

        return "/checkout?ed-flow=1";
      }
    } catch (error) {
      console.error("Error handling cross-sell products:", error);
    }

    return null;
  };

  const validateStep1 = () => {
    if (!formData.first_name || !formData.last_name) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!formData.email) {
      toast.error("Email address is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.phone) {
      toast.error("Phone number is required");
      return false;
    }
    if (!formData.date_of_birth) {
      toast.error("Date of birth is required");
      return false;
    }
    if (!formData.province) {
      toast.error("State is required");
      return false;
    }
    return true;
  };

  const handleNextStep = async (e) => {
    e.preventDefault();
    if (!validateStep1()) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          register_step: 1,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCurrentStep(2);
      } else {
        toast.error(
          data.error || "Registration failed. Please check and try again."
        );
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration failed. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackStep = () => {
    setCurrentStep(1);
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, "");

    if (phoneNumber.length <= 3) {
      return `(${phoneNumber}`;
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setFormData((prev) => ({
      ...prev,
      phone: formattedPhoneNumber,
    }));
  };

  const handleDateChange = (newValue) => {
    setDatePickerValue(newValue);

    if (newValue?.startDate) {
      const date = new Date(newValue.startDate);
      const formattedDate = `${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;

      setFormData((prev) => ({
        ...prev,
        date_of_birth: formattedDate,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        date_of_birth: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setLoading(true);

    try {
      const dateParts = formData.date_of_birth.split("/");
      const formattedDate =
        dateParts.length === 3
          ? `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`
          : formData.date_of_birth;

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          date_of_birth: formattedDate,
          province: formData.province,
          gender: formData.gender,
          register_step: 2,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        document.getElementById("cart-refresher")?.click();
        toast.success(data.message || "You registered successfully!");

        // Check if we came from a cross-sell popup
        const isFromCrossSell =
          searchParams.get("ed-flow") === "1" ||
          searchParams.get("wl-flow") === "1" ||
          searchParams.get("hair-flow") === "1" ||
          searchParams.get("mh-flow") === "1";

        // Only migrate cart if we're not coming from a cross-sell popup
        if (!isFromCrossSell) {
          let migrateSuccess = false;
          try {
            console.log(
              "Starting cart migration process for new registration..."
            );
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
            // Don't block registration flow if migration fails
          }
        } else {
          console.log(
            "Skipping cart migration as user came from cross-sell popup"
          );
        }

        // Small delay to ensure cart migration has time to complete server-side
        if (
          !isFromCrossSell &&
          redirectTo &&
          redirectTo.includes("/checkout")
        ) {
          console.log(
            "Waiting for cart migration to complete before checkout redirect..."
          );
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        let redirectPath;

        // Skip cross-sell product handling if we came from a cross-sell popup
        if (isEdFlow && !isFromCrossSell) {
          redirectPath = await handleCrossSellProducts();
        }

        if (!redirectPath) {
          redirectPath = redirectTo || "/";
        }

        router.push(redirectPath);
        setTimeout(() => {
          router.refresh();
        }, 300);

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
          confirm_password: "",
          phone: "",
          date_of_birth: "",
          province: "",
          gender: "",
        });
      } else {
        toast.error(
          data.error || "Registration failed. Please check and try again."
        );
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Registration failed. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="px-3 mx-auto pt-5 text-center">
        <h2
          className={`text-[#251f20] ${
            isEdFlow ? "text-[24px]" : "text-[32px]"
          } headers-font font-[450] leading-[140%] max-w-[520px] mx-auto`}
        >
          {isEdFlow ? (
            <>
              Congratulations! <br className="md:hidden" /> You're just moments
              away from making ED a thing of the past.
            </>
          ) : (
            "Welcome to Rocky"
          )}
        </h2>
        <h3 className="text-sm text-center font-normal pt-2 tracking-normal">
          Already have an account?
          <Link
            href={(() => {
              const currentParams = new URLSearchParams(
                searchParams.toString()
              );
              currentParams.set("viewshow", "login");
              return `/login-register?${currentParams.toString()}`;
            })()}
            className="font-[400] text-[#AE7E56] underline ml-1"
          >
            Log in
          </Link>
        </h3>
      </div>

      <form onSubmit={currentStep === 1 ? handleNextStep : handleSubmit}>
        <div className="flex flex-col flex-wrap items-center justify-center mx-auto py-3 px-8 pt-5 w-[100%] max-w-[400px] space-y-4">
          {currentStep === 1 ? (
            <>
              <div className="flex flex-col md:flex-row md:gap-2 w-full space-y-4 md:space-y-0">
                <div className="w-full flex flex-col items-start justify-center gap-2">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
                    tabIndex="1"
                    placeholder="Your first name"
                    value={formData.first_name}
                    onChange={handleChange}
                    style={{ outlineColor: "black" }}
                    required
                  />
                </div>
                <div className="w-full flex flex-col items-start justify-center gap-2">
                  <label htmlFor="last_name">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
                    tabIndex="1"
                    placeholder="Your last name"
                    value={formData.last_name}
                    onChange={handleChange}
                    style={{ outlineColor: "black" }}
                    required
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
                  tabIndex="1"
                  autoComplete="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  style={{ outlineColor: "black" }}
                  required
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2 password-field">
                <label htmlFor="password">Password</label>
                <div className="w-full relative items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    name="password"
                    className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
                    tabIndex="4"
                    autoComplete="off"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ outlineColor: "black" }}
                    required
                    minLength={6}
                  />
                  {showPassword ? (
                    <MdOutlineVisibilityOff
                      size={16}
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <MdOutlineRemoveRedEye
                      size={16}
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2 password-field">
                <label htmlFor="confirm_password">Confirm Password</label>
                <div className="w-full relative items-center">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm_password"
                    placeholder="Confirm your password"
                    name="confirm_password"
                    className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
                    tabIndex="4"
                    autoComplete="off"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    style={{ outlineColor: "black" }}
                    required
                  />
                  {showConfirmPassword ? (
                    <MdOutlineVisibilityOff
                      size={16}
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <MdOutlineRemoveRedEye
                      size={16}
                      className="absolute right-3 top-3 cursor-pointer"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-full flex items-start mb-2">
                <button
                  type="button"
                  onClick={handleBackStep}
                  className="bg-transparent border-none cursor-pointer p-1 hover:bg-gray-100 rounded-full"
                  aria-label="Go back to previous step"
                >
                  <MdArrowBack size={24} />
                </button>
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
                  placeholder="(___) ___-____"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  style={{ outlineColor: "black" }}
                  required
                  maxLength={14}
                />
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <label htmlFor="date_of_birth">Date of Birth</label>
                <div className="relative w-full">
                  <Datepicker
                    value={datePickerValue}
                    onChange={handleDateChange}
                    useRange={false}
                    asSingle={true}
                    popoverDirection="down"
                    displayFormat="MM/DD/YYYY"
                    toggleClassName="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    inputClassName="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent pr-10"
                    placeholder="mm/dd/yyyy"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <label htmlFor="province">State</label>
                <select
                  id="province"
                  name="province"
                  className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
                  value={formData.province}
                  onChange={handleChange}
                  style={{ outlineColor: "black" }}
                  required
                >
                  {ALL_US_STATES.filter(
                    (option) =>
                      option.value === "" ||
                      PHASE_1_STATES.includes(option.value)
                  ).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex flex-col items-start justify-center gap-2">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4 focus:outline focus:outline-2 focus:outline-black focus:ring-0 focus:border-transparent"
                  value={formData.gender}
                  onChange={handleChange}
                  style={{ outlineColor: "black" }}
                  required
                >
                  {genderOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div className="w-full flex justify-center items-center my-5">
            <button
              type="submit"
              className="bg-black text-white py-[12.5px] w-full rounded-full flex justify-center items-center"
              disabled={loading}
            >
              {currentStep === 1
                ? loading
                  ? "Processing..."
                  : "Continue"
                : loading
                ? "Signing up..."
                : "Complete Sign Up"}
              {!loading && <MdArrowForward className="ml-2" size={20} />}
            </button>
          </div>

          <div className="w-full text-center text-xs text-gray-600 mb-6">
            <p className="mb-3">
              By continuing, you agree to and have read the{" "}
              <Link href="/terms-of-use" className="text-[#AE7E56] underline">
                Terms and Conditions
              </Link>
              ,{" "}
              <Link href="/terms-of-use" className="text-[#AE7E56] underline">
                Professional Disclosure
              </Link>
              ,{" "}
              <Link href="/privacy-policy" className="text-[#AE7E56] underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms-of-use" className="text-[#AE7E56] underline">
                Telehealth Consent
              </Link>
            </p>
            <p>
              We respect your privacy. All of your information is securely
              stored on our PIPEDA Compliant server.
            </p>
          </div>
        </div>
      </form>

      {showUnsupportedPopup && (
        <UnsupportedStatePopup
          isOpen={showUnsupportedPopup}
          onClose={closeUnsupportedPopup}
          selectedState={selectedUnsupportedState}
          router={router}
        />
      )}
    </>
  );
};

export default function Register({ setActiveTab, registerRef }) {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<Loader />}>
        <RegisterContent
          setActiveTab={setActiveTab}
          registerRef={registerRef}
        />
      </Suspense>
    </div>
  );
}
