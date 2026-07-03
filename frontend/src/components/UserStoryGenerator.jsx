import React, { useState } from "react";
import InputSection from "./InputSection";
import ResultsDisplay from "./ResultsDisplay";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import { generateUserStories } from "../services/geminiService";
import { validateInput } from "../utils/validation";
import { formatUserStories, validateStoryFormat } from "../utils/formatter";
import { ERROR_MESSAGES } from "../utils/constants";

/**
 * UserStoryGenerator - Main container component for the application
 */
export default function UserStoryGenerator() {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Handles the generation of user stories
   */
  const handleGenerate = async () => {
    // Clear previous results and errors
    setError(null);
    setResults([]);

    // Validate input
    const validation = validateInput(inputText);
    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    // Set loading state
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await generateUserStories(inputText);

      // Format the response
      const formattedStories = formatUserStories(response);

      // Validate the formatted stories
      if (!validateStoryFormat(formattedStories)) {
        setError(ERROR_MESSAGES.INVALID_RESPONSE);
        setIsLoading(false);
        return;
      }

      // Update results
      setResults(formattedStories);
    } catch (err) {
      // Handle errors
      setError(err.message || ERROR_MESSAGES.GENERIC_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles clearing the input and results
   */
  const handleClear = () => {
    setInputText("");
    setResults([]);
    setError(null);
  };

  /**
   * Handles input text changes
   */
  const handleInputChange = (value) => {
    setInputText(value);
    // Clear error when user starts typing
    if (error) {
      setError(null);
    }
  };

  /**
   * Handles dismissing error messages
   */
  const handleDismissError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="inline-block mb-4">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 rounded-2xl shadow-lg">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 mb-3 bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
            User Story Generator
          </h1>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Transform your feature ideas into well-structured user stories using
            AI. Simply describe your feature, and let Gemini generate actionable
            user stories in the standard format.
          </p>
        </header>

        {/* Main Content */}
        <main className="space-y-8">
          {/* Input Section */}
          <div className="card">
            <InputSection
              value={inputText}
              onChange={handleInputChange}
              onGenerate={handleGenerate}
              onClear={handleClear}
              isLoading={isLoading}
              characterCount={inputText.length}
            />
          </div>

          {/* Error Display */}
          {error && (
            <ErrorMessage message={error} onDismiss={handleDismissError} />
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="card">
              <LoadingSpinner />
            </div>
          )}

          {/* Results Display */}
          {!isLoading && results.length > 0 && (
            <div className="card">
              <ResultsDisplay stories={results} />
            </div>
          )}

          {/* Empty State */}
          {!isLoading &&
            !error &&
            results.length === 0 &&
            inputText.trim().length === 0 && (
              <div className="card bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-dashed border-slate-300">
                <div className="text-center py-12">
                  <svg
                    className="w-16 h-16 text-slate-400 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>

                  <h3 className="text-xl font-semibold text-slate-700 mb-2">
                    Ready to Generate User Stories?
                  </h3>

                  <p className="text-slate-500 mb-6 max-w-md mx-auto">
                    Enter a feature description above to get started. The AI
                    will generate 3-5 user stories following best practices.
                  </p>

                  <div className="bg-white rounded-lg p-4 max-w-md mx-auto text-left shadow-sm">
                    <p className="text-sm font-semibold text-slate-700 mb-2">
                      💡 Example:
                    </p>
                    <p className="text-sm text-slate-600 italic">
                      "I need a password reset feature for users who forgot
                      their login credentials. Users should be able to request a
                      reset link via email and create a new password using a
                      secure, time-limited token."
                    </p>
                  </div>
                </div>
              </div>
            )}
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>
            Powered by{" "}
            <span className="font-semibold text-primary-600">
              Google Gemini AI
            </span>
          </p>
          <p className="mt-2">
            Built for software engineering education • Running on localhost
          </p>
        </footer>
      </div>
    </div>
  );
}
