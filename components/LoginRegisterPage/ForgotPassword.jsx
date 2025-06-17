"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";

const ForgotPasswordContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const redirectTo = searchParams.get("redirect_to");
  const isEdFlow = searchParams.get("ed-flow") === "1";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // API endpoint for password reset would go here
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setEmailSent(true);
        toast.success(
          "Password reset email has been sent to your email address"
        );
      } else {
        toast.error(
          data.message ||
            "Failed to send password reset email. Please try again."
        );
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("An error occurred while processing your request.");
    } finally {
      setSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex flex-col items-center justify-center mx-auto py-8 px-8 w-[100%] max-w-[500px] text-center">
        <h2 className="text-[#251f20] text-[32px] headers-font font-[450] leading-[44.80px] mb-4">
          Check Your Email
        </h2>
        <p className="mb-6 text-gray-700">
          We've sent instructions to reset your password to {formData.email}.
          Please check your inbox and follow the link in the email.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          If you don't see the email, check your spam folder or
          <button
            className="text-[#AE7E56] underline ml-1"
            onClick={handleSubmit}
            disabled={submitting}
          >
            click here to resend
          </button>
        </p>
        <Link
          href={`/login-register?viewshow=login${
            redirectTo ? "&redirect_to=" + redirectTo : ""
          }${isEdFlow ? "&ed-flow=1" : ""}`}
          className="text-[#AE7E56] underline"
        >
          Return to login
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="px-3 mx-auto pt-5 text-center">
        <h2 className="text-[#251f20] text-[32px] headers-font font-[450] leading-[44.80px]">
          Forgot Your Password?
        </h2>
        <h3 className="text-sm text-center font-normal pt-2 tracking-normal">
          Enter your email address and we'll send you a link to reset your
          password.
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col flex-wrap items-center justify-center mx-auto py-3 px-8 pt-5 w-[100%] max-w-[400px] space-y-4">
          <div className="w-full flex flex-col items-start justify-center gap-2">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-[100%] rounded-[8px] h-[40px] text-md m-auto border-gray-500 border px-4"
              tabIndex="1"
              autoComplete="email"
              placeholder="Enter your email address"
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full flex justify-center items-center my-5">
            <button
              type="submit"
              className="bg-black text-white py-[12.5px] w-full rounded-full"
              disabled={submitting}
            >
              {submitting ? "Sending..." : "Reset Password"}
            </button>
          </div>

          <div className="w-full text-center">
            <Link
              href={`/login-register?viewshow=login${
                redirectTo ? "&redirect_to=" + redirectTo : ""
              }${isEdFlow ? "&ed-flow=1" : ""}`}
              className="text-[#AE7E56] text-sm font-normal underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default function ForgotPassword() {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<Loader />}>
        <ForgotPasswordContent />
      </Suspense>
    </div>
  );
}
