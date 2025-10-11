import { logger } from "@/utils/devLogger";

/**
 * Utility functions for age validation
 */

/**
 * Calculate age from date of birth
 * @param {string} dateOfBirth - Date of birth in YYYY-MM-DD format
 * @returns {number} - Age in years
 */
export const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null;

  try {
    logger.log(
      "Calculating age for date:",
      dateOfBirth,
      "Type:",
      typeof dateOfBirth
    );

    const birthDate = new Date(dateOfBirth);
    logger.log("Parsed birth date:", birthDate);

    const today = new Date();
    logger.log("Today's date:", today);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if birthday hasn't occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    logger.log("Calculated age:", age);
    return age;
  } catch (error) {
    logger.error("Error calculating age:", error);
    return null;
  }
};

/**
 * Check if user is old enough to purchase age-restricted products
 * @param {string} dateOfBirth - Date of birth in YYYY-MM-DD format
 * @param {number} minimumAge - Minimum age required (default: 19)
 * @returns {boolean} - True if user meets age requirement
 */
export const isOldEnough = (dateOfBirth, minimumAge = 19) => {
  const age = calculateAge(dateOfBirth);
  return age !== null && age >= minimumAge;
};

/**
 * Get age restriction message
 * @param {number} minimumAge - Minimum age required (default: 19)
 * @returns {string} - The restriction message
 */
export const getAgeRestrictionMessage = (minimumAge = 19) => {
  return `Sorry, you must be at least ${minimumAge} years old to purchase this product.`;
};

/**
 * Check if checkout should be blocked due to age restrictions
 * @param {string} dateOfBirth - User's date of birth
 * @param {number} minimumAge - Minimum age required (default: 19)
 * @returns {Object} - Object with blocked status and message
 */
export const checkAgeRestriction = (dateOfBirth, minimumAge = 19) => {
  const meetsAgeRequirement = isOldEnough(dateOfBirth, minimumAge);

  return {
    blocked: !meetsAgeRequirement,
    message: !meetsAgeRequirement ? getAgeRestrictionMessage(minimumAge) : null,
    age: calculateAge(dateOfBirth),
    minimumAge,
  };
};
