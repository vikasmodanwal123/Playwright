/**
 * Test Case: Login (data driven using an external file)
 *
 * Tags: @master @regression @datadriven @web
 *
 * Data: testdata/opencart_logindata.json (testName, email, password, expected)
 *
 * Steps (for every data row):
 * 1) For "success" rows, make sure the customer exists (register it when missing) and log out
 * 2) Navigate to My Account -> Login
 * 3) Enter the email and password from the data row (blank values stay empty)
 * 4) Verify the result matches the expected outcome
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { DataProvider } from '../../utils/DataReader';
import { RandomDataUtil } from '../../utils/dataGenerator';

type LoginData = {
    testName: string;
    email: string;
    password: string;
    expected: 'success' | 'failure';
};

const loginData: LoginData[] = DataProvider.readJson('./testdata/opencart_logindata.json');

// OpenCart locks an email out for 1 hour after repeated failed logins, so repeated runs of the same
// failure rows can legitimately return the lockout warning instead of the "No match" warning.
const LOGIN_REJECTED_WARNING = /Warning: (No match for E-Mail Address and\/or Password\.|Your account has exceeded allowed number of login attempts\.)/;

loginData.forEach((data, index) => {
    // Whitespace-only values are treated as blank, so the field is left empty
    const email = data.email.trim();
    const password = data.password.trim();

    test(`Login data driven #${index + 1}: ${data.testName} (${data.expected}) @master @regression @datadriven @web`,
        async ({ homePage, registerPage, accountSuccessPage, logoutPage, loginPage, myAccountPage }) => {

        if (data.expected === 'success') {
            await test.step('1) Ensure the customer exists and is logged out', async () => {
                await homePage.clickMyAccount();
                await homePage.clickRegister();
                await registerPage.completeRegistration({
                    firstName: RandomDataUtil.getFirstName(),
                    lastName: RandomDataUtil.getLastName(),
                    email,
                    telephone: RandomDataUtil.getPhoneNumber(),
                    password
                });

                // A customer that is already registered stays on the registration page
                if (await accountSuccessPage.isAccountCreatedPageExists()) {
                    await homePage.clickMyAccount();
                    await homePage.clickLogout();
                    await logoutPage.clickContinue();
                }
            });
        }

        await test.step('2) Navigate to the login page', async () => {
            await homePage.clickMyAccount();
            await homePage.clickLogin();
            expect(await loginPage.isLoginPageExists()).toBeTruthy();
        });

        await test.step('3) Enter the credentials from the data row', async () => {
            await loginPage.login(email, password);
        });

        await test.step('4) Verify the expected result', async () => {
            if (data.expected === 'success') {
                expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
            } else {
                expect(await loginPage.getWarningMessage()).toMatch(LOGIN_REJECTED_WARNING);
                expect(await myAccountPage.isMyAccountPageExists()).toBeFalsy();
            }
        });

        console.log(`✅ ${data.testName} (${data.expected}) verified!`);
    });
});
