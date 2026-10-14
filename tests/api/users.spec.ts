/**
 * FakeStore API - Users tests
 *
 * Tags: @master @sanity @regression @api
 */

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

test.describe('Users API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);

    // ---------------------------------------------------------
    // GET - Users
    // ---------------------------------------------------------

    test('GET - All users @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_USERS}`);

        expect(response.status(), 'Get all users should return status 200').toBe(200);

        const users = await response.json();

        expect(Array.isArray(users), 'Response body should be an array').toBeTruthy();
        expect(users.length, 'User list should not be empty').toBeGreaterThan(0);
    });

    test('GET - User by ID @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`);

        expect(response.status(), 'Get user by ID should return status 200').toBe(200);

        const user = await response.json();

        expect(user.id, 'Returned user ID should match the requested ID').toBe(USER_ID);
    });

    test('GET - Users with limit @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_USERS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        expect(response.status(), 'Get users with limit should return status 200').toBe(200);

        const users = await response.json();

        expect(Array.isArray(users), 'Response body should be an array').toBeTruthy();
        expect(users.length, `User count should match the requested limit (${LIMIT})`).toBe(LIMIT);
    });

    for (const order of ['asc', 'desc'] as const) {
        test(`GET - Users sorted ${order === 'asc' ? 'ascending' : 'descending'} @master @regression @api`, async ({ request }) => {
            const response = await request.get(`${BASE_URL}${Routes.GET_USERS_SORTED.replace('{order}', order)}`);

            expect(response.status(), 'Get sorted users should return status 200').toBe(200);

            const ids: number[] = (await response.json()).map((user: { id: number }) => user.id);
            const expectedIds = [...ids].sort((a, b) => (order === 'asc' ? a - b : b - a));

            expect(ids.length, 'User list should contain more than one user').toBeGreaterThan(1);
            expect(ids, `User IDs should be in ${order} order`).toEqual(expectedIds);
        });
    }

    // ---------------------------------------------------------
    // POST - Create user
    // ---------------------------------------------------------

    test('POST - Create user @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateUserPayload();

        const response = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: payload });

        expect(response.status(), 'Create user should return status 201').toBe(201);

        // The API only returns the generated ID for a new user, so that is the contract validated here
        const created = await response.json();

        expect(typeof created.id, 'Created user should have a numeric ID').toBe('number');
        expect(created.id, 'Created user ID should be greater than 0').toBeGreaterThan(0);
    });

    // ---------------------------------------------------------
    // PUT - Update user
    // ---------------------------------------------------------

    test('PUT - Update user @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateUserUpdatePayload();

        const response = await request.put(`${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(USER_ID))}`, { data: payload });

        expect(response.status(), 'Update user should return status 200').toBe(200);

        const updated = await response.json();

        expect(updated, 'Response should contain the updated values').toMatchObject(payload);
    });

    // ---------------------------------------------------------
    // DELETE - Delete user
    // ---------------------------------------------------------

    test('DELETE - Delete user @master @regression @api', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(USER_ID))}`);

        expect(response.status(), 'Delete user should return status 200').toBe(200);

        // The API returns the deleted user
        const deleted = await response.json();

        expect(deleted.id, 'Deleted user ID should match the requested ID').toBe(USER_ID);
    });
});
