import { test, expect, type Page, type BrowserContext } from '@playwright/test';
import { Reporter } from '../../utils/reporter';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { CartPage } from '../../pages/CartPage';
import { TrackingPage } from '../../pages/TrackingPage';

test.describe.serial('E2E Journey: Complete Order Flow', () => {
    let context: BrowserContext;
    let page: Page;

    // Page Objects
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;
    let cartPage: CartPage;
    let trackingPage: TrackingPage;

    test.beforeAll(async ({ browser }) => {
        // Use browserContext to manage browser state and tabs
        context = await browser.newContext();
        page = await context.newPage(); // First tab
        
        // Initialize Page Objects with the shared page
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        cartPage = new CartPage(page);
        trackingPage = new TrackingPage(page);
    });

    test.afterAll(async () => {
        await page.close();
        await context.close();
    });

    test('1. User logs in', async () => {
        // Handle unexpected alerts automatically by accepting them
        page.on('dialog', dialog => dialog.accept());

        await loginPage.doLogin('demo', 'demo');
        await expect(page).toHaveURL(/.*dashboard\.html/);
    });

    test('2. Add items to cart', async () => {
        // Need to wait for food grid to load in JS
        await page.waitForSelector('.food-card', { state: 'visible' });

        await dashboardPage.addNthFoodToCart(0);
        await dashboardPage.addNthFoodToCart(1);
        
        await expect(dashboardPage.cartCount).toHaveText('2');
    });

    test('3. Navigate to Cart', async () => {
        await dashboardPage.goToCart();
        await expect(page).toHaveURL(/.*cart\.html/);
        
        // Verify items are in the cart
        const cartItems = page.locator('.cart-item');
        await expect(cartItems).toHaveCount(2);
    });

    test('4. Checkout', async () => {
        await cartPage.doCheckout();
        await expect(page).toHaveURL(/.*order-tracking\.html/);
    });

    test('5. Order Tracking', async () => {
        // Increase timeout for the tracking step since it encompasses the map animation
        test.setTimeout(30000);
        
        await expect(trackingPage.statusMsg).toBeVisible();
        await Reporter.info('Waiting for order simulation to complete...');
        // The simulation takes around 12 seconds to complete (3 steps * 4 seconds).
        // Using web-first assertion with extended timeout instead of page.waitForFunction
        await expect(trackingPage.statusMsg).toContainText('Delivered', { timeout: 20000 });
        
        await Reporter.attachScreenshot('delivery-success', page);
    });
});
