import { test, Page } from '@playwright/test';

/**
 * Utility class to encapsulate reporting mechanisms.
 * Allows decoupling from specific reporters (like Allure) and provides
 * a unified interface for logging, steps, and attachments.
 */
export class Reporter {
    /**
     * Wraps actions in a formal test step.
     */
    static async step<T>(name: string, callback: () => Promise<T>): Promise<T> {
        return await test.step(name, callback);
    }

    /**
     * Simple info logger.
     */
    static info(message: string) {
        console.log(`[INFO]: ${message}`);
        // Optionally wrap simple strings into an attachment if you want them explicitly in Allure
    }

    /**
     * Attaches JSON data to the report (useful for API responses or mock data dumps).
     */
    static async attachJSON(name: string, data: any) {
        await test.info().attach(name, {
            body: JSON.stringify(data, null, 2),
            contentType: 'application/json',
        });
    }

    /**
     * Attaches text blocks to the report.
     */
    static async attachText(name: string, text: string) {
        await test.info().attach(name, {
            body: text,
            contentType: 'text/plain',
        });
    }

    /**
     * Captures and attaches a screenshot at the current state.
     */
    static async attachScreenshot(name: string, page: Page) {
        const screenshot = await page.screenshot();
        await test.info().attach(name, {
            body: screenshot,
            contentType: 'image/png',
        });
    }
}
