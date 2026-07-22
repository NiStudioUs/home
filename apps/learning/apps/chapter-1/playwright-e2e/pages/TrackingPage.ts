import { Locator, Page } from '@playwright/test';
import { Reporter } from '../utils/reporter';

export class TrackingPage {
    readonly page: Page;
    readonly orderId: Locator;
    readonly statusMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orderId = page.locator('#orderId');
        this.statusMsg = page.locator('#statusMsg');
    }

}
