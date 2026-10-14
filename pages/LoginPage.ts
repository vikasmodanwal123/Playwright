import { Page, Locator, expect } from '@playwright/test';
import { MyAccountPage } from './MyAccountPage';

export class LoginPage {
    private readonly page: Page;

    // Locators
    private readonly hdgReturningCustomer: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly btnLogin: Locator;
    private readonly alertWarning: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators (the warning banner is an alert with no accessible role/name)
        this.hdgReturningCustomer = page.getByRole('heading', { name: 'Returning Customer' });
        this.txtEmail = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.txtPassword = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.alertWarning = page.locator('.alert-danger');
    }

    /**
     * Verifies the login page is displayed
     * @returns Promise<boolean> - true if the Returning Customer section is visible
     */
    async isLoginPageExists(): Promise<boolean> {
        try {
            await expect(this.hdgReturningCustomer).toBeVisible();
            return true;
        } catch (error) {
            console.log(`Error checking login page: ${error}`);
            return false;
        }
    }

    /**
     * Fills the email address
     * @param email - Email address to enter (empty string leaves the field empty)
     */
    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }

    /**
     * Fills the password
     * @param password - Password to enter (empty string leaves the field empty)
     */
    async setPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    /**
     * Clicks the Login button
     * @returns Promise<MyAccountPage> - Instance of the My Account page (only displayed when login succeeds)
     */
    async clickLogin(): Promise<MyAccountPage> {
        await this.btnLogin.click();
        return new MyAccountPage(this.page);
    }

    /**
     * Performs the login with the given credentials
     * @param email - Email address
     * @param password - Password
     * @returns Promise<MyAccountPage> - Instance of the My Account page (only displayed when login succeeds)
     */
    async login(email: string, password: string): Promise<MyAccountPage> {
        try {
            await this.setEmail(email);
            await this.setPassword(password);
            return await this.clickLogin();
        } catch (error) {
            console.log(`Error during login: ${error}`);
            throw error;
        }
    }

    /**
     * Gets the warning message displayed after a failed login
     * @returns Promise<string> - Warning text without surrounding whitespace
     */
    async getWarningMessage(): Promise<string> {
        await expect(this.alertWarning).toBeVisible();
        return (await this.alertWarning.innerText()).trim();
    }
}
