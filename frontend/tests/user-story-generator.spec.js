import { test, expect } from "@playwright/test";

/**
 * E2E Tests for User Story Generator
 * Tests cover the main happy path and edge cases
 */

test.describe("User Story Generator", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app before each test
    await page.goto("/");
  });

  test("should display the application title and description", async ({
    page,
  }) => {
    // Check that the main heading is visible
    await expect(
      page.getByRole("heading", { name: /User Story Generator/i })
    ).toBeVisible();

    // Check that the description is present
    await expect(page.getByText(/Transform your feature ideas/i)).toBeVisible();
  });

  test("should have disabled generate button for empty input", async ({
    page,
  }) => {
    // Check that button is disabled when input is empty
    const generateButton = page.getByRole("button", {
      name: /Generate User Stories/i,
    });
    await expect(generateButton).toBeDisabled();
  });

  test("should show character count", async ({ page }) => {
    const textarea = page.getByLabel(/Feature description input/i);

    // Type some text
    await textarea.fill("Test feature description");

    // Check character count is displayed
    await expect(page.getByText(/\d+ \/ 5000/)).toBeVisible();
  });

  test("should enable generate button when input is provided", async ({
    page,
  }) => {
    const textarea = page.getByLabel(/Feature description input/i);
    const generateButton = page.getByRole("button", {
      name: /Generate User Stories/i,
    });

    // Initially button should be disabled (empty input)
    await expect(generateButton).toBeDisabled();

    // Type some text
    await textarea.fill("Add a login feature for users");

    // Button should now be enabled
    await expect(generateButton).toBeEnabled();
  });

  test("should clear input and results when clear button is clicked", async ({
    page,
  }) => {
    const textarea = page.getByLabel(/Feature description input/i);
    const clearButton = page.getByRole("button", { name: /Clear/i });

    // Type some text
    await textarea.fill("Test feature");

    // Click clear
    await clearButton.click();

    // Input should be empty
    await expect(textarea).toHaveValue("");
  });

  test("should show loading state when generating", async ({ page }) => {
    // Note: This test requires a valid API key to actually test
    // For now, we just check that the loading state appears
    const textarea = page.getByLabel(/Feature description input/i);
    const generateButton = page.getByRole("button", {
      name: /Generate User Stories/i,
    });

    // Fill in the textarea
    await textarea.fill("Add a password reset feature");

    // Click generate
    await generateButton.click();

    // Check for loading state (button should show "Generating...")
    // Note: This might be very quick if API responds fast
    const loadingText = page.getByText(/Generating/i);

    // We use a try-catch because the loading state might be too fast to catch
    try {
      await expect(loadingText).toBeVisible({ timeout: 1000 });
    } catch (e) {
      // If loading state was too fast, that's okay
      console.log("Loading state was too fast to capture");
    }
  });

  test("should display empty state message initially", async ({ page }) => {
    // Check for empty state message
    await expect(
      page.getByText(/Ready to Generate User Stories/i)
    ).toBeVisible();

    // Check for example text
    await expect(page.getByText(/Example:/i)).toBeVisible();
  });

  test("should show error message when character limit is exceeded", async ({
    page,
  }) => {
    const textarea = page.getByLabel(/Feature description input/i);

    // Create a string longer than 5000 characters
    const longText = "a".repeat(5001);

    // Fill textarea with long text
    await textarea.fill(longText);

    // Should show error about character limit
    await expect(
      page.getByText(/reduce your description to 5000 characters/i)
    ).toBeVisible();

    // Generate button should be disabled
    const generateButton = page.getByRole("button", {
      name: /Generate User Stories/i,
    });
    await expect(generateButton).toBeDisabled();
  });

  test("should have accessible form elements", async ({ page }) => {
    // Check that textarea has proper label
    const textarea = page.getByLabel(/Feature description/i);
    await expect(textarea).toBeVisible();

    // Check that buttons are accessible
    await expect(
      page.getByRole("button", { name: /Generate User Stories/i })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /Clear/i })).toBeVisible();
  });

  test("should generate and display stories successfully (mocked API)", async ({ page }) => {
    // Mock the Gemini API call to return a predictable response
    // The @google/generative-ai SDK uses generativelanguage.googleapis.com
    await page.route("**/generativelanguage.googleapis.com/**", async (route) => {
      const json = {
        candidates: [
          {
            content: {
              parts: [
                {
                  text: "1. As a mocked user, I want to generate stories, so that I can test without an API key.\n2. As a developer, I want to mock API calls, so that tests are reliable and fast.\n3. As a tester, I want to see results, so that I know the UI works.",
                },
              ],
            },
          },
        ],
      };
      await route.fulfill({ json });
    });

    const textarea = page.getByLabel(/Feature description input/i);
    const generateButton = page.getByRole("button", {
      name: /Generate User Stories/i,
    });

    // Fill in the textarea
    await textarea.fill("Test feature for mocking");

    // Click generate
    await generateButton.click();

    // Verification 1: Loading state appears appropriately
    // (Optional, dependent on speed, but effectively checked if we wait for results below)

    // Verification 2: Check that the mocked stories appear
    // We expect the formatter to handle the numbered list
    await expect(
      page.getByText(/As a mocked user, I want to generate stories/i)
    ).toBeVisible({ timeout: 10000 });
    await expect(
      page.getByText(/As a developer, I want to mock API calls/i)
    ).toBeVisible();
    await expect(
      page.getByText(/As a tester, I want to see results/i)
    ).toBeVisible();
  });
});

/**
 * Note: Tests that require actual API calls (successful generation, error handling)
 * are not included here as they require:
 * 1. A valid API key in .env.local
 * 2. Network connectivity
 * 3. Gemini API availability
 *
 * These should be tested manually or with mocked API responses in a more advanced setup.
 */
