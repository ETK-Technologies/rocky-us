import { useEffect, useRef, useState } from "react";
import { CANADA_POST_API_KEY, mapProvinceCode } from "./config";
import { logger } from "@/utils/devLogger";

const AddressAutocomplete = ({
  title,
  name,
  value,
  placeholder,
  required,
  onChange,
  onAddressSelected,
  ...props
}) => {
  const inputRef = useRef(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  // Function to load the Canada Post AddressComplete script
  useEffect(() => {
    if (!window.pca && !scriptError) {
      const script = document.createElement("script");

      // Try the updated URL for Canada Post Address Complete API
      script.src =
        "https://ws1.postescanada-canadapost.ca/addresscomplete/js/pca.js";
      script.async = true;

      script.onload = () => {
        logger.log("Canada Post Address Complete script loaded successfully");
        setIsScriptLoaded(true);
      };

      script.onerror = (error) => {
        logger.error(
          "Failed to load Canada Post Address Complete script:",
          error
        );
        setScriptError(true);

        // Try alternative URL as fallback
        const fallbackScript = document.createElement("script");
        fallbackScript.src = "https://api.addressy.com/js/addressy.js";
        fallbackScript.async = true;

        fallbackScript.onload = () => {
          logger.log("Fallback address script loaded successfully");
          setIsScriptLoaded(true);
        };

        fallbackScript.onerror = () => {
          logger.error("Failed to load fallback address script");
          setScriptError(true);
        };

        document.head.appendChild(fallbackScript);
      };

      document.head.appendChild(script);

      return () => {
        if (script.parentNode) {
          document.head.removeChild(script);
        }
      };
    } else if (window.pca) {
      setIsScriptLoaded(true);
    }
  }, [scriptError]);

  // Initialize the Canada Post AddressComplete when the script is loaded
  useEffect(() => {
    if (isScriptLoaded && inputRef.current && window.pca) {
      try {
        // Fields to populate
        const fields = [{ element: inputRef.current, field: "Line1" }];

        const options = {
          key: CANADA_POST_API_KEY,
          search: { countries: "CAN" },
          populate: true,
        };

        // Create the address control
        const control = new window.pca.Address(fields, options);

        // Handle address selection
        control.listen("populate", (address) => {
          if (onAddressSelected) {
            const formattedAddress = {
              address_1: address.Line1 || "",
              address_2: address.Line2 || "",
              city: address.City || "",
              state: mapProvinceCode(address.Province || ""),
              postcode: address.PostalCode || "",
            };

            onAddressSelected(formattedAddress);
          }
        });

        return () => {
          if (control && typeof control.destroy === "function") {
            control.destroy();
          }
        };
      } catch (error) {
        logger.error("Error initializing address autocomplete:", error);
      }
    }
  }, [isScriptLoaded, onAddressSelected]);

  return (
    <div className="mb-4 md:mb-0 w-full">
      <label
        htmlFor={name}
        className="block text-[14px] leading-[19.6px] font-[500] text-[#212121] mb-2"
      >
        {title}
        {required && "*"}
      </label>
      <input
        ref={inputRef}
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full !bg-white !rounded-[8px] !border !border-solid !border-[#E2E2E1] !px-[16px] py-[12px] h-[44px] !focus:outline-none !focus:border-gray-500"
        {...props}
      />
      {scriptError && (
        <p className="text-xs text-gray-500 mt-1">
          Address autocomplete is currently unavailable. Please enter your
          address manually.
        </p>
      )}
    </div>
  );
};

export default AddressAutocomplete;
