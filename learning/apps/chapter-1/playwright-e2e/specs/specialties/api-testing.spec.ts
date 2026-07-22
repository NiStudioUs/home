import { test, expect } from '@playwright/test';

test.describe('Speciality: API Testing', () => {

    // Playwright isn't just for UI; you can test REST APIs directly using the 'request' fixture
    test('Test an API Endpoint directly without a browser', async ({ request }) => {
        // Querying a public placeholder API since we don't have a backend server
        const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
        
        // Assert status code
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        // Parse and assert JSON body
        const json = await response.json();
        expect(json).toHaveProperty('userId');
        expect(json.id).toBe(1);
    });

    test('Combining API context with UI testing', async ({ request, page }) => {
        // Common Pattern: Seed test data via API, then verify it on the UI
        // Example:
        // await request.post('/api/users', { data: { name: 'TestUser' } });
        
        // Proceed with standard UI testing
        await page.goto('/index.html');
        await expect(page.locator('#username')).toBeVisible();
    });
});
