import { test, expect } from '@playwright/test';

test.describe('Speciality: Visual Regression Testing', () => {

    test('Visual comparison of the login page', async ({ page }) => {
        await page.goto('/index.html');
        
        // Wait for the page to be fully loaded and stable to avoid flaky snapshots
        await page.waitForLoadState('networkidle');

        // toHaveScreenshot() will:
        // 1. On the very first run, take a screenshot and save it as the "baseline". The test will fail, indicating a new baseline was created.
        // 2. On subsequent runs, it takes a new screenshot and compares it pixel-by-pixel against the baseline.
        
        await expect(page).toHaveScreenshot('login-page-baseline.png', {
            // maxDiffPixelRatio: 0.1, // Optional: allow a small percentage of pixel differences
            
            // If there's a dynamic element (like a clock or changing ad), you can mask it out:
            mask: [page.locator('.dynamic-clock')]
        });
    });

});
