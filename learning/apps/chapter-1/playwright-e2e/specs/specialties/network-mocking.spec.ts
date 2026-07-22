import { test, expect } from '@playwright/test';

test.describe('Speciality: Network Mocking and Interception', () => {

    test('Mocking API responses', async ({ page }) => {
        // Intercept all requests that match the API endpoint
        await page.route('**/api/json/v1/1/random.php', async route => {
            // Provide a custom mocked JSON response
            const json = {
                meals: [{
                    idMeal: '99999',
                    strMeal: 'Quantum Burger',
                    strCategory: 'Sci-Fi',
                    strMealThumb: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'
                }]
            };
            await route.fulfill({ json });
        });

        // Authenticate to access dashboard
        await page.goto('/index.html');
        await page.fill('#username', 'demo');
        await page.fill('#password', 'demo');
        await page.getByRole('button', { name: 'Log In' }).click();

        // The dashboard fetches random meals on load
        await expect(page).toHaveURL(/.*dashboard\.html/);
        
        // Assert our mocked data appears!
        const firstFoodTitle = page.locator('.food-card h3').first();
        await expect(firstFoodTitle).toHaveText('Quantum Burger', { timeout: 5000 });
    });

    test('Simulating a 500 Server Error', async ({ page }) => {
        // Simulate the API being completely down
        await page.route('**/api/json/v1/1/random.php', async route => {
            await route.fulfill({
                status: 500,
                contentType: 'text/plain',
                body: 'Internal Server Error'
            });
        });

        // Authenticate to access dashboard
        await page.goto('/index.html');
        await page.fill('#username', 'demo');
        await page.fill('#password', 'demo');
        await page.getByRole('button', { name: 'Log In' }).click();
        await expect(page).toHaveURL(/.*dashboard\.html/);
        // Assert that the error toast appears in the UI
        await expect(page.locator('#errorToast')).toBeVisible();
    });

    test('Aborting requests to test performance or fallbacks', async ({ page }) => {
        // Abort all image requests to speed up tests or test the UI without images
        await page.route('**/*.{png,jpg,jpeg,svg,gif}', route => route.abort());

        await page.goto('/index.html');
        
        // Assert the page still loads the structural elements
        await expect(page.locator('#username')).toBeVisible();
    });
});
