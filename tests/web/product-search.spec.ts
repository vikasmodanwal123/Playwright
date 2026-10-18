/**
 * Test Case: Product search
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Search for a known product from the main search field
 * 2) Verify the search results page is displayed
 * 3) Verify the expected product is listed and its name matches the search criteria
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Product search test @master @sanity @regression @web', async ({ homePage, searchResultsPage }) => {
    const { productName } = Helper.getProductDetails();

    await test.step('1) Search for the product', async () => {
        await homePage.searchProduct(productName);
    });

    await test.step('2) Verify the search results page is displayed', async () => {
        expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    });

    await test.step('3) Verify the expected product is listed', async () => {
        expect(await searchResultsPage.isProductDisplayed(productName)).toBeTruthy();

        const productNames = await searchResultsPage.getProductNames();
        for (const name of productNames) {
            expect(name.toLowerCase()).toContain(productName.toLowerCase());
        }
    });

    //console.log('✅ Product search completed successfully!');
});
