/**
 * FakeStore API - Carts tests
 *
 * Tags: @master @sanity @regression @api
 */

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

test.describe('Carts API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const CART_ID = Number(process.env.CART_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);
    const START_DATE = process.env.START_DATE ?? '2019-12-10';
    const END_DATE = process.env.END_DATE ?? '2020-10-10';

    // ---------------------------------------------------------
    // GET - Carts
    // ---------------------------------------------------------

    test('GET - All carts @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CARTS}`);

        expect(response.status(), 'Get all carts should return status 200').toBe(200);

        const carts = await response.json();

        expect(Array.isArray(carts), 'Response body should be an array').toBeTruthy();
        expect(carts.length, 'Cart list should not be empty').toBeGreaterThan(0);
    });

    test('GET - Cart by ID @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID))}`);

        expect(response.status(), 'Get cart by ID should return status 200').toBe(200);

        const cart = await response.json();

        expect(cart.id, 'Returned cart ID should match the requested ID').toBe(CART_ID);
    });

    test('GET - Carts by date range @master @regression @api', async ({ request }) => {
        const url = Routes.GET_CARTS_BY_DATE_RANGE.replace('{startdate}', START_DATE).replace('{enddate}', END_DATE);

        const response = await request.get(`${BASE_URL}${url}`);

        expect(response.status(), 'Get carts by date range should return status 200').toBe(200);

        const carts = await response.json();

        expect(Array.isArray(carts), 'Response body should be an array').toBeTruthy();
        expect(carts.length, 'Date range should return at least one cart').toBeGreaterThan(0);

        // Cart dates are returned as ISO timestamps, e.g. 2020-03-02T00:00:00.000Z
        const start = new Date(START_DATE).getTime();
        const end = new Date(END_DATE).getTime();

        carts.forEach((cart: { id: number; date: string }) => {
            const cartTime = new Date(cart.date).getTime();

            expect(cartTime, `Cart ${cart.id} date ${cart.date} should not be before ${START_DATE}`).toBeGreaterThanOrEqual(start);
            expect(cartTime, `Cart ${cart.id} date ${cart.date} should not be after ${END_DATE}`).toBeLessThanOrEqual(end);
        });
    });

    test('GET - User cart @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_USER_CART.replace('{userId}', String(USER_ID))}`);

        expect(response.status(), 'Get user cart should return status 200').toBe(200);

        const carts = await response.json();

        expect(Array.isArray(carts), 'Response body should be an array').toBeTruthy();
        expect(carts.length, `User ${USER_ID} should have at least one cart`).toBeGreaterThan(0);
        carts.forEach((cart: { id: number; userId: number }) => {
            expect(cart.userId, `Cart ${cart.id} should belong to user ${USER_ID}`).toBe(USER_ID);
        });
    });

    test('GET - Carts with limit @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_CARTS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        expect(response.status(), 'Get carts with limit should return status 200').toBe(200);

        const carts = await response.json();

        expect(Array.isArray(carts), 'Response body should be an array').toBeTruthy();
        expect(carts.length, `Cart count should match the requested limit (${LIMIT})`).toBe(LIMIT);
    });

    for (const order of ['asc', 'desc'] as const) {
        test(`GET - Carts sorted ${order === 'asc' ? 'ascending' : 'descending'} @master @regression @api`, async ({ request }) => {
            const response = await request.get(`${BASE_URL}${Routes.GET_CARTS_SORTED.replace('{order}', order)}`);

            expect(response.status(), 'Get sorted carts should return status 200').toBe(200);

            const ids: number[] = (await response.json()).map((cart: { id: number }) => cart.id);
            const expectedIds = [...ids].sort((a, b) => (order === 'asc' ? a - b : b - a));

            expect(ids.length, 'Cart list should contain more than one cart').toBeGreaterThan(1);
            expect(ids, `Cart IDs should be in ${order} order`).toEqual(expectedIds);
        });
    }

    // ---------------------------------------------------------
    // POST - Create cart
    // ---------------------------------------------------------

    test('POST - Create cart @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateCartPayload(USER_ID);

        const response = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: payload });

        expect(response.status(), 'Create cart should return status 201').toBe(201);

        const created = await response.json();

        expect(typeof created.id, 'Created cart should have a numeric ID').toBe('number');
        expect(created.userId, 'Created cart should contain the submitted user ID').toBe(USER_ID);
        expect(created.products, 'Created cart should contain the submitted products').toEqual(payload.products);
    });

    // ---------------------------------------------------------
    // PUT - Update cart
    // ---------------------------------------------------------

    test('PUT - Update cart @master @regression @api', async ({ request }) => {
        const cartUrl = `${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(CART_ID))}`;

        const existingCart = await (await request.get(`${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID))}`)).json();

        // Increase the quantity of the first product so that the change can be verified
        const updatedProducts = existingCart.products.map((product: { productId: number; quantity: number }, index: number) => ({
            productId: product.productId,
            quantity: index === 0 ? product.quantity + 1 : product.quantity
        }));
        const payload = { ...RandomDataUtil.generateUpdatedCartPayload(USER_ID), products: updatedProducts };

        const response = await request.put(cartUrl, { data: payload });

        expect(response.status(), 'Update cart should return status 200').toBe(200);

        const updated = await response.json();

        expect(updated.id, 'Returned cart ID should match the requested ID').toBe(CART_ID);
        expect(updated.products, 'Response should contain the updated products').toEqual(updatedProducts);
        expect(updated.products[0].quantity, 'First product quantity should be increased by 1')
            .toBe(existingCart.products[0].quantity + 1);
    });

    // ---------------------------------------------------------
    // DELETE - Delete cart
    // ---------------------------------------------------------

    test('DELETE - Delete cart @master @regression @api', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(CART_ID))}`);

        expect(response.status(), 'Delete cart should return status 200').toBe(200);

        // The API returns the deleted cart
        const deleted = await response.json();

        expect(deleted.id, 'Deleted cart ID should match the requested ID').toBe(CART_ID);
    });
});
