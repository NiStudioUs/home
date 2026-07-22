import { test, expect } from '@playwright/test';

test.describe('Speciality: Browser and Element Actions', () => {

    test.beforeEach(async ({ page }) => {
        // We test against our isolated Playground page
        await page.goto('pages/playground.html');
    });

    test('1. Typing: fill vs pressSequentially', async ({ page }) => {
        const input = page.locator('#text-input');
        
        // .fill() clears the input and inserts the exact string (fastest)
        await input.fill('Playwright');
        await expect(page.locator('#text-output')).toHaveText('Playwright');

        // .pressSequentially() types character by character (good for simulating real typing / triggering key events)
        await input.fill(''); // clear
        await input.pressSequentially('Automation', { delay: 50 });
        await expect(page.locator('#text-output')).toHaveText('Automation');
    });

    test('2. Mouse Actions: hover and double-click', async ({ page }) => {
        const mouseOutput = page.locator('#mouse-output');

        // Hover
        await page.locator('#hover-box').hover();
        await expect(mouseOutput).toHaveText('Hovered!');

        // Double Click
        await page.locator('#dblclick-box').dblclick();
        await expect(mouseOutput).toHaveText('Double Clicked!');
    });

    test('3. Checkboxes & Radios: check/uncheck', async ({ page }) => {
        const checkbox = page.locator('#terms-checkbox');
        
        // .check() ensures the element is checked (does nothing if already checked)
        await checkbox.check();
        expect(await checkbox.isChecked()).toBeTruthy();

        // .uncheck() ensures it is unchecked
        await checkbox.uncheck();
        expect(await checkbox.isChecked()).toBeFalsy();

        // Radio buttons work exactly the same
        const cashRadio = page.locator('#radio-cash');
        await cashRadio.check();
        expect(await cashRadio.isChecked()).toBeTruthy();
    });

    test('4. Select Dropdown: selectOption', async ({ page }) => {
        const selectBox = page.locator('#country-select');
        
        // Select by value
        await selectBox.selectOption('fr');
        await expect(page.locator('#select-output')).toHaveText('France');

        // Select by label
        await selectBox.selectOption({ label: 'United Kingdom' });
        await expect(page.locator('#select-output')).toHaveText('United Kingdom');
    });

    test('5. Scrolling via Element and full page screenshots', async ({ page }) => {
        const scrollBtn = page.locator('#scroll-btn');
        
        // Usually, Playwright auto-scrolls to elements before clicking them.
        // We can explicitly scroll it into view:
        await scrollBtn.scrollIntoViewIfNeeded();
        
        // Click to trigger output
        await scrollBtn.click();
        await expect(page.locator('#scroll-output')).toHaveText('Button at bottom clicked!');

        // We can also take a full-page screenshot 
        await page.screenshot({ path: 'reports/playground-full.png', fullPage: true });

        // Or just screenshot a specific element!
        await page.locator('#section-checks').screenshot({ path: 'reports/checkbox-section.png' });
    });

});
