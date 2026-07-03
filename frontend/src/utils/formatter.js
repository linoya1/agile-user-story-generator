/**
 * Formats the raw Gemini response into structured user story objects
 * @param {string} geminiResponse - Raw text response from Gemini
 * @returns {Array<{id: number, text: string}>} Array of formatted user stories
 */
export function formatUserStories(geminiResponse) {
  if (!geminiResponse || typeof geminiResponse !== "string") {
    return [];
  }

  // Split by newlines and filter out empty lines
  const lines = geminiResponse
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const stories = [];
  let storyId = 1;

  for (const line of lines) {
    // Match numbered lists: "1.", "1)", "1 -", etc.
    const numberedMatch = line.match(/^\d+[\.\)]\s*(.+)$/);
    if (numberedMatch) {
      stories.push({
        id: storyId++,
        text: numberedMatch[1].trim(),
      });
      continue;
    }

    // Match bullet points: "-", "•", "*"
    const bulletMatch = line.match(/^[-•*]\s*(.+)$/);
    if (bulletMatch) {
      stories.push({
        id: storyId++,
        text: bulletMatch[1].trim(),
      });
      continue;
    }

    // If line starts with "As a" (user story format), include it even without numbering
    if (line.toLowerCase().startsWith("as a")) {
      stories.push({
        id: storyId++,
        text: line,
      });
    }
  }

  return stories;
}

/**
 * Validates that stories follow the expected "As a... I want... so that..." format
 * @param {Array<{id: number, text: string}>} stories - Array of story objects
 * @returns {boolean} True if at least one story matches the expected format
 */
export function validateStoryFormat(stories) {
  if (!stories || stories.length === 0) {
    return false;
  }

  // Check if at least one story follows the "As a... I want... so that..." pattern
  const userStoryPattern = /as\s+a\s+.+\s+i\s+want\s+.+/i;

  return stories.some((story) => userStoryPattern.test(story.text));
}
