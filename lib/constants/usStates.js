// US States constants for registration and checkout forms

// Phase 1 states (currently supported - May 1st, 2025) - using state codes
export const PHASE_1_STATES = [
  "AL",
  "AZ",
  "AR",
  "CO",
  "CT",
  "FL",
  "GA",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NJ",
  "NY",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

// Phase 2 states (coming August 1st, 2025) - using state codes
export const PHASE_2_STATES = [
  "AK",
  "DE",
  "HI",
  "MA",
  "NH",
  "NM",
  "NC",
  "RI",
  "VT",
];

// Phase 3 states (coming November 1st, 2025) - using state codes
export const PHASE_3_STATES = ["CA"];

// All US states for dropdown (with abbreviations)
export const US_STATES_WITH_CODES = [
  { value: "", label: "Select a state", code: "" },
  { value: "Alabama", label: "Alabama", code: "AL" },
  { value: "Alaska", label: "Alaska", code: "AK" },
  { value: "Arizona", label: "Arizona", code: "AZ" },
  { value: "Arkansas", label: "Arkansas", code: "AR" },
  { value: "California", label: "California", code: "CA" },
  { value: "Colorado", label: "Colorado", code: "CO" },
  { value: "Connecticut", label: "Connecticut", code: "CT" },
  { value: "Delaware", label: "Delaware", code: "DE" },
  { value: "Florida", label: "Florida", code: "FL" },
  { value: "Georgia", label: "Georgia", code: "GA" },
  { value: "Hawaii", label: "Hawaii", code: "HI" },
  { value: "Idaho", label: "Idaho", code: "ID" },
  { value: "Illinois", label: "Illinois", code: "IL" },
  { value: "Indiana", label: "Indiana", code: "IN" },
  { value: "Iowa", label: "Iowa", code: "IA" },
  { value: "Kansas", label: "Kansas", code: "KS" },
  { value: "Kentucky", label: "Kentucky", code: "KY" },
  { value: "Louisiana", label: "Louisiana", code: "LA" },
  { value: "Maine", label: "Maine", code: "ME" },
  { value: "Maryland", label: "Maryland", code: "MD" },
  { value: "Massachusetts", label: "Massachusetts", code: "MA" },
  { value: "Michigan", label: "Michigan", code: "MI" },
  { value: "Minnesota", label: "Minnesota", code: "MN" },
  { value: "Mississippi", label: "Mississippi", code: "MS" },
  { value: "Missouri", label: "Missouri", code: "MO" },
  { value: "Montana", label: "Montana", code: "MT" },
  { value: "Nebraska", label: "Nebraska", code: "NE" },
  { value: "Nevada", label: "Nevada", code: "NV" },
  { value: "New Hampshire", label: "New Hampshire", code: "NH" },
  { value: "New Jersey", label: "New Jersey", code: "NJ" },
  { value: "New Mexico", label: "New Mexico", code: "NM" },
  { value: "New York", label: "New York", code: "NY" },
  { value: "North Carolina", label: "North Carolina", code: "NC" },
  { value: "North Dakota", label: "North Dakota", code: "ND" },
  { value: "Ohio", label: "Ohio", code: "OH" },
  { value: "Oklahoma", label: "Oklahoma", code: "OK" },
  { value: "Oregon", label: "Oregon", code: "OR" },
  { value: "Pennsylvania", label: "Pennsylvania", code: "PA" },
  { value: "Rhode Island", label: "Rhode Island", code: "RI" },
  { value: "South Carolina", label: "South Carolina", code: "SC" },
  { value: "South Dakota", label: "South Dakota", code: "SD" },
  { value: "Tennessee", label: "Tennessee", code: "TN" },
  { value: "Texas", label: "Texas", code: "TX" },
  { value: "Utah", label: "Utah", code: "UT" },
  { value: "Vermont", label: "Vermont", code: "VT" },
  { value: "Virginia", label: "Virginia", code: "VA" },
  { value: "Washington", label: "Washington", code: "WA" },
  { value: "West Virginia", label: "West Virginia", code: "WV" },
  { value: "Wisconsin", label: "Wisconsin", code: "WI" },
  { value: "Wyoming", label: "Wyoming", code: "WY" },
];

// Registration form states with codes as values
export const ALL_US_STATES = [
  { value: "", label: "Select a state" },
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
];

// Helper function to check if a state is supported (using state code)
export const isStateSupported = (stateCode) => {
  return PHASE_1_STATES.includes(stateCode);
};

// Helper function to get state phase (using state code)
export const getStatePhase = (stateCode) => {
  if (PHASE_1_STATES.includes(stateCode)) return 1;
  if (PHASE_2_STATES.includes(stateCode)) return 2;
  if (PHASE_3_STATES.includes(stateCode)) return 3;
  return null;
};

// Helper function to map state name to code
export const getStateCode = (stateName) => {
  const state = US_STATES_WITH_CODES.find((s) => s.value === stateName);
  return state ? state.code : "";
};

// Helper function to map state code to name
export const getStateName = (stateCode) => {
  const state = US_STATES_WITH_CODES.find((s) => s.code === stateCode);
  return state ? state.value : "";
};

// Helper function to get state label from code
export const getStateLabel = (stateCode) => {
  const state = ALL_US_STATES.find((s) => s.value === stateCode);
  return state ? state.label : "";
};
