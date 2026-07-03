import React from "react";
import { MAX_INPUT_LENGTH } from "../utils/constants";

/**
 * InputSection component - Handles user input for feature descriptions
 * @param {Object} props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Callback when input changes
 * @param {Function} props.onGenerate - Callback when generate button is clicked
 * @param {Function} props.onClear - Callback when clear button is clicked
 * @param {boolean} props.isLoading - Whether generation is in progress
 * @param {number} props.characterCount - Current character count
 */
export default function InputSection({
  value,
  onChange,
  onGenerate,
  onClear,
  isLoading,
  characterCount,
}) {
  const isInputEmpty = !value || value.trim().length === 0;
  const isOverLimit = characterCount > MAX_INPUT_LENGTH;

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="feature-input"
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          Feature Description
        </label>

        <textarea
          id="feature-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe the feature you want to create user stories for... 

Example: I need a password reset feature for users who forgot their login credentials. Users should be able to request a reset link via email and create a new password using a secure, time-limited token."
          className={`w-full h-48 px-4 py-3 border-2 rounded-lg resize-none focus:outline-none focus:ring-2 transition-all duration-200 ${
            isOverLimit
              ? "border-red-300 focus:border-red-500 focus:ring-red-200"
              : "border-slate-300 focus:border-primary-500 focus:ring-primary-200"
          }`}
          disabled={isLoading}
          aria-label="Feature description input"
          aria-describedby="character-count"
        />

        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-slate-500">
            Enter a detailed description of your feature (1-3 sentences
            recommended)
          </p>

          <p
            id="character-count"
            className={`text-sm font-medium ${
              isOverLimit
                ? "text-red-600"
                : characterCount > MAX_INPUT_LENGTH * 0.9
                ? "text-orange-600"
                : "text-slate-500"
            }`}
          >
            {characterCount} / {MAX_INPUT_LENGTH}
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onGenerate}
          disabled={isLoading || isInputEmpty || isOverLimit}
          className="btn-primary flex-1 flex items-center justify-center gap-2"
          aria-label="Generate user stories"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin h-5 w-5"
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
              Generating...
            </>
          ) : (
            <>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Generate User Stories
            </>
          )}
        </button>

        <button
          onClick={onClear}
          disabled={isLoading}
          className="btn-secondary flex items-center justify-center gap-2"
          aria-label="Clear input and results"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Clear
        </button>
      </div>

      {isOverLimit && (
        <p className="text-sm text-red-600 flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Please reduce your description to {MAX_INPUT_LENGTH} characters or
          less
        </p>
      )}
    </div>
  );
}
