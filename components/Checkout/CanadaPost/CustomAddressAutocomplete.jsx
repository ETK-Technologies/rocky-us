import { useState, useRef, useEffect, useCallback } from "react";
import { mapProvinceCode } from "./config";
import { logger } from "@/utils/devLogger";

const CustomAddressAutocomplete = ({
  title,
  name,
  value,
  placeholder,
  required,
  onChange,
  onAddressSelected,
  ...props
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");
  const [error, setError] = useState(null);
  const wrapperRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  // Update local state when prop value changes
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch address suggestions
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/address-autocomplete?query=${encodeURIComponent(searchTerm)}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.Items && Array.isArray(data.Items)) {
        setSuggestions(data.Items);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      logger.error("Error fetching address suggestions:", err);
      setError("Failed to fetch address suggestions");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get full address details
  const getAddressDetails = async (id) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/address-autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.Items && data.Items.length > 0) {
        const address = data.Items[0];

        const formattedAddress = {
          address_1: address.Line1 || "",
          address_2: address.Line2 || "",
          city: address.City || "",
          state: mapProvinceCode(
            address.Province || address.ProvinceName || ""
          ),
          postcode: address.PostalCode || "",
        };

        const streetValue = address.Line1 || "";
        setInputValue(streetValue);

        if (onAddressSelected) {
          onAddressSelected(formattedAddress);
        }
      }
    } catch (err) {
      logger.error("Error retrieving address details:", err);
      setError("Failed to retrieve address details");
    } finally {
      setIsLoading(false);
      setShowSuggestions(false);
    }
  };

  // Debounced fetch suggestions function
  const debouncedFetchSuggestions = useCallback((searchTerm) => {
    // Clear any existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set a new timeout to fetch suggestions after 300ms delay
    debounceTimeoutRef.current = setTimeout(() => {
      fetchSuggestions(searchTerm);
    }, 300);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Use debounced fetch to avoid calling API on every keystroke
    debouncedFetchSuggestions(newValue);
    setShowSuggestions(true);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    getAddressDetails(suggestion.Id);
  };

  return (
    <div className="mb-4 md:mb-0 w-full" ref={wrapperRef}>
      <label
        htmlFor={name}
        className="block text-[14px] leading-[19.6px] font-[500] text-[#212121] mb-2"
      >
        {title}
        {required && "*"}
      </label>
      <div className="relative">
        <input
          type="text"
          id={name}
          name={name}
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full !bg-white !rounded-[8px] !border !border-solid !border-[#E2E2E1] !px-[16px] py-[12px] h-[44px] !focus:outline-none !focus:border-gray-500"
          autoComplete="off"
          {...props}
        />

        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}

        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.Id ? suggestion.Id : `suggestion-${index}`}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                <div className="block truncate">
                  {suggestion.Text ||
                    suggestion.Description ||
                    "Unknown address"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <p className="text-xs text-gray-500 mt-1">
        Start typing your address to see suggestions
      </p>
    </div>
  );
};

export default CustomAddressAutocomplete;
