/**
 * FakeStore API - Authentication tests
 *
 * Tags: @master @sanity @regression @api
 */

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

// USERNAME also exists as an operating system variable, so the value from .env must take precedence
dotenv.config({ override: true });

test.describe('Authentication API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USERNAME = process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD;

    // ---------------------------------------------------------
    // POST - Login
    // ---------------------------------------------------------

    test('POST - Successful login @master @sanity @api', async ({ request }) => {
        expect(USERNAME, 'USERNAME must be defined in .env').toBeTruthy();
        expect(PASSWORD, 'PASSWORD must be defined in .env').toBeTruthy();

        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: { username: USERNAME, password: PASSWORD }
        });

        expect(response.status(), 'Valid credentials should return status 201').toBe(201);

        const responseBody = await response.json();

        expect(responseBody, 'Login response should contain a token').toHaveProperty('token');
        expect(typeof responseBody.token, 'Token should be a string').toBe('string');
        expect(responseBody.token.trim().length, 'Token should not be empty').toBeGreaterThan(0);
    });

    test('POST - Invalid login @master @regression @api', async ({ request }) => {
        const response = await request.post(`${BASE_URL}${Routes.AUTH_LOGIN}`, {
            data: RandomDataUtil.generateInvalidLoginPayload()
        });

        expect(response.status(), 'Invalid credentials should return status 401').toBe(401);

        // The API returns the error as plain text, not as JSON
        const errorMessage = (await response.text()).trim();

        expect(errorMessage, 'Unexpected authentication error message').toBe('username or password is incorrect');
    });
});
