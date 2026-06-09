import { test, expect } from '../../fixtures/test-base';
import { Reporter } from '../../utils/reporter';

test.describe('E2E Journey: Complete Order Flow', () => {
    // Increase timeout for the journey test since it encompasses the entire app flow and map animation
    test.setTimeout(60000);
    
    // We do not wipe state between these steps as it's a single journey test.
    // Playwright resets context between test() blocks, so we put the whole flow in one test.

    test('User logs in, adds items, and completes checkout', async ({ page, loginPage, dashboardPage, cartPage, trackingPage }) => {
        
        // Handle unexpected alerts automatically by accepting them
        page.on('dialog', dialog => dialog.accept());

        await Reporter.step('1. Login', async () => {
            await loginPage.doLogin('demo', 'demo');
            await expect(page).toHaveURL(/.*dashboard\.html/);
        });

        await Reporter.step('2. Add items to cart', async () => {
            // Need to wait for food grid to load in JS
            await page.waitForSelector('.food-card', { state: 'visible' });

            await dashboardPage.addNthFoodToCart(0);
            await dashboardPage.addNthFoodToCart(1);
            
            await expect(dashboardPage.cartCount).toHaveText('2');
            
            // Expose the item names to the test context if needed, but since it's an E2E journey, 
            // we will just verify ANY two items exist in the cart by count or general presence.
        });

        await Reporter.step('3. Navigate to Cart', async () => {
            await dashboardPage.goToCart();
            await expect(page).toHaveURL(/.*cart\.html/);
            
            // Verify items are in the cart
            const cartItems = page.locator('.cart-item');
            await expect(cartItems).toHaveCount(2);
        });

        await Reporter.step('4. Checkout', async () => {
            await cartPage.doCheckout();
            await expect(page).toHaveURL(/.*order-tracking\.html/);
        });

        await Reporter.step('5. Order Tracking', async () => {
            await expect(trackingPage.statusMsg).toBeVisible();
            await Reporter.info('Waiting for order simulation to complete...');
            // The simulation takes around 12 seconds to complete (3 steps * 4 seconds).
            // Using web-first assertion with extended timeout instead of page.waitForFunction
            await expect(trackingPage.statusMsg).toContainText('Delivered', { timeout: 20000 });
            
            await Reporter.attachScreenshot('delivery-success', page);
        });
    });
});
