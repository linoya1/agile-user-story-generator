import React from "react";

/**
 * ErrorMessage component - Displays user-friendly error messages
 * @param {Object} props
 * @param {string} props.message - The error message to display
 * @param {Function} props.onDismiss - Optional callback to dismiss the error
 */
export default function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md animate-fade-in">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-red-500"
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
        </div>

        <div className="ml-3 flex-1">
          <h3 className="text-sm font-semibold text-red-800">Error</h3>
          <p className="mt-1 text-sm text-red-700">{message}</p>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-3 flex-shrink-0 text-red-400 hover:text-red-600 transition-colors"
            aria-label="Dismiss error"
          >
            <svg
              className="h-5 w-5"
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
          </button>
        )}
      </div>
    </div>
  );
}
