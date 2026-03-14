import { test, expect } from '@playwright/test';
import { userSchema } from '../schemas/user.schema.js';
import { usersListSchema } from '../schemas/userList.schema.js';
import { validateSchema } from '../../utils/SchemaValidator.js';
import { UserClient } from '../clients/userClient.js';
import { userPayloadBuilder } from '../builders/userPayloadBuilder.js';
import { DataGenerator } from '../../utils/DataGenerator.js';
import usersData from '../api-test-data/users-data.json' assert { type: 'json' };

//Constants
const PAGE = 2;
const ID_USER = 2;
const ID_NON_EXISTING_USER = 999999;
const DELAY = 3;
const REASONABLE_TIMEOUT = 5000; // 5 seconds

// GET - Users API tests with manual strcture validations
test.describe('GET - User API - Manual structure validations', () => {
    //TC01 - GET users list
    test('Get users list - Manual structure validations', async ({ request }) => {
        const userClient = new UserClient(request);
        const response = await userClient.getUsersList(PAGE); // page = 2

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
        const userClient = new UserClient(request);
        const response = await userClient.getUserById(ID_USER); // id = 2 

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


// GET - Users API tests with SCHEMA validation
test.describe('GET - User API - With SCHEMA validation', () => {
    //TC01 - GET users list (schema validation)
    test('Get users list', async ({ request }) => {
        const userClient = new UserClient(request);
        const response = await userClient.getUsersList(PAGE); // page = 2

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(validateSchema(usersListSchema, responseBody)).toBeTruthy();
    });

    //TC02 - GET user by id (schema validation)
    test('Get user by id', async ({ request }) => {
        const userClient = new UserClient(request);
        const response = await userClient.getUserById(ID_USER); // id = 2

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
        const userClient = new UserClient(request);
        const fakeUser = new DataGenerator().generateUserAPIObj();

        const payload = userPayloadBuilder({ name: fakeUser.name, job: fakeUser.job });
        const response = await userClient.createUser(payload); // payload = userPayloadBuilder() -> only name + job

        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');

        const responseBody = await response.json();
        // Assert passed data in the request body
        expect(responseBody.name).toEqual(fakeUser.name);
        expect(responseBody.job).toEqual(fakeUser.job);
        // Assert extra data: generated id and timestamp
        expect(responseBody.id).toEqual(expect.any(String));
        // Assert "createdAt" property to be of type Date
        const createdAtProperty = new Date(responseBody.createdAt);
        expect(createdAtProperty).toEqual(expect.any(Date));
    });
});

// PUT
test.describe('PUT - Update user API test (data-driven)', () => {
    for (const user of usersData.users) {
        //TC01 - PUT update user
        test(`Update user to name: ${user.name} and job: ${user.job} - Manual structure validations`, async ({ request }) => {
            const userClient = new UserClient(request);

            const payload = userPayloadBuilder({ name: user.name, job: user.job });
            const response = await userClient.updateUser(ID_USER, payload); // payload = userPayloadBuilder with default name but fake job
            
            expect(response.status()).toBe(200);
            expect(response.ok()).toBeTruthy();

            const responseBody = await response.json();

            expect(responseBody.name).toEqual(user.name);
            expect(responseBody.job).toEqual(user.job);
        });
    }
});


// DELETE
test.describe('DELETE - Delete user API test', () => {
    //TC01 - DELETE delete user
    test('Delete user with id - Manual structure validations', async ({ request }) => {
        const userClient = new UserClient(request);
        const response = await userClient.deleteUser(ID_USER);

        expect(response.status()).toBe(204);
        expect(response.statusText()).toBe('No Content');

        // Assert empty response body by text
        const responseBody = await response.text();
        expect(responseBody).toBe('');
    });
});

// Advanced scenarios tests
test.describe('Advanced scenarios tests', () => {
    //TC01 - Get user with non-existing id => validate 404 and empty response body
    test('Get user with non-existing id', async ({ request }) => {
        const userClient = new UserClient(request);
        const response = await userClient.getUserById(ID_NON_EXISTING_USER);

        expect(response.status()).toBe(404);
        expect(response.statusText()).toBe('Not Found');

        const responseBody = await response.json();
        expect(responseBody).toEqual({});
    });

    //TC02 - Get users list with delay => validate response received in timeframe and valid schema scructure
    test('Get users list with delay', async ({ request }) => {
        const userClient = new UserClient(request);

        // Time before request
        const startTime = Date.now();
        const response = await userClient.getUsersListWithDelay(DELAY);
        
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
        
        const responseBody = await response.json();

        // Validate response received in timeframe (delay)
        const endTime = Date.now();
        const duration = endTime - startTime;

        // Assert (verify) response is received in reasonable timeout
        expect(duration).toBeLessThan(REASONABLE_TIMEOUT);
        // Validate schema structure
        const validationSchemaResult = validateSchema(usersListSchema, responseBody);
        expect(
            validationSchemaResult.isValid,
            validationSchemaResult.errorMessage
        ).toBe(true, null);
    });
});