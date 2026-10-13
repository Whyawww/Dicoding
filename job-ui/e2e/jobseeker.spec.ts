import { test, expect } from "@playwright/test";

test.describe("Jobseeker Flow", () => {
  const BASE_URL = "http://localhost:3000";

  test("User opens vacancies list, searches a job, and views details", async ({
    page,
  }) => {
    // User opens the vacancies list page
    await page.goto(BASE_URL);

    await expect(
      page.locator("h2", { hasText: "Daftar Pekerjaan Terbaru" }),
    ).toBeVisible();

    // User searches a job by title
    const searchInput = page.locator(
      'input[placeholder*="Cari berdasarkan judul"]',
    );

    await searchInput.fill("Product Engineer");

    await page.waitForTimeout(1000);

    const jobCard = page.locator("h3", { hasText: "Product Engineer" }).first();
    await expect(jobCard).toBeVisible();

    // User views vacancy details
    await jobCard.click();

    await expect(page).toHaveURL(new RegExp(".*/jobs/\\d+"));

    await expect(
      page.locator("h1", { hasText: "Product Engineer" }),
    ).toBeVisible();
    await expect(
      page.locator("button", { hasText: "Lamar Pekerjaan Ini" }),
    ).toBeVisible();
  });
});
