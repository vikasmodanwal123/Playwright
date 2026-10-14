/**
 * Test Case: Customer registration
 *
 * Tags: @master @sanity @regression @web
 *
 * Steps:
 * 1) Open the application and navigate to My Account -> Register
 * 2) Verify the registration page is displayed
 * 3) Register a new customer with unique data
 * 4) Verify the account created confirmation
 * 5) Verify the account navigation of the new customer
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('User registration test @master @sanity @regression @web', async ({ homePage, registerPage, accountSuccessPage, myAccountPage }) => {
    const userData = RandomDataUtil.generateUniqueCustomerRegistrationPayload();

    await test.step('1) Navigate to the registration page', async () => {
        await homePage.clickMyAccount();
        await homePage.clickRegister();
    });

    await test.step('2) Verify the registration page is displayed', async () => {
        expect(await registerPage.isRegisterPageExists()).toBeTruthy();
    });

    await test.step('3) Register a new customer', async () => {
        await registerPage.completeRegistration(userData);
    });

    await test.step('4) Verify the account created confirmation', async () => {
        expect(await accountSuccessPage.isAccountCreatedPageExists()).toBeTruthy();
    });

    await test.step('5) Verify the account navigation of the new customer', async () => {
        await accountSuccessPage.clickContinue();
        expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();

        await homePage.clickMyAccount();
        expect(await homePage.isLogoutOptionAvailable()).toBeTruthy();
    });

    console.log('✅ User registration completed successfully!');
});
