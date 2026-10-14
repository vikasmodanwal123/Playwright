/**
 * FakeStore API - JSON schema validation tests
 *
 * Tags: @master @regression @api @schema
 *
 * Schemas: api/schemas/product_api_schema.json, user_api_schema.json, cart_api_schema.json
 */

import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import dotenv from 'dotenv';
import { Routes } from '../../api/endpoints/routes';
import { DataProvider } from '../../utils/DataReader';

dotenv.config();

test.describe('Schema Validation API Tests', () => {

    // ---------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------

    const BASE_URL = process.env.API_BASE_URL || Routes.BASE_URL;
    const PRODUCT_ID = Number(process.env.PRODUCT_ID ?? 1);
    const USER_ID = Number(process.env.USER_ID ?? 1);
    const CART_ID = Number(process.env.CART_ID ?? 1);

    const ajv = new Ajv({ allErrors: true });

    // Validates the response body against a schema file and reports every schema violation on failure
    function expectMatchesSchema(schemaPath: string, responseBody: unknown, resourceName: string): void {
        const validate = ajv.compile(DataProvider.readJson(schemaPath));
        const isValid = validate(responseBody);

        expect(isValid, `${resourceName} response does not match its schema: ${ajv.errorsText(validate.errors)}`).toBeTruthy();
    }

    // ---------------------------------------------------------
    // GET - Response schemas
    // ---------------------------------------------------------

    test('GET - Product response schema @master @regression @api @schema', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_PRODUCT_BY_ID.replace('{id}', String(PRODUCT_ID))}`);

        expect(response.status(), 'Get product by ID should return status 200').toBe(200);

        expectMatchesSchema('./api/schemas/product_api_schema.json', await response.json(), 'Product');
    });

    test('GET - User response schema @master @regression @api @schema', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_USER_BY_ID.replace('{id}', String(USER_ID))}`);

        expect(response.status(), 'Get user by ID should return status 200').toBe(200);

        expectMatchesSchema('./api/schemas/user_api_schema.json', await response.json(), 'User');
    });

    test('GET - Cart response schema @master @regression @api @schema', async ({ request }) => {
        const response = await request.get(`${BASE_URL}${Routes.GET_CART_BY_ID.replace('{id}', String(CART_ID))}`);

        expect(response.status(), 'Get cart by ID should return status 200').toBe(200);

        expectMatchesSchema('./api/schemas/cart_api_schema.json', await response.json(), 'Cart');
    });
});
