import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  GEMINI_MODEL_NAME,
  API_TIMEOUT,
  ERROR_MESSAGES,
} from "../utils/constants";
import { buildPrompt } from "../utils/promptBuilder";

// Initialize Gemini API client
let genAI = null;
let model = null;

// Retry configuration
const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 2000; // 2 seconds

/**
 * Initializes the Gemini API client with the API key from environment variables
 * @throws {Error} If API key is not configured
 */
function initializeGemini() {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "VITE_GEMINI_API_KEY is not configured in environment variables"
    );
  }

  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({ model: GEMINI_MODEL_NAME });
}

/**
 * Delay helper for retry logic
 * @param {number} ms - Milliseconds to wait
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Makes an API call with retry logic for rate limiting
 * @param {string} prompt - The prompt to send
 * @param {number} attempt - Current attempt number
 * @returns {Promise<string>} The generated text
 */
async function callWithRetry(prompt, attempt = 1) {
  const generationConfig = {
    temperature: 0.7,
    maxOutputTokens: 1024,
  };

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });

    const response = await result.response;
    return response.text();
  } catch (error) {
    // Check if it's a rate limit error and we can retry
    const isRateLimited =
      error.message?.includes("429") ||
      error.message?.includes("quota") ||
      error.message?.includes("rate limit") ||
      error.message?.includes("Resource has been exhausted") ||
      error.message?.includes("Too Many Requests");

    if (isRateLimited && attempt < MAX_RETRIES) {
      const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt - 1); // Exponential backoff
      console.log(
        `Rate limited. Retrying in ${delayMs}ms (attempt ${
          attempt + 1
        }/${MAX_RETRIES})...`
      );
      await delay(delayMs);
      return callWithRetry(prompt, attempt + 1);
    }

    // Re-throw if we can't retry
    throw error;
  }
}

/**
 * Generates user stories from a feature description using Gemini API
 * @param {string} featureDescription - The feature description from user input
 * @returns {Promise<string>} The generated user stories as text
 * @throws {Error} Various errors for different failure scenarios
 */
export async function generateUserStories(featureDescription) {
  try {
    // Initialize Gemini if not already initialized
    if (!model) {
      initializeGemini();
    }

    // Build the prompt
    const prompt = buildPrompt(featureDescription);

    // Create a timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("TIMEOUT"));
      }, API_TIMEOUT);
    });

    // Create the API call promise with retry logic
    const apiCallPromise = callWithRetry(prompt);

    // Race between API call and timeout
    const text = await Promise.race([apiCallPromise, timeoutPromise]);

    return text;
  } catch (error) {
    // Handle different error types
    if (error.message === "TIMEOUT") {
      const timeoutError = new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
      timeoutError.code = "TIMEOUT";
      throw timeoutError;
    }

    // Check for authentication errors
    if (
      error.message?.includes("API_KEY") ||
      error.message?.includes("401") ||
      error.message?.includes("403")
    ) {
      const authError = new Error(ERROR_MESSAGES.AUTH_ERROR);
      authError.code = "AUTH_ERROR";
      throw authError;
    }

    // Check for rate limiting (after retries exhausted)
    if (
      error.message?.includes("429") ||
      error.message?.includes("quota") ||
      error.message?.includes("rate limit") ||
      error.message?.includes("Resource has been exhausted") ||
      error.message?.includes("Too Many Requests")
    ) {
      const rateLimitError = new Error(ERROR_MESSAGES.RATE_LIMIT_ERROR);
      rateLimitError.code = "RATE_LIMIT";
      throw rateLimitError;
    }

    // Check for 404 errors (model not found)
    if (
      error.message?.includes("404") ||
      error.message?.includes("not found")
    ) {
      const notFoundError = new Error(
        "Model not available. Please try again later."
      );
      notFoundError.code = "NOT_FOUND";
      throw notFoundError;
    }

    // Check for network errors
    if (
      error.message?.includes("fetch") ||
      error.message?.includes("network") ||
      error.message?.includes("ENOTFOUND")
    ) {
      const networkError = new Error(ERROR_MESSAGES.NETWORK_ERROR);
      networkError.code = "NETWORK_ERROR";
      throw networkError;
    }

    // Generic error
    console.error("Gemini API Error:", error);
    const genericError = new Error(ERROR_MESSAGES.GENERIC_ERROR);
    genericError.code = "GENERIC_ERROR";
    genericError.originalError = error;
    throw genericError;
  }
}
