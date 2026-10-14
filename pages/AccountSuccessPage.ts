import { Page, Locator } from '@playwright/test';
import { MyAccountPage } from './MyAccountPage';

export class AccountSuccessPage {
    private readonly page: Page;

    // Locators
    private readonly hdgAccountCreated: Locator;
    private readonly lnkContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.hdgAccountCreated = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
        this.lnkContinue = page.getByRole('link', { name: 'Continue' });
    }

    /**
     * Verifies the account created confirmation is displayed
     * @returns Promise<boolean> - true if the "Your Account Has Been Created!" heading is visible
     */
    async isAccountCreatedPageExists(): Promise<boolean> {
        try {
            await this.hdgAccountCreated.waitFor({ state: 'visible', timeout: 15000 });
            return true;
        } catch (error) {
            if (error instanceof Error && error.name === 'TimeoutError') {
                return false;
            }

            throw error;
        }
    }

    /**
     * Clicks Continue on the confirmation page
     * @returns Promise<MyAccountPage> - Instance of the My Account page
     */
    async clickContinue(): Promise<MyAccountPage> {
        await this.lnkContinue.click();
        return new MyAccountPage(this.page);
    }
}
