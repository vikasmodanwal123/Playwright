/**
 * Test Case: Valid customer login
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Register a new customer (precondition) and log out
 * 2) Navigate to My Account -> Login
 * 3) Verify the login page is displayed
 * 4) Log in with the registered credentials
 * 5) Verify the customer reaches the My Account area
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Valid login test @master @sanity @regression @web', async ({ homePage, registerPage, accountSuccessPage, loginPage, myAccountPage, logoutPage }) => {
    const userData = RandomDataUtil.generateUniqueCustomerRegistrationPayload();

    await test.step('1) Register a new customer and log out', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        await registerPage.completeRegistration(userData);
        expect(await accountSuccessPage.isAccountCreatedPageExists()).toBeTruthy();

        await homePage.clickMyAccount();
        await homePage.clickLogout();
        expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
        await logoutPage.clickContinue();
    });

    await test.step('2) Navigate to the login page', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        expect(await loginPage.isLoginPageExists()).toBeTruthy();
    });

    await test.step('3) Log in with the registered credentials', async () => {
        await loginPage.login(userData.email, userData.password);
    });

    await test.step('4) Verify the My Account page is displayed', async () => {
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

        await homePage.clickMyAccount();
        expect(await homePage.isLogoutOptionAvailable()).toBeTruthy();
    });

    console.log('✅ Valid login completed successfully!');
});
