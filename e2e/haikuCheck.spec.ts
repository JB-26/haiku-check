import { test, expect } from "@playwright/test";

test.describe("Haiku Check", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("Haiku Check title", async ({ page }) => {
    await expect(page).toHaveTitle(/Haiku Check/);
  });

  test("Header 1 check", async ({ page }) => {
    await expect(page.locator("h1")).toHaveText("Wait, is that a haiku?");
  });

  test("First paragraph check", async ({ page }) => {
    await expect(
      page.getByText("Have you ever had the blind panic"),
    ).toHaveText(
      'Have you ever had the blind panic that you didn\'t know if you had a haiku? Well, I built this tool to help you answer the question, "Is this a haiku?"',
    );
  });

  test("Second paragraph check", async ({ page }) => {
    await expect(
      page.getByText("I built this project for two reasons"),
    ).toHaveText(
      "I built this project for two reasons. One, I thought it was fun. Two, I wanted to challenge myself and learn more about forms, states and effects in NextJS and React.",
    );
  });

  test("Third paragraph check", async ({ page }) => {
    await expect(page.getByText("At a company I worked for")).toHaveText(
      "At a company I worked for, the team I was part of had a tradition of writing haikus when we were due to give an update at a team meeting. But, there were several occasions when we wrote something that wasn't a haiku! So I decided to build this checker that would decide if something was a haiku.",
    );
  });

  test("Footer check", async ({ page }) => {
    await expect(
      page.getByText("A fun tool built by Joshua Blewitt"),
    ).toHaveText("A fun tool built by Joshua Blewitt");
  });

  test("should accept a valid haiku and show success message", async ({
    page,
  }) => {
    await page.fill("#line-one", "An old silent pond");
    await page.fill("#line-two", "A frog jumps into the pond");
    await page.fill("#line-three", "Splash! Silence again");

    await expect(page.locator("#line-one")).toHaveValue("An old silent pond");
    await expect(page.locator("#line-two")).toHaveValue(
      "A frog jumps into the pond",
    );
    await expect(page.locator("#line-three")).toHaveValue(
      "Splash! Silence again",
    );

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Yes, it's a haiku!")).toBeVisible();
    await expect(page.locator(".bg-green-300")).toBeVisible();
  });

  test("should display correct syllable counts for valid haiku", async ({
    page,
  }) => {
    await page.fill("#line-one", "An old silent pond");
    await page.fill("#line-two", "A frog jumps into the pond");
    await page.fill("#line-three", "Splash! Silence again");

    await expect(page.locator("#line-one")).toHaveValue("An old silent pond");
    await expect(page.locator("#line-two")).toHaveValue(
      "A frog jumps into the pond",
    );
    await expect(page.locator("#line-three")).toHaveValue(
      "Splash! Silence again",
    );

    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=The first line has 5 syllables"),
    ).toBeVisible();
    await expect(
      page.locator("text=The second line has 7 syllables"),
    ).toBeVisible();
    await expect(
      page.locator("text=The third line has 5 syllables"),
    ).toBeVisible();
  });

  test("should reject invalid haiku and show error message", async ({
    page,
  }) => {
    await page.fill("#line-one", "Hello");
    await page.fill("#line-two", "World");
    await page.fill("#line-three", "Test");

    await expect(page.locator("#line-one")).toHaveValue("Hello");
    await expect(page.locator("#line-two")).toHaveValue("World");
    await expect(page.locator("#line-three")).toHaveValue("Test");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=No, it's not a haiku")).toBeVisible();
    await expect(page.locator(".bg-red-300")).toBeVisible();
  });

  test("should show syllable counts for invalid haiku", async ({ page }) => {
    await page.fill("#line-one", "Hello");
    await page.fill("#line-two", "World");
    await page.fill("#line-three", "Test");

    await expect(page.locator("#line-one")).toHaveValue("Hello");
    await expect(page.locator("#line-two")).toHaveValue("World");
    await expect(page.locator("#line-three")).toHaveValue("Test");

    await page.click('button[type="submit"]');

    // Should still show syllable counts even when invalid
    await expect(page.locator("text=The first line has")).toBeVisible();
    await expect(page.locator("text=syllables").first()).toBeVisible();
  });

  test("should not submit with empty first line", async ({ page }) => {
    await page.fill("#line-two", "A frog jumps into the pond");
    await page.fill("#line-three", "Splash! Silence again");

    await page.click('button[type="submit"]');

    // Form should not submit (no success/error message appears)
    await expect(page.locator("text=Yes, it's a haiku!")).not.toBeVisible();
    await expect(page.locator("text=No, it's not a haiku")).not.toBeVisible();
  });

  test("should not submit with empty second line", async ({ page }) => {
    await page.fill("#line-one", "An old silent pond");
    await page.fill("#line-three", "Splash! Silence again");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Yes, it's a haiku!")).not.toBeVisible();
    await expect(page.locator("text=No, it's not a haiku")).not.toBeVisible();
  });

  test("should not submit with empty third line", async ({ page }) => {
    await page.fill("#line-one", "An old silent pond");
    await page.fill("#line-two", "A frog jumps into the pond");

    await page.click('button[type="submit"]');

    await expect(page.locator("text=Yes, it's a haiku!")).not.toBeVisible();
    await expect(page.locator("text=No, it's not a haiku")).not.toBeVisible();
  });

  test("should not submit completely empty form", async ({ page }) => {
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Yes, it's a haiku!")).not.toBeVisible();
    await expect(page.locator("text=No, it's not a haiku")).not.toBeVisible();
  });

  test("should allow typing in all fields", async ({ page }) => {
    await page.fill("#line-one", "Test line one");
    await page.fill("#line-two", "Test line two here");
    await page.fill("#line-three", "Test line three");

    await expect(page.locator("#line-one")).toHaveValue("Test line one");
    await expect(page.locator("#line-two")).toHaveValue("Test line two here");
    await expect(page.locator("#line-three")).toHaveValue("Test line three");
  });

  test("should update results when submitting different haikus", async ({
    page,
  }) => {
    // First submission - valid
    await page.fill("#line-one", "An old silent pond");
    await page.fill("#line-two", "A frog jumps into the pond");
    await page.fill("#line-three", "Splash! Silence again");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=Yes, it's a haiku!")).toBeVisible();

    // Second submission - invalid
    await page.fill("#line-one", "Hello");
    await page.fill("#line-two", "World");
    await page.fill("#line-three", "Test");
    await page.click('button[type="submit"]');

    await expect(page.locator("text=No, it's not a haiku")).toBeVisible();
    await expect(page.locator("text=Yes, it's a haiku!")).not.toBeVisible();
  });

  test("should clear input fields when user types new content", async ({
    page,
  }) => {
    await page.fill("#line-one", "First text");
    await page.fill("#line-one", "New text");

    await expect(page.locator("#line-one")).toHaveValue("New text");
  });

  test("should have proper labels for all inputs", async ({ page }) => {
    await expect(page.locator('label[for="line-one"]')).toHaveText(
      "Enter the first line of your haiku:",
    );
    await expect(page.locator('label[for="line-two"]')).toHaveText(
      "Enter the second line of your haiku:",
    );
    await expect(page.locator('label[for="line-three"]')).toHaveText(
      "Enter the third line of your haiku:",
    );
  });

  test("should have placeholders in all input fields", async ({ page }) => {
    await expect(page.locator("#line-one")).toHaveAttribute(
      "placeholder",
      "An old silent pond",
    );
    await expect(page.locator("#line-two")).toHaveAttribute(
      "placeholder",
      "A frog jumps into the pond",
    );
    await expect(page.locator("#line-three")).toHaveAttribute(
      "placeholder",
      "Splash! Silence again.",
    );
  });
});
