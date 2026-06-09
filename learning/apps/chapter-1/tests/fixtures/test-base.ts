import { test as baseTest } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { CartPage } from '../pages/CartPage';
import { TrackingPage } from '../pages/TrackingPage';

type MyFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    trackingPage: TrackingPage;
};

// Extend basic test by providing our custom Page Objects
export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    trackingPage: async ({ page }, use) => {
        await use(new TrackingPage(page));
    }
});

export { expect } from '@playwright/test';
