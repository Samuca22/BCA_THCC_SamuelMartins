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
    
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);
    
        const respondeBody = await response.json();
        // Assert pagination properties data type
        expect(respondeBody.page).toEqual(expect.any(Number));
        expect(respondeBody.per_page).toEqual(expect.any(Number));
        expect(respondeBody.total).toEqual(expect.any(Number));
        expect(respondeBody.total_pages).toEqual(expect.any(Number));
        expect(respondeBody.data).toEqual(expect.any(Array));
        // Assert data (users) array is not empty
        expect(respondeBody.data.length).toBeGreaterThan(0);
    });

    //TC02 - GET user by id
    test('Get - User by ID - Manual structure validations', async ({ request }) => {
        const response = await request.get('/api/users/2', {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            }
        });
        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const respondeBody = await response.json();

        // Assert data (user) property to be an object
        expect(respondeBody.data).toEqual(expect.any(Object));
        expect(respondeBody.data.id).toEqual(expect.any(Number));
        expect(respondeBody.data.email).toEqual(expect.any(String));
        expect(respondeBody.data.first_name).toEqual(expect.any(String));
        expect(respondeBody.data.last_name).toEqual(expect.any(String));
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

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const respondeBody = await response.json();
    expect(validateSchema(usersListSchema, respondeBody)).toBeTruthy();
    });

    //TC02 - GET user by id (schema validation)
    test('Get user by id', async ({ request }) => {
    const response = await request.get('/api/users/2', {
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.API_KEY
        }
    });
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const respondeBody = await response.json();
    // Call utils function for schema validation
    const validationSchemaResult = validateSchema(userSchema, respondeBody);
    // Expect true from validation and null from error message (if not throw error)
    expect(
        validationSchemaResult.isValid, 
        validationSchemaResult.errorMessage)
        .toBe(true, null);
    });

});

// POST
test.describe('POST - Create user API test', () => {

    //TC01 - POST create user
    test('Create user - Manual structure validations', async ({ request }) => {
        const response = await request.post('/api/users', {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY
            },
            data: {
                name: 'Samuel Martins',
                job: 'Automation Engineer'
            }
        });

        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');

        const respondeBody = await response.json();
        // Assert passed data in the request body
        expect(respondeBody.name).toEqual('Samuel Martins');
        expect(respondeBody.job).toEqual('Automation Engineer');
        // Assert extra data: generated id and timestamp
        expect(respondeBody.id).toEqual(expect.any(String))
        
        const createdAt = new Date(respondeBody.createdAt);
        expect(createdAt).toEqual(expect.any(Date));
    });
});
