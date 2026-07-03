// Application constants

export const MAX_INPUT_LENGTH = 5000;
export const API_TIMEOUT = 45000; // 45 seconds
export const GEMINI_MODEL_NAME = "gemini-3-flash-preview";

export const ERROR_MESSAGES = {
  EMPTY_INPUT: "Please enter a feature description",
  INPUT_TOO_LONG: `Feature description must be less than ${MAX_INPUT_LENGTH} characters`,
  NETWORK_ERROR:
    "Unable to generate stories. Please check your connection and try again.",
  AUTH_ERROR: "API authentication failed. Please check your configuration.",
  TIMEOUT_ERROR:
    "Request timed out. Please try again with a shorter description.",
  RATE_LIMIT_ERROR: "Too many requests. Please wait a moment and try again.",
  INVALID_RESPONSE:
    "Generated stories don't match expected format. Please try again or rephrase your input.",
  GENERIC_ERROR: "An unexpected error occurred. Please try again.",
};
