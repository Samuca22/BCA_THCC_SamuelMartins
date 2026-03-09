import { test, expect } from '@playwright/test';
import { userSchema } from '../schemas/user.schema.js';
import { usersListSchema } from '../schemas/userList.schema.js';
import { validateSchema } from '../../utils/SchemaValidator.js';

// GET - Users API tests with manual strcture validations
test.describe('GET - User API - Manual structure validations', () => {
    //TC01 - GET users list
    test('Get users list - Manual structure validations', async ({ request }) => {
        const response = await request.get('/api/users?page=2', {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        // Assert pagination properties data type
        expect(responseBody.page).toEqual(expect.any(Number));
        expect(responseBody.per_page).toEqual(expect.any(Number));
        expect(responseBody.total).toEqual(expect.any(Number));
        expect(responseBody.total_pages).toEqual(expect.any(Number));
        expect(responseBody.data).toEqual(expect.any(Array));
        // Assert data (users) array is not empty
        expect(responseBody.data.length).toBeGreaterThan(0);
    });

    //TC02 - GET user by id
    test('Get - User by ID - Manual structure validations', async ({ request }) => {
        const id = 2;
        const response = await request.get(`/api/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();

        // Assert data (user) property to be an object
        expect(responseBody.data).toEqual(expect.any(Object));
        expect(responseBody.data.id).toEqual(expect.any(Number));
        expect(responseBody.data.email).toEqual(expect.any(String));
        expect(responseBody.data.first_name).toEqual(expect.any(String));
        expect(responseBody.data.last_name).toEqual(expect.any(String));
    });
});

// GET - Users API tests with manual strcture validations
test.describe('GET - Users List - With schema validation', () => {
    //TC01 - GET users list (schema validation)
    test('Get users list', async ({ request }) => {
        const response = await request.get('/api/users?page=2', {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(validateSchema(usersListSchema, responseBody)).toBeTruthy();
    });

    //TC02 - GET user by id (schema validation)
    test('Get user by id', async ({ request }) => {
        const id = 2;
        const response = await request.get(`/api/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        // Call utils function for schema validation
        const validationSchemaResult = validateSchema(userSchema, responseBody);
        // Expect true from validation and null from error message (if not throw error)
        expect(
            validationSchemaResult.isValid,
            validationSchemaResult.errorMessage
        ).toBe(true, null);
    });
});

// POST
test.describe('POST - Create user API test', () => {
    //TC01 - POST create user
    test('Create user - Manual structure validations', async ({ request }) => {
        const data = {
            name: 'Samuel Martins',
            job: 'Automation Engineer'
        };

        const response = await request.post('/api/users', {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            },
            data
        });

        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');

        const responseBody = await response.json();
        // Assert passed data in the request body
        expect(responseBody.name).toEqual(data.name);
        expect(responseBody.job).toEqual(data.job);
        // Assert extra data: generated id and timestamp
        expect(responseBody.id).toEqual(expect.any(String))

        const createdAtProperty = new Date(responseBody.createdAt);
        expect(createdAtProperty).toEqual(expect.any(Date));
    });
});

// PUT
test.describe('PUT - Update user API test', () => {
    //TC01 - PUT update user
    test('Update user - Manual structure validations', async ({ request }) => {
        const id = 2;
        const data = {
            name: 'Samuel Martins Updated',
            job: 'Automation Engineer Updated to Senior'
        };

        const response = await request.put(`/api/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            },
            data
        });

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        // Assert passed data in the request body
        expect(responseBody.name).toEqual(data.name);
        expect(responseBody.job).toEqual(data.job);

        // Assert extra data: generated updatedAt property
        const updatedAtProperty = new Date(responseBody.updatedAt);
        expect(updatedAtProperty).toEqual(expect.any(Date));
    });
});


// DELETE
test.describe('DELETE - Delete user API test', () => {
    //TC01 - DELETE delete user
    test('Delete user with id- Manual structure validations', async ({ request }) => {
        const id = 2;
        const response = await request.delete(`/api/users/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });

        expect(response.status()).toBe(204);
        expect(response.statusText()).toBe('No Content');

        // Assert empty response body by text
        const responseBody = await response.text();
        expect(responseBody).toBe('');
    });
});
