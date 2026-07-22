import { test, expect, devices } from '@playwright/test';

// We can use test.use() to override browser context options for all tests in this file
test.use({
    // Emulate a Pixel 5 (uses Chromium)
    ...devices['Pixel 5'],
    // Set locale and timezone
    locale: 'fr-FR',
    timezoneId: 'Europe/Paris',
    // Mock geolocation
    geolocation: { longitude: 2.3522, latitude: 48.8566 },
    // Grant permissions automatically
    permissions: ['geolocation'],
});

test.describe('Speciality: Device Emulation, Geolocation, and Locale', () => {
    
    test('Emulate Mobile Viewport and Paris Location', async ({ page }) => {
        // Authenticate first so we can access the dashboard
        await page.goto('/index.html');
        await page.fill('#username', 'demo');
        await page.fill('#password', 'demo');
        await page.getByRole('button', { name: 'Log In' }).click();

        // Wait for dashboard to load
        await expect(page).toHaveURL(/.*dashboard\.html/);
        const viewport = page.viewportSize();
        expect(viewport?.width).toBe(393);

        // In a real application, you might check if the mobile hamburger menu is visible
        // await expect(page.locator('.hamburger-menu')).toBeVisible();

        // The application will automatically receive the mocked Paris coordinates
        // because we granted the 'geolocation' permission and provided the coordinates above.
        const locationBanner = page.locator('#userLocation');
        await expect(locationBanner).toContainText('48.8566');
        await expect(locationBanner).toContainText('2.3522');
        
        // Asserting elements load correctly on mobile
        await expect(page.locator('#welcomeMsg')).toBeVisible();
    });
});
