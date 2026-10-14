import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly hdgProductName: Locator;
    private readonly hdgProductPrice: Locator;
    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly alertSuccess: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators (the quantity input and success banner have no accessible name/role, so CSS is used)
        this.hdgProductName = page.getByRole('heading', { level: 1 });
        this.hdgProductPrice = page.getByRole('heading', { name: /^\$[\d,]+\.\d{2}$/ });
        this.txtQuantity = page.locator('#input-quantity');
        this.btnAddToCart = page.getByRole('button', { name: 'Add to Cart' });
        this.alertSuccess = page.locator('.alert-success');
    }

    /**
     * Verifies the product details page is displayed for the given product
     * @param productName - Expected product name
     * @returns Promise<boolean> - true if the product heading and the Add to Cart button are visible
     */
    async isProductPageExists(productName: string): Promise<boolean> {
        try {
            await expect(this.hdgProductName).toHaveText(productName);
            await expect(this.btnAddToCart).toBeVisible();
            return true;
        } catch (error) {
            console.log(`Error checking product page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the displayed product price
     * @returns Promise<string> - Price text, e.g. "$602.00"
     */
    async getProductPrice(): Promise<string> {
        return (await this.hdgProductPrice.innerText()).trim();
    }

    /**
     * Sets the quantity to add to the cart
     * @param quantity - Quantity to enter
     */
    async setQuantity(quantity: string): Promise<void> {
        await this.txtQuantity.fill(quantity);
    }

    /**
     * Clicks the Add to Cart button
     */
    async clickAddToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    /**
     * Gets the success message displayed after adding the product to the cart
     * @returns Promise<string> - Confirmation text without surrounding whitespace
     */
    async getSuccessMessage(): Promise<string> {
        await expect(this.alertSuccess).toBeVisible();
        return (await this.alertSuccess.innerText()).trim();
    }
}
