/**
 * Test Case: Add product to cart
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Search for a known product
 * 2) Open the product details page
 * 3) Set the quantity and add the product to the cart
 * 4) Verify the success message
 * 5) Open the shopping cart
 * 6) Verify the product and quantity in the cart
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { Helper } from '../../utils/helper';

test('Add product to cart test @master @sanity @regression @web', async ({ homePage, searchResultsPage, productPage, cartPage }) => {
    const { productName, productQuantity } = Helper.getProductDetails();

    await test.step('1) Search for the product', async () => {
        await homePage.searchProduct(productName);
        expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    });

    await test.step('2) Open the product details page', async () => {
        await searchResultsPage.clickProduct(productName);
        expect(await productPage.isProductPageExists(productName)).toBeTruthy();
    });

    await test.step('3) Add the product to the cart', async () => {
        await productPage.setQuantity(productQuantity);
        await productPage.clickAddToCart();
    });

    await test.step('4) Verify the success message', async () => {
        const message = await productPage.getSuccessMessage();
        expect(message).toContain(`Success: You have added ${productName} to your shopping cart!`);
    });

    await test.step('5) Open the shopping cart', async () => {
        await homePage.clickShoppingCart();
        expect(await cartPage.isCartPageExists()).toBeTruthy();
    });

    await test.step('6) Verify the product and quantity in the cart', async () => {
        expect(await cartPage.isProductInCart(productName)).toBeTruthy();
        expect(await cartPage.getProductQuantity(productName)).toBe(productQuantity);
    });

    console.log('✅ Product added to the cart successfully!');
});
