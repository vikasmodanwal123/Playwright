/**
 * Test Case: End-to-end shopping flow
 *
 * Tags: @master @regression @e2e @web
 *
 * Steps:
 * 1) Register a new customer with unique data
 * 2) Log out
 * 3) Log in with the new credentials
 * 4) Search for a known product and open its details page
 * 5) Add the product to the cart
 * 6) Verify the product, quantity, price and total in the cart
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

test('End-to-end shopping flow test @master @regression @e2e @web', async ({ homePage, registerPage, accountSuccessPage, loginPage, myAccountPage, logoutPage, searchResultsPage, productPage, cartPage }) => {
    const userData = RandomDataUtil.generateUniqueCustomerRegistrationPayload();
    const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

    await test.step('1) Register a new customer', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        await registerPage.completeRegistration(userData);
        expect(await accountSuccessPage.isAccountCreatedPageExists()).toBeTruthy();
    });

    await test.step('2) Log out', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogout();
        expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
        await logoutPage.clickContinue();
    });

    await test.step('3) Log in with the new credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.login(userData.email, userData.password);
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('4) Search for the product and open its details page', async () => {
        await homePage.searchProduct(productName);
        expect(await searchResultsPage.isProductDisplayed(productName)).toBeTruthy();
        await searchResultsPage.clickProduct(productName);
        expect(await productPage.isProductPageExists(productName)).toBeTruthy();
    });

    await test.step('5) Add the product to the cart', async () => {
        await productPage.setQuantity(productQuantity);
        await productPage.clickAddToCart();
        const message = await productPage.getSuccessMessage();
        expect(message).toContain(`Success: You have added ${productName} to your shopping cart!`);
    });

    await test.step('6) Verify the cart contents', async () => {
        await homePage.clickShoppingCart();
        expect(await cartPage.isCartPageExists()).toBeTruthy();
        expect(await cartPage.isProductInCart(productName)).toBeTruthy();
        expect(await cartPage.getProductQuantity(productName)).toBe(productQuantity);
        expect(await cartPage.getProductUnitPrice(productName)).toBe(totalPrice);
        expect(await cartPage.getCartTotal()).toBe(totalPrice);
    });

    console.log('✅ End-to-end shopping flow completed successfully!');
});
