/**
 * FakeStore API - Products tests
 *
 * Tags: @master @sanity @regression @api
 */

import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { RandomDataUtil } from '../../utils/dataGenerator';

dotenv.config();

test.describe('Products API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const LIMIT = Number(process.env.LIMIT ?? 3);
    const CATEGORY = 'electronics';

    // Verifies the important properties of a product returned by the API
    function expectProductFields(product: any): void {
        expect(typeof product.id, 'Product id should be a number').toBe('number');
        expect(typeof product.title, 'Product title should be a string').toBe('string');
        expect(product.title.length, 'Product title should not be empty').toBeGreaterThan(0);
        expect(typeof product.price, 'Product price should be a number').toBe('number');
        expect(product.price, 'Product price should be greater than 0').toBeGreaterThan(0);
        expect(typeof product.category, 'Product category should be a string').toBe('string');
        expect(product.category.length, 'Product category should not be empty').toBeGreaterThan(0);
        expect(product.image, 'Product image should be a URL').toMatch(/^https?:\/\//);
    }

    // ---------------------------------------------------------
    // GET - Products
    // ---------------------------------------------------------

    test('GET - All products @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_PRODUCTS}`);

        expect(response.status(), 'Get all products should return status 200').toBe(200);

        const products = await response.json();

        expect(Array.isArray(products), 'Response body should be an array').toBeTruthy();
        expect(products.length, 'Product list should not be empty').toBeGreaterThan(0);
        products.forEach(expectProductFields);
    });

    test('GET - Product by ID @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status(), 'Get product by ID should return status 200').toBe(200);

        const product = await response.json();

        expect(product.id, 'Returned product ID should match the requested ID').toBe(PRODUCT_ID);
        expectProductFields(product);
    });

    test('GET - Products with limit @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_WITH_LIMIT.replace('{limit}', String(LIMIT))}`);

        expect(response.status(), 'Get products with limit should return status 200').toBe(200);

        const products = await response.json();

        expect(Array.isArray(products), 'Response body should be an array').toBeTruthy();
        expect(products.length, `Product count should match the requested limit (${LIMIT})`).toBe(LIMIT);
    });

    test('GET - Products sorted ascending @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'asc')}`);

        expect(response.status(), 'Get sorted products should return status 200').toBe(200);

        const ids: number[] = (await response.json()).map((product: { id: number }) => product.id);

        expect(ids.length, 'Product list should contain more than one product').toBeGreaterThan(1);
        expect(ids, 'Product IDs should be in ascending order').toEqual([...ids].sort((a, b) => a - b));
    });

    test('GET - Products sorted descending @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_SORTED.replace('{order}', 'desc')}`);

        expect(response.status(), 'Get sorted products should return status 200').toBe(200);

        const ids: number[] = (await response.json()).map((product: { id: number }) => product.id);

        expect(ids.length, 'Product list should contain more than one product').toBeGreaterThan(1);
        expect(ids, 'Product IDs should be in descending order').toEqual([...ids].sort((a, b) => b - a));
    });

    test('GET - All product categories @master @sanity @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_ALL_CATEGORIES}`);

        expect(response.status(), 'Get all categories should return status 200').toBe(200);

        const categories = await response.json();

        expect(Array.isArray(categories), 'Response body should be an array').toBeTruthy();
        expect(categories.length, 'Category list should not be empty').toBeGreaterThan(0);
    });

    test('GET - Products by category @master @regression @api', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCTS_BY_CATEGORY.replace('{category}', CATEGORY)}`);

        expect(response.status(), 'Get products by category should return status 200').toBe(200);

        const products = await response.json();

        expect(Array.isArray(products), 'Response body should be an array').toBeTruthy();
        expect(products.length, `Category "${CATEGORY}" should contain products`).toBeGreaterThan(0);
        products.forEach((product: { category: string }) => {
            expect(product.category, `Every product should belong to the "${CATEGORY}" category`).toBe(CATEGORY);
        });
    });

    // ---------------------------------------------------------
    // POST - Create product
    // ---------------------------------------------------------

    test('POST - Create product @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateProductPayload();

        const response = await request.post(`${BASE_URL}${Routes.CREATE_PRODUCT}`, { data: payload });

        expect(response.status(), 'Create product should return status 201').toBe(201);

        const created = await response.json();

        expect(typeof created.id, 'Created product should have a numeric ID').toBe('number');
        expect(created, 'Response should contain the submitted product information').toMatchObject(payload);
    });

    // ---------------------------------------------------------
    // PUT - Update product
    // ---------------------------------------------------------

    test('PUT - Update product @master @regression @api', async ({ request }) => {
        const payload = RandomDataUtil.generateUpdatedProductPayload();

        const response = await request.put(`${BASE_URL}${Routes.UPDATE_PRODUCT.replace('{id}', String(PRODUCT_ID))}`, { data: payload });

        expect(response.status(), 'Update product should return status 200').toBe(200);

        const updated = await response.json();

        expect(updated.id, 'Returned product ID should match the requested ID').toBe(PRODUCT_ID);
        expect(updated, 'Response should contain the updated values').toMatchObject(payload);
    });

    // ---------------------------------------------------------
    // DELETE - Delete product
    // ---------------------------------------------------------

    test('DELETE - Delete product @master @regression @api', async ({ request }) => {
        const response = await request.delete(`${BASE_URL}${Routes.DELETE_PRODUCT.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status(), 'Delete product should return status 200').toBe(200);

        // The API returns the deleted product
        const deleted = await response.json();

        expect(deleted.id, 'Deleted product ID should match the requested ID').toBe(PRODUCT_ID);
    });
});
