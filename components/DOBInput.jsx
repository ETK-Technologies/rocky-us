import React, { useState, useEffect, useRef } from "react";

const DOBInput = ({
  value,
  onChange,
  placeholder = "MM/DD/YYYY",
  className = "",
  minAge = 18,
  required = false,
  name = "date_of_birth",
  id = "date_of_birth",
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (value) {
      if (value.includes("-")) {
        const parts = value.split("-");
        if (parts.length === 3) {
          const formatted = `${parts[1].padStart(2, "0")}/${parts[2].padStart(
            2,
            "0"
          )}/${parts[0]}`;
          setInputValue(formatted);
        }
      } else {
        setInputValue(value);
      }
    }
  }, [value]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    const cursorPosition = e.target.selectionStart;

    // Allow direct editing with slashes
    let formatted = input;

    // Remove any non-digit characters except slashes
    formatted = formatted.replace(/[^\d/]/g, "");

    // Split into parts
    const parts = formatted.split("/");

    // Limit each part to appropriate length
    let month = parts[0] ? parts[0].substring(0, 2) : "";
    let day = parts[1] ? parts[1].substring(0, 2) : "";
    let year = parts[2] ? parts[2].substring(0, 4) : "";

    // Rebuild the formatted string
    let result = month;
    if (parts.length > 1 || (month.length === 2 && cursorPosition === 2)) {
      result += "/";
      result += day;
      if (parts.length > 2 || (day.length === 2 && cursorPosition > 3)) {
        result += "/";
        result += year;
      }
    }

    setInputValue(result);

    // Handle cursor position
    setTimeout(() => {
      if (inputRef.current) {
        let newCursorPos = cursorPosition;

        // If we just completed a month (typed 2nd digit), move past the slash
        if (
          month.length === 2 &&
          cursorPosition === 2 &&
          !input.includes("/")
        ) {
          newCursorPos = 3;
        }
        // If we just completed a day (typed 2nd digit), move past the slash
        else if (
          day.length === 2 &&
          cursorPosition === 5 &&
          input.split("/").length === 2
        ) {
          newCursorPos = 6;
        }

        inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);

    // Call onChange with appropriate format
    if (result.length === 10 && isValidDate(result)) {
      const dateParts = result.split("/");
      const backendFormat = `${dateParts[2]}-${dateParts[0].padStart(
        2,
        "0"
      )}-${dateParts[1].padStart(2, "0")}`;
      onChange && onChange(backendFormat);
    } else {
      onChange && onChange(result);
    }
  };

  const isValidDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 10) return false;

    const parts = dateStr.split("/");
    if (parts.length !== 3) return false;

    const month = parseInt(parts[0]);
    const day = parseInt(parts[1]);
    const year = parseInt(parts[2]);

    // Basic validation
    if (
      isNaN(month) ||
      isNaN(day) ||
      isNaN(year) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31 ||
      year < 1900 ||
      year > new Date().getFullYear()
    ) {
      return false;
    }

    // Create date and verify it's valid
    const date = new Date(year, month - 1, day);
    return (
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date.getFullYear() === year
    );
  };

  const isValidAge = (dateStr) => {
    if (!isValidDate(dateStr)) return false;

    const parts = dateStr.split("/");
    const birthDate = new Date(
      parseInt(parts[2]),
      parseInt(parts[0]) - 1,
      parseInt(parts[1])
    );
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age >= minAge;
  };

  const handleDatePickerChange = (e) => {
    if (e.target.value) {
      // Convert YYYY-MM-DD to MM/DD/YYYY format
      const [year, month, day] = e.target.value.split("-");
      const formatted = `${month}/${day}/${year}`;

      setInputValue(formatted);

      // Validate and call onChange
      if (isValidDate(formatted)) {
        const backendFormat = `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`;
        onChange && onChange(backendFormat);
      } else {
        onChange && onChange(formatted);
      }
    }
  };

  const getDatePickerValue = () => {
    if (inputValue && inputValue.length === 10 && isValidDate(inputValue)) {
      const parts = inputValue.split("/");
      // Convert MM/DD/YYYY to YYYY-MM-DD for date input
      return `${parts[2]}-${parts[0].padStart(2, "0")}-${parts[1].padStart(
        2,
        "0"
      )}`;
    }
    return "";
  };

  const isValid =
    inputValue && isValidDate(inputValue) && isValidAge(inputValue);

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={className}
          required={required}
          name={name}
          id={id}
          maxLength={10}
        />

        {/* Date Picker Icon */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="relative">
            <svg
              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            {/* Hidden Date Input */}
            <input
              type="date"
              value={getDatePickerValue()}
              onChange={handleDatePickerChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              max={new Date().toISOString().split("T")[0]}
              min="1900-01-01"
            />
          </div>
        </div>
      </div>

      {inputValue && !isValid && (
        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">
            {!isValidDate(inputValue)
              ? "Please enter a valid date in MM/DD/YYYY format"
              : `You must be ${minAge} years of age or older to continue.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default DOBInput;
