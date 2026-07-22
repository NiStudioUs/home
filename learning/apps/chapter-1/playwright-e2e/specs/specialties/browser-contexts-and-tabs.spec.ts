import { test, expect } from '@playwright/test';

test.describe('Speciality: Browser Contexts and Tabs', () => {
    
    test('Multi-user session in separate isolated contexts', async ({ browser }) => {
        // Contexts are isolated incognito-like sessions within the same browser instance
        const userAContext = await browser.newContext();
        const userBContext = await browser.newContext();

        const pageA = await userAContext.newPage();
        const pageB = await userBContext.newPage();

        // User A logs in
        await pageA.goto('/index.html');
        await pageA.fill('#username', 'userA');
        await pageA.fill('#password', 'demo');
        await pageA.getByRole('button', { name: 'Log In' }).click();

        // User B tries to go directly to the dashboard
        // Because the contexts are isolated, User B should not share User A's session cookies/storage
        await pageB.goto('/pages/dashboard.html');
        
        // Assert User B is redirected back to login page
        await expect(pageB).toHaveURL(/.*index\.html/);

        // Cleanup
        await userAContext.close();
        await userBContext.close();
    });

    test('Handling new tabs (popups)', async ({ context, page }) => {
        await page.goto('/index.html');
        
        // Let's explicitly create a new tab in the same context
        const newTab = await context.newPage();
        
        // Navigate the new tab
        await newTab.goto('/index.html'); // avoiding dashboard to prevent auth redirect
        
        // Assert on the new tab
        await expect(newTab).toHaveURL(/.*index\.html/);
        
        // You can switch back to the original page by bringing it to front
        await page.bringToFront();
        await expect(page).toHaveURL(/.*index\.html/);
    });
});
