import { test, expect } from '../../fixtures/test-base';
import { Reporter } from '../../utils/reporter';
import mockData from '../../fixtures/mock-data.json';

test.describe('Data-Driven: Multi-User Cart Operations', () => {
    
    // Loop over each scenario in the JSON data
    for (const data of mockData) {
        
        test(`${data.scenario}`, async ({ page, loginPage, dashboardPage, cartPage }) => {
            
            await Reporter.attachJSON('Test Data', data);
            page.on('dialog', dialog => dialog.accept());

            await Reporter.step(`Login as ${data.username}`, async () => {
                await loginPage.doLogin(data.username, data.password);
                await expect(page).toHaveURL(/.*dashboard\.html|.*admin\.html/);
                
                // If admin, we need to go to dashboard manually for this test since admin goes to admin panel
                if (page.url().includes('admin.html')) {
                    await page.goto('pages/dashboard.html');
                }
            });

            await Reporter.step(`Add requested items`, async () => {
                await page.waitForSelector('.food-card', { state: 'visible' });
                for (const item of data.items) {
                    // Search for the item using the search bar
                    await dashboardPage.search(item);
                    // Wait for search debounce and UI update
                    await expect(dashboardPage.getNthFoodNameLocator(0)).toContainText(item, { ignoreCase: true });
                    // Add the first result that appears
                    await dashboardPage.addNthFoodToCart(0);
                }
                await expect(dashboardPage.cartCount).toHaveText(data.items.length.toString());
            });

            await Reporter.step(`Verify Cart content`, async () => {
                await dashboardPage.goToCart();
                const cartItems = page.locator('.cart-item');
                await expect(cartItems).toHaveCount(data.items.length);
            });

            // Cleanup local storage for the next test iteration isolation
            await page.evaluate(() => localStorage.clear());
        });
    }
});
