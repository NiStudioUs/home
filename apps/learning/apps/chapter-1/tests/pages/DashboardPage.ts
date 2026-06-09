import { Locator, Page } from '@playwright/test';
import { Reporter } from '../utils/reporter';

export class DashboardPage {
    readonly page: Page;
    readonly cartNavBtn: Locator;
    readonly cartCount: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartNavBtn = page.locator('#navCartBtn');
        this.cartCount = page.locator('#navCartCount');
        this.searchInput = page.locator('#searchInput');
    }

    /**
     * Add the Nth food item on the feed to the cart.
     * @param index 0-based index of the card
     */
    async addNthFoodToCart(index: number) {
        const foodCard = this.page.locator('.food-card').nth(index);
        const addBtn = foodCard.locator('button', { hasText: 'Add' });
        await addBtn.click();
    }

    /**
     * Get the title locator of the Nth food item
     */
    getNthFoodNameLocator(index: number): Locator {
        const foodCard = this.page.locator('.food-card').nth(index);
        return foodCard.locator('h3');
    }

    /**
     * Search for an item
     */
    async search(term: string) {
        await this.searchInput.fill(term);
    }

    /**
     * Navigate to cart
     */
    async goToCart() {
        await this.cartNavBtn.click();
    }
}
