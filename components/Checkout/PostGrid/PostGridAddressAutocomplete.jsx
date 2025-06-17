import { useState, useRef, useEffect } from "react";

const PostGridAddressAutocomplete = ({
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

  // Fetch address suggestions from PostGrid
  const fetchSuggestions = async (searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching suggestions for:", searchTerm);
      const response = await fetch("/api/postgrid/address-autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchTerm }),
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log("Parsed response data:", data);

      if (data.addresses && Array.isArray(data.addresses)) {
        setSuggestions(data.addresses);
      } else {
        console.log("No addresses in response:", data);
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Error fetching address suggestions:", err);
      setError("Failed to fetch address suggestions");
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Get full address details from PostGrid
  const getAddressDetails = async (addressId) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Fetching address details for ID:", addressId);
      const response = await fetch("/api/postgrid/address-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressId,
          searchTerm: inputValue,
        }),
      });

      console.log("Response status:", response.status);
      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${responseText}`);
      }

      const data = JSON.parse(responseText);
      console.log("Parsed response data:", data);

      if (data.address) {
        const address = data.address;

        // Format address for our form
        const formattedAddress = {
          address_1: address.street || "",
          address_2: address.unit || "",
          city: address.city || "",
          state: address.province || "",
          postcode: address.postalCode || "",
        };

        console.log("Formatted address:", formattedAddress);

        if (onAddressSelected) {
          onAddressSelected(formattedAddress);
        }

        // Update the input value
        setInputValue(address.street || "");
      } else {
        console.log("No address in response:", data);
      }
    } catch (err) {
      console.error("Error retrieving address details:", err);
      setError("Failed to retrieve address details");
    } finally {
      setIsLoading(false);
      setShowSuggestions(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Call the parent onChange handler
    if (onChange) {
      onChange({
        target: {
          name,
          value: newValue,
        },
      });
    }

    // Fetch suggestions for the new input value
    fetchSuggestions(newValue);
    setShowSuggestions(true);
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (suggestion) => {
    console.log("Selected suggestion:", suggestion);
    getAddressDetails(suggestion.id);
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
                key={suggestion.id || `suggestion-${index}`}
                className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                onClick={() => handleSelectSuggestion(suggestion)}
              >
                <div className="block truncate">
                  {suggestion.formattedAddress || "Unknown address"}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Temporarily hiding error message */}
      {/* {error && <p className="text-red-500 text-xs mt-1">{error}</p>} */}

      <p className="text-xs text-gray-500 mt-1">
        Start typing your address to see suggestions
      </p>
    </div>
  );
};

export default PostGridAddressAutocomplete;
