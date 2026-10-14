import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly hdgShoppingCart: Locator;
    private readonly rowCartTotal: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators
        this.hdgShoppingCart = page.getByRole('heading', { name: /^Shopping Cart/ });
        this.rowCartTotal = page.getByRole('row', { name: /^Total/ });
    }

    /**
     * Gets the cart row of a product
     * @param productName - Exact product name
     * @returns Locator - Row containing the product link
     */
    private getProductRow(productName: string): Locator {
        return this.page.getByRole('row').filter({
            has: this.page.getByRole('link', { name: productName, exact: true })
        });
    }

    /**
     * Verifies the shopping cart page is displayed
     * @returns Promise<boolean> - true if the Shopping Cart heading is visible
     */
    async isCartPageExists(): Promise<boolean> {
        try {
            await expect(this.hdgShoppingCart).toBeVisible();
            return true;
        } catch (error) {
            console.log(`Error checking cart page: ${error}`);
            return false;
        }
    }

    /**
     * Checks whether a product is present in the cart
     * @param productName - Exact product name
     * @returns Promise<boolean> - true if the product row is displayed
     */
    async isProductInCart(productName: string): Promise<boolean> {
        try {
            await expect(this.getProductRow(productName)).toBeVisible();
            return true;
        } catch (error) {
            console.log(`Error checking product in cart: ${error}`);
            return false;
        }
    }

    /**
     * Gets the quantity of a product in the cart
     * @param productName - Exact product name
     * @returns Promise<string> - Quantity shown in the quantity field
     */
    async getProductQuantity(productName: string): Promise<string> {
        return await this.getProductRow(productName).getByRole('textbox').inputValue();
    }

    /**
     * Gets the unit price of a product in the cart
     * @param productName - Exact product name
     * @returns Promise<string> - Unit price text, e.g. "$602.00"
     */
    async getProductUnitPrice(productName: string): Promise<string> {
        // The unit price is always the second-to-last cell (the last one is the line total)
        const cells = this.getProductRow(productName).getByRole('cell');
        return (await cells.nth(await cells.count() - 2).innerText()).trim();
    }

    /**
     * Gets the cart total
     * @returns Promise<string> - Total amount text, e.g. "$602.00"
     */
    async getCartTotal(): Promise<string> {
        return (await this.rowCartTotal.getByRole('cell').last().innerText()).trim();
    }
}
