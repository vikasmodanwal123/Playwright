import { Page, Locator, expect } from '@playwright/test';
import { RegisterPage } from './RegisterPage';
import { LoginPage } from './LoginPage';
import { LogoutPage } from './LogoutPage';
import { SearchResultsPage } from './SearchResultsPage';
import { CartPage } from './CartPage';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly imgLogo: Locator;
    private readonly btnMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;
    private readonly lnkLogout: Locator;
    private readonly lnkShoppingCart: Locator;
    private readonly txtSearch: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators (header links are scoped to the top navigation bar)
        const topBar = page.locator('#top');
        this.imgLogo = page.locator('#logo img');
        // OpenCart 4 renders My Account as a button, OpenCart 3 as a link with a title
        this.btnMyAccount = topBar.getByRole('button', { name: 'My Account' }).or(topBar.getByTitle('My Account'));
        this.lnkRegister = topBar.getByRole('link', { name: 'Register' });
        this.lnkLogin = topBar.getByRole('link', { name: 'Login', exact: true });
        this.lnkLogout = topBar.getByRole('link', { name: 'Logout' });
        this.lnkShoppingCart = topBar.getByRole('link', { name: 'Shopping Cart' });
        this.txtSearch = page.getByRole('textbox', { name: 'Search' });
    }

    /**
     * Verifies the home page is displayed
     * @returns Promise<boolean> - true if the store logo and the URL of the home route are present
     */
    async isHomePageExists(): Promise<boolean> {
        try {
            await expect(this.imgLogo).toBeVisible();
            await expect(this.page).toHaveURL(/route=common\/home|\/opencart\/?$|\/ui\/?$/);
            return true;
        } catch (error) {
            console.log(`Error checking home page: ${error}`);
            return false;
        }
    }

    /**
     * Opens the My Account drop-down in the header
     */
    async clickMyAccount(): Promise<void> {
        await this.btnMyAccount.click();
    }

    /**
     * Clicks the Register option of the My Account drop-down
     * @returns Promise<RegisterPage> - Instance of the registration page
     */
    async clickRegister(): Promise<RegisterPage> {
        await this.lnkRegister.click();
        return new RegisterPage(this.page);
    }

    /**
     * Clicks the Login option of the My Account drop-down
     * @returns Promise<LoginPage> - Instance of the login page
     */
    async clickLogin(): Promise<LoginPage> {
        await this.lnkLogin.click();
        return new LoginPage(this.page);
    }

    /**
     * Clicks the Logout option of the My Account drop-down
     * @returns Promise<LogoutPage> - Instance of the logout confirmation page
     */
    async clickLogout(): Promise<LogoutPage> {
        await this.lnkLogout.click();
        return new LogoutPage(this.page);
    }

    /**
     * Checks whether the Logout option is available in the opened My Account drop-down
     * @returns Promise<boolean> - true for an authenticated customer
     */
    async isLogoutOptionAvailable(): Promise<boolean> {
        return await this.lnkLogout.isVisible();
    }

    /**
     * Checks whether the Login option is available in the opened My Account drop-down
     * @returns Promise<boolean> - true for a guest customer
     */
    async isLoginOptionAvailable(): Promise<boolean> {
        return await this.lnkLogin.isVisible();
    }

    /**
     * Searches for a product using the main search field
     * @param productName - Product name to search for
     * @returns Promise<SearchResultsPage> - Instance of the search results page
     */
    async searchProduct(productName: string): Promise<SearchResultsPage> {
        try {
            await this.txtSearch.fill(productName);
            await this.txtSearch.press('Enter');
            return new SearchResultsPage(this.page);
        } catch (error) {
            console.log(`Error searching for product: ${error}`);
            throw error;
        }
    }

    /**
     * Opens the shopping cart from the header
     * @returns Promise<CartPage> - Instance of the shopping cart page
     */
    async clickShoppingCart(): Promise<CartPage> {
        await this.lnkShoppingCart.click();
        return new CartPage(this.page);
    }
}
