import { Page, Locator } from '@playwright/test';

export class MyAccountPage {
    private readonly page: Page;

    // Locators
    private readonly hdgMyAccount: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.hdgMyAccount = page.locator('#content').getByRole('heading', { name: 'My Account', exact: true });
    }

    /**
     * Verifies the My Account page is displayed
     * @returns Promise<boolean> - true if the My Account heading is visible
     */
    async isMyAccountPageExists(): Promise<boolean> {
        try {
            await this.hdgMyAccount.waitFor({ state: 'visible', timeout: 15000 });
            return true;
        } catch (error) {
            if (error instanceof Error && error.name === 'TimeoutError') {
                return false;
            }

            throw error;
        }
    }
}
