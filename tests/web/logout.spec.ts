/**
 * Test Case: Customer logout
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Register a new customer (precondition), log out and log in again
 * 2) Verify the login succeeded
 * 3) Click Logout and verify the logout confirmation page
 * 4) Click Continue and verify the home page is displayed
 * 5) Verify authenticated account options are no longer available
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Logout test @master @sanity @regression @web', async ({ homePage, registerPage, accountSuccessPage, loginPage, myAccountPage, logoutPage }) => {
    const userData = RandomDataUtil.generateUniqueCustomerRegistrationPayload();

    await test.step('1) Register a new customer and log out', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
        await registerPage.completeRegistration(userData);
        expect(await accountSuccessPage.isAccountCreatedPageExists()).toBeTruthy();

        await homePage.clickMyAccount();
        await homePage.clickLogout();
        await logoutPage.clickContinue();
    });

    await test.step('2) Log in with the registered credentials', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        await loginPage.login(userData.email, userData.password);
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
    });

    await test.step('3) Log out and verify the logout confirmation', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogout();
        expect(await logoutPage.isLogoutPageExists()).toBeTruthy();
    });

    await test.step('4) Continue and verify the home page', async () => {
        await logoutPage.clickContinue();
        expect(await homePage.isHomePageExists()).toBeTruthy();
    });

    await test.step('5) Verify authenticated account options are not available', async () => {
        await homePage.clickMyAccount();
        expect(await homePage.isLoginOptionAvailable()).toBeTruthy();
        expect(await homePage.isLogoutOptionAvailable()).toBeFalsy();
    });

    console.log('✅ Logout completed successfully!');
});
