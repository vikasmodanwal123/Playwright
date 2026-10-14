import { Page, Locator, expect } from '@playwright/test';
import { ProductPage } from './ProductPage';

export class SearchResultsPage {
    private readonly page: Page;

    // Locators
    private readonly hdgSearchResults: Locator;
    private readonly lnkProductNames: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators (product names are the links inside the level 4 headings of the result cards)
        this.hdgSearchResults = page.getByRole('heading', { name: /^Search - / });
        this.lnkProductNames = page.getByRole('heading', { level: 4 }).getByRole('link');
    }

    /**
     * Verifies the search results page is displayed
     * @returns Promise<boolean> - true if the "Search - <criteria>" heading is visible
     */
    async isSearchResultsPageExists(): Promise<boolean> {
        try {
            await expect(this.hdgSearchResults).toBeVisible();
            return true;
        } catch (error) {
            console.log(`Error checking search results page: ${error}`);
            return false;
        }
    }

    /**
     * Gets the names of all products listed in the results
     * @returns Promise<string[]> - Displayed product names
     */
    async getProductNames(): Promise<string[]> {
        await expect(this.lnkProductNames.first()).toBeVisible();
        return await this.lnkProductNames.allInnerTexts();
    }

    /**
     * Checks whether a product with the exact name is listed in the results
     * @param productName - Exact product name
     * @returns Promise<boolean> - true if the product is displayed
     */
    async isProductDisplayed(productName: string): Promise<boolean> {
        try {
            await expect(this.lnkProductNames.getByText(productName, { exact: true })).toBeVisible();
            return true;
        } catch (error) {
            console.log(`Error checking product in search results: ${error}`);
            return false;
        }
    }

    /**
     * Opens the details page of a product
     * @param productName - Exact product name
     * @returns Promise<ProductPage> - Instance of the product details page
     */
    async clickProduct(productName: string): Promise<ProductPage> {
        await this.page.getByRole('heading', { level: 4 }).getByRole('link', { name: productName, exact: true }).click();
        return new ProductPage(this.page);
    }
}
