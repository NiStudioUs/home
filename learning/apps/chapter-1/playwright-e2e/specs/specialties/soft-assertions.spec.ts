import { test, expect } from '@playwright/test';

test.describe('Speciality: Soft Assertions', () => {

    test('Executing multiple soft assertions', async ({ page }) => {
        await page.goto('/index.html');

        // Normally, if an expect fails, the test stops immediately.
        // With expect.soft(), the test continues running, and compiles all failures at the end.
        
        // We will assert some things that are true
        await expect.soft(page).toHaveURL(/.*index\.html/);
        
        // Let's assert a non-critical UI element (like the developer footer text).
        // If this was missing, the test would still proceed to the core functional assertion below.
        await expect.soft(page.locator('.login-footer')).toContainText('Developed by KS');

        // This assertion will still run even if the previous one fails
        await expect.soft(page.locator('#username')).toBeVisible();

        // At the end of the test, Playwright will report all soft assertion failures.
    });

});
