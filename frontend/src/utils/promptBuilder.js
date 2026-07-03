/**
 * Builds a structured prompt for Gemini to generate user stories
 * @param {string} featureDescription - The feature description from user input
 * @returns {string} Formatted prompt for Gemini API
 */
export function buildPrompt(featureDescription) {
  return `You are a software engineering assistant specialized in creating user stories.

Generate exactly 3 user stories for the following feature description. Each user story MUST follow this exact format:
"As a [user type], I want [goal], so that [benefit]"

Feature description: ${featureDescription}

Requirements:
- Generate exactly 3 user stories
- Keep the stories concise and to the point
- Each story must be on a new line
- Number each story (1., 2., 3.)
- Focus on different user perspectives and use cases
- Ensure each story follows the "As a... I want... so that..." format

Output only the numbered user stories, nothing else.`;
}
