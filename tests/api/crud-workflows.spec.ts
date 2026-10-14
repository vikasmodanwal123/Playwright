/**
 * FakeStore API - End-to-end CRUD workflows
 *
 * Tags: @master @regression @api @workflow
 *
 * Every workflow runs create -> update -> delete in a single test and uses the ID
 * returned by the create request for the update and delete requests.
 */

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

test.describe('CRUD Workflow API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const USER_ID = Number(process.env.USER_ID ?? 1);

    // ---------------------------------------------------------
    // Product workflow
    // ---------------------------------------------------------

    test('Workflow - Product create, update and delete @master @regression @api @workflow', async ({ request }) => {
        let productId = 0;

        await test.step('1) Create the product', async () => {
            const payload = RandomDataUtil.generateProductPayload();

            const response = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: payload });

            expect(response.status(), 'Create product should return status 201').toBe(201);

            const created = await response.json();

            expect(typeof created.id, 'Created product should have a numeric ID').toBe('number');
            expect(created, 'Response should contain the submitted product information').toMatchObject(payload);
            productId = created.id;
        });

        await test.step('2) Update the created product', async () => {
            const payload = RandomDataUtil.generateUpdatedProductPayload();

            const response = await request.put(`${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(productId))}`, { data: payload });

            expect(response.status(), 'Update product should return status 200').toBe(200);

            const updated = await response.json();

            expect(updated.id, 'Updated product should keep the created product ID').toBe(productId);
            expect(updated, 'Response should contain the updated product values').toMatchObject(payload);
        });

        await test.step('3) Delete the created product', async () => {
            const response = await request.delete(`${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(productId))}`);

            expect(response.status(), 'Delete product should return status 200').toBe(200);
        });
    });

    // ---------------------------------------------------------
    // User workflow
    // ---------------------------------------------------------

    test('Workflow - User create, update and delete @master @regression @api @workflow', async ({ request }) => {
        let userId = 0;

        await test.step('1) Create the user', async () => {
            const response = await request.post(`${BASE_URL}${Routes.CREATE_USER}`, { data: RandomDataUtil.generateUserPayload() });

            expect(response.status(), 'Create user should return status 201').toBe(201);

            // The API only returns the generated ID for a new user
            const created = await response.json();

            expect(typeof created.id, 'Created user should have a numeric ID').toBe('number');
            userId = created.id;
        });

        await test.step('2) Update the created user', async () => {
            const payload = RandomDataUtil.generateUserUpdatePayload();

            const response = await request.put(`${BASE_URL}${Routes.UPDATE_USER.replace('{id}', String(userId))}`, { data: payload });

            expect(response.status(), 'Update user should return status 200').toBe(200);

            const updated = await response.json();

            expect(updated, 'Response should contain the updated user information').toMatchObject(payload);
        });

        await test.step('3) Delete the created user', async () => {
            const response = await request.delete(`${BASE_URL}${Routes.DELETE_USER.replace('{id}', String(userId))}`);

            expect(response.status(), 'Delete user should return status 200').toBe(200);
        });
    });

    // ---------------------------------------------------------
    // Cart workflow
    // ---------------------------------------------------------

    test('Workflow - Cart create, update and delete @master @regression @api @workflow', async ({ request }) => {
        const createPayload = RandomDataUtil.generateCartPayload(USER_ID);
        let cartId = 0;

        await test.step('1) Create the cart', async () => {
            const response = await request.post(`${BASE_URL}${Routes.CREATE_CART}`, { data: createPayload });

            expect(response.status(), 'Create cart should return status 201').toBe(201);

            const created = await response.json();

            expect(typeof created.id, 'Created cart should have a numeric ID').toBe('number');
            expect(created.userId, 'Created cart should contain the submitted user ID').toBe(USER_ID);
            expect(created.products, 'Created cart should contain the submitted products').toEqual(createPayload.products);
            cartId = created.id;
        });

        await test.step('2) Update the created cart quantity', async () => {
            const updatedProducts = createPayload.products.map(product => ({ ...product, quantity: product.quantity + 1 }));

            const response = await request.put(`${BASE_URL}${Routes.UPDATE_CART.replace('{id}', String(cartId))}`, {
                data: { ...createPayload, products: updatedProducts }
            });

            expect(response.status(), 'Update cart should return status 200').toBe(200);

            const updated = await response.json();

            expect(updated.id, 'Updated cart should keep the created cart ID').toBe(cartId);
            expect(updated.products[0].quantity, 'Product quantity should be increased by 1')
                .toBe(createPayload.products[0].quantity + 1);
            expect(updated.products, 'Response should contain the updated products').toEqual(updatedProducts);
        });

        await test.step('3) Delete the created cart', async () => {
            const response = await request.delete(`${BASE_URL}${Routes.DELETE_CART.replace('{id}', String(cartId))}`);

            expect(response.status(), 'Delete cart should return status 200').toBe(200);
        });
    });
});
