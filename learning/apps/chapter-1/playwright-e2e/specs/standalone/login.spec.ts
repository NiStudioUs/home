import { test, expect } from '../../fixtures/test-base';
import { Reporter } from '../../utils/reporter';

test.describe('Standalone: Login Functionality', () => {

    test('Should login successfully with demo credentials', async ({ loginPage, page }) => {
        await Reporter.step('Execute Login', async () => {
            await loginPage.doLogin('demo', 'demo');
        });

        await Reporter.step('Verify Dashboard Redirection', async () => {
            // Handle the JS alert
            page.on('dialog', dialog => dialog.accept());
            
            await expect(page).toHaveURL(/.*dashboard\.html/);
            const welcomeMsg = page.locator('#welcomeMsg');
            await expect(welcomeMsg).toBeVisible();
            await expect(welcomeMsg).toContainText('Hello, demo');
            
            await Reporter.attachScreenshot('dashboard-success', page);
        });
    });

    test('Should fail login with invalid credentials', async ({ loginPage, page }) => {
        let alertMessage = '';
        page.on('dialog', dialog => {
            alertMessage = dialog.message();
            dialog.accept();
        });

        await Reporter.step('Execute Invalid Login', async () => {
            await loginPage.doLogin('wrong', 'pass');
        });

        await Reporter.step('Verify Error Alert', async () => {
            expect(alertMessage).toContain('Invalid Credentials');
        });
    });
});
