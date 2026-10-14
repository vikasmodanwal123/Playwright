/**
 * Test Case: Invalid customer login
 *
 * Tags: @master @regression @web
 *
 * Steps:
 * 1) Navigate to My Account -> Login
 * 2) Verify the login page is displayed
 * 3) Log in with invalid credentials
 * 4) Verify the warning message
 * 5) Verify the customer is not authenticated
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';

test('Invalid login test @master @regression @web', async ({ homePage, loginPage, myAccountPage }) => {
    const email = RandomDataUtil.getUniqueEmail();
    const password = RandomDataUtil.getPassword();

    await test.step('1) Navigate to the login page', async () => {
        await homePage.clickMyAccount();
        await homePage.clickLogin();
        expect(await loginPage.isLoginPageExists()).toBeTruthy();
    });

    await test.step('2) Log in with invalid credentials', async () => {
        await loginPage.login(email, password);
    });

    await test.step('3) Verify the warning message', async () => {
        expect(await loginPage.getWarningMessage()).toContain('Warning: No match for E-Mail Address and/or Password.');
    });

    await test.step('4) Verify the customer is not authenticated', async () => {
        expect(await loginPage.isLoginPageExists()).toBeTruthy();
        expect(await myAccountPage.isMyAccountPageExists()).toBeFalsy();
    });

    console.log('✅ Invalid login rejected as expected!');
});
