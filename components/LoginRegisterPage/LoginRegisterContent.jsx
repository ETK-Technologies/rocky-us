"use client";

import { useState, useEffect, Suspense } from "react";
import { logger } from "@/utils/devLogger";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Login from "./Login";
import Register from "./Register";

const LoginRegisterContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login");
  const [logoutProcessed, setLogoutProcessed] = useState(false);

  useEffect(() => {
    const viewShow = searchParams.get("viewshow");
    if (viewShow === "register") {
      setActiveTab("register");
    } else if (viewShow === "login") {
      setActiveTab("login");
    }

    // Check for patient portal logout parameter
    const ppLogout = searchParams.get("pp-logout");
    const refSource = searchParams.get("ref");

    // Handle patient portal logout
    if (ppLogout === "1" && !logoutProcessed) {
      const handlePatientPortalLogout = async () => {
        try {
          // Call our specialized patient portal logout API
          const response = await fetch("/api/patient-portal-logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          if (response.ok && data.success) {
            // Show the success message for patient portal logout
            toast.success("You are successfully logged out of patient portal");

            // Clear localStorage items related to authentication
            localStorage.removeItem("userDetails");
            localStorage.removeItem("userProfileData");
            localStorage.removeItem("cartItems");

            // Mark logout as processed to prevent multiple calls
            setLogoutProcessed(true);

            // Trigger a cart updated event to refresh the cart display
            const cartUpdatedEvent = new CustomEvent("cart-updated");
            document.dispatchEvent(cartUpdatedEvent);

            // Force a complete page refresh to update all components
            // This ensures navbar and cart items are properly updated
            setTimeout(() => {
              window.location.href = "/";
            }, 1500); // Small delay to ensure the toast message is visible
          } else {
            logger.error(
              "Error during patient portal logout:",
              data.error || response.statusText
            );
          }
        } catch (error) {
          logger.error("Exception during patient portal logout:", error);
        }
      };

      handlePatientPortalLogout();
    }
  }, [searchParams, logoutProcessed, router]);

  if (activeTab === "register") {
    return <Register />;
  }

  if (activeTab === "login") {
    return <Login />;
  }

  return <Register />;
};

export default function LoginRegisterWrapper() {
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginRegisterContent />
      </Suspense>
    </div>
  );
}
