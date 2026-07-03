import { MAX_INPUT_LENGTH, ERROR_MESSAGES } from "./constants";

/**
 * Validates user input for feature description
 * @param {string} text - The input text to validate
 * @returns {{ isValid: boolean, errorMessage: string }} Validation result
 */
export function validateInput(text) {
  // Check if input is empty or only whitespace
  if (!text || text.trim().length === 0) {
    return {
      isValid: false,
      errorMessage: ERROR_MESSAGES.EMPTY_INPUT,
    };
  }

  // Check if input exceeds maximum length
  if (text.length > MAX_INPUT_LENGTH) {
    return {
      isValid: false,
      errorMessage: ERROR_MESSAGES.INPUT_TOO_LONG,
    };
  }

  return {
    isValid: true,
    errorMessage: "",
  };
}

/**
 * Checks if text is within character limit
 * @param {string} text - The text to check
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} True if within limit
 */
export function isWithinCharacterLimit(text, maxLength) {
  return text.length <= maxLength;
}
