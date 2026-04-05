import { expect, test } from '@playwright/test';

test('home page loads and shows the logo', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/kandb/i);
  const svg = page.locator('svg').first();
  await expect(svg).toBeVisible();
});
