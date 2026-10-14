import { Page, Locator, expect } from '@playwright/test';
import { HomePage } from './HomePage';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly hdgAccountLogout: Locator;
    private readonly lnkContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.hdgAccountLogout = page.getByRole('heading', { name: 'Account Logout' });
        this.lnkContinue = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Verifies the logout confirmation page is displayed
     * @returns Promise<boolean> - true if the Account Logout heading is visible
     */
    async isLogoutPageExists(): Promise<boolean> {
        try {
            await expect(this.hdgAccountLogout).toBeVisible();
            return true;
        } catch (error) {
            console.log(`Error checking logout page: ${error}`);
            return false;
        }
    }

    /**
     * Clicks Continue on the logout confirmation page
     * @returns Promise<HomePage> - Instance of the home page
     */
    async clickContinue(): Promise<HomePage> {
        await this.lnkContinue.click();
        return new HomePage(this.page);
    }
}
