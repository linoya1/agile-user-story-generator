import React from "react";

/**
 * ResultsDisplay component - Displays generated user stories in a structured format
 * @param {Object} props
 * @param {Array<{id: number, text: string}>} props.stories - Array of user story objects
 */
export default function ResultsDisplay({ stories }) {
  if (!stories || stories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <svg
            className="w-7 h-7 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Generated User Stories
        </h2>
        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {stories.length} {stories.length === 1 ? "story" : "stories"}
        </span>
      </div>

      <div className="space-y-4">
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-l-4 border-primary-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {story.id}
              </div>

              <div className="flex-1 pt-1">
                <p className="text-slate-700 leading-relaxed text-base">
                  {story.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800 flex items-start gap-2">
          <svg
            className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            These user stories follow the standard format:{" "}
            <strong>"As a [user], I want [goal], so that [benefit]"</strong>.
            You can refine your feature description and regenerate for different
            perspectives.
          </span>
        </p>
      </div>
    </div>
  );
}
