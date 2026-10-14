import { Page, Locator, expect } from '@playwright/test';
import { AccountSuccessPage } from './AccountSuccessPage';

export type CustomerRegistrationData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    telephone?: string;
};

export class RegisterPage {
    private readonly page: Page;

    // Locators
    private readonly hdgRegisterAccount: Locator;
    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtTelephone: Locator;
    private readonly txtPassword: Locator;
    private readonly txtConfirmPassword: Locator;
    private readonly chkPrivacyPolicy: Locator;
    private readonly btnContinue: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators (the privacy policy checkbox has no accessible name, so its name attribute is used)
        this.hdgRegisterAccount = page.getByRole('heading', { name: 'Register Account' });
        this.txtFirstName = page.getByRole('textbox', { name: 'First Name' });
        this.txtLastName = page.getByRole('textbox', { name: 'Last Name' });
        this.txtEmail = page.getByRole('textbox', { name: 'E-Mail' });
        this.txtTelephone = page.getByRole('textbox', { name: 'Telephone' });
        this.txtPassword = page.getByRole('textbox', { name: /^(\* )?Password$/ });
        this.txtConfirmPassword = page.getByRole('textbox', { name: 'Password Confirm' });
        this.chkPrivacyPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.getByRole('button', { name: 'Continue' });
    }


    /**
     * Verifies the registration page is displayed
     * @returns Promise<boolean> - true if the Register Account heading is visible
     */
    async isRegisterPageExists(): Promise<boolean> {
        try {
            await expect(this.hdgRegisterAccount).toBeVisible();
            return true;
        } catch (error) {
            console.log(`Error checking register page: ${error}`);
            return false;
        }
    }

    /**
     * Fills the first name
     * @param firstName - First name to enter
     */
    async setFirstName(firstName: string): Promise<void> {
        await this.txtFirstName.fill(firstName);
    }

    /**
     * Fills the last name
     * @param lastName - Last name to enter
     */
    async setLastName(lastName: string): Promise<void> {
        await this.txtLastName.fill(lastName);
    }

    /**
     * Fills the email address
     * @param email - Email address to enter
     */
    async setEmail(email: string): Promise<void> {
        await this.txtEmail.fill(email);
    }

    /**
     * Fills the telephone number (only present on OpenCart versions that require it)
     * @param telephone - Telephone number to enter
     */
    async setTelephone(telephone: string): Promise<void> {
        if (await this.txtTelephone.count() > 0) {
            await this.txtTelephone.fill(telephone);
        }
    }

    /**
     * Fills the password
     * @param password - Password to enter
     */
    async setPassword(password: string): Promise<void> {
        await this.txtPassword.fill(password);
    }

    /**
     * Fills the password confirmation (only present on OpenCart versions that ask for it)
     * @param password - Password to enter
     */
    async setConfirmPassword(password: string): Promise<void> {
        if (await this.txtConfirmPassword.count() > 0) {
            await this.txtConfirmPassword.fill(password);
        }
    }

    /**
     * Accepts the Privacy Policy
     */
    async acceptPrivacyPolicy(): Promise<void> {
        await this.chkPrivacyPolicy.check();
    }

    /**
     * Submits the registration form
     * @returns Promise<AccountSuccessPage> - Instance of the account created page
     */
    async clickContinue(): Promise<AccountSuccessPage> {
        await this.btnContinue.click();
        return new AccountSuccessPage(this.page);
    }

    /**
     * Fills the registration form, accepts the privacy policy and submits it
     * @param userData - Customer details used for the registration
     * @returns Promise<AccountSuccessPage> - Instance of the account created page
     */
    async completeRegistration(userData: CustomerRegistrationData): Promise<AccountSuccessPage> {
        try {
            await this.setFirstName(userData.firstName);
            await this.setLastName(userData.lastName);
            await this.setEmail(userData.email);
            if (userData.telephone) {
                await this.setTelephone(userData.telephone);
            }
            await this.setPassword(userData.password);
            await this.setConfirmPassword(userData.password);
            await this.acceptPrivacyPolicy();
            return await this.clickContinue();
        } catch (error) {
            console.log(`Error completing registration: ${error}`);
            throw error;
        }
    }
}
