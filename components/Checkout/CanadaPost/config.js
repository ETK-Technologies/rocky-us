// Configuration for Canada Post AddressComplete
export const CANADA_POST_API_KEY = process.env.CANADA_POST_API_KEY; // Your Canada Post API key

export const canadaPostConfig = {
  key: CANADA_POST_API_KEY,
  countries: "CAN",
};

// Helper function to map province names to province codes
export const mapProvinceCode = (province) => {
  const provinceCodes = {
    Alberta: "AB",
    "British Columbia": "BC",
    Manitoba: "MB",
    "New Brunswick": "NB",
    "Newfoundland and Labrador": "NL",
    "Northwest Territories": "NT",
    "Nova Scotia": "NS",
    Nunavut: "NU",
    Ontario: "ON",
    "Prince Edward Island": "PE",
    Quebec: "QC",
    Saskatchewan: "SK",
    "Yukon Territory": "YT",
    Yukon: "YT",
  };

  return provinceCodes[province] || province;
};
