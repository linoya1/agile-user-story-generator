import React from "react";

/**
 * LoadingSpinner component - Displays an animated loading indicator
 */
export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>

        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary-500 rounded-full animate-pulse opacity-50"></div>
      </div>

      <p className="text-slate-600 font-medium animate-pulse">
        Generating user stories...
      </p>

      <p className="text-sm text-slate-400">This may take a few moments</p>
    </div>
  );
}
