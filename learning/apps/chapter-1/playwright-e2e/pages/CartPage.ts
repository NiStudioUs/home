import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly checkoutBtn: Locator;
    readonly grandTotal: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutBtn = page.locator('#checkoutBtn');
        this.grandTotal = page.locator('#grandTotal');
    }

    /**
     * Completes checkout
     */
    async doCheckout() {
        await this.checkoutBtn.click();
    }

    /**
     * Get item in cart
     */
    getItem(itemName: string) {
        return this.page.locator('.cart-item-info h4', { hasText: itemName });
    }
}
