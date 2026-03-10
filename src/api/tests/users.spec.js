import { test, expect } from '@playwright/test';
import { userSchema } from '../schemas/user.schema.js';
import { usersListSchema } from '../schemas/userList.schema.js';
import { validateSchema } from '../../utils/SchemaValidator.js';
import { UserClient } from '../clients/userClient.js';
import { userPayloadBuilder } from '../builders/userPayloadBuilder.js';
import { DataGenerator } from '../../utils/DataGenerator.js';


// GET - Users API tests with manual strcture validations
test.describe('GET - User API - MANUAL structure validations', () => {
    //TC01 - GET users list
    test('Get users list - Manual structure validations', async ({ request }) => {
        const userClient = new UserClient(request);
        const response = await userClient.getUsersList(2); // page = 2

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
        const response = await userClient.getUserById(2); // id = 2 

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
        const response = await userClient.getUsersList(2); // page = 2

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(validateSchema(usersListSchema, responseBody)).toBeTruthy();
    });

    //TC02 - GET user by id (schema validation)
    test('Get user by id', async ({ request }) => {
        const userClient = new UserClient(request);
        const response = await userClient.getUserById(2); // id = 2

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

        // INFO: Uncomment to see generated fake data
        console.log("\n\nGenerated fake name => " + fakeUser.name);
        console.log("Generated fake job => " + fakeUser.job);

        const payload = userPayloadBuilder({ name: fakeUser.name, job: fakeUser.job });
        const response = await userClient.createUser(payload); // payload = userPayloadBuilder() -> only name + job

        expect(response.status()).toBe(201);
        expect(response.statusText()).toBe('Created');

        const responseBody = await response.json();
        // Assert passed data in the request body
        expect(responseBody.name).toEqual(fakeUser.name);
        expect(responseBody.job).toEqual(fakeUser.job);
        // Assert extra data: generated id and timestamp
        expect(responseBody.id).toEqual(expect.any(String))
        // Assert "createdAt" property to be of type Date
        const createdAtProperty = new Date(responseBody.createdAt);
        expect(createdAtProperty).toEqual(expect.any(Date));
    });
});

// PUT
test.describe('PUT - Update user API test', () => {
    //TC01 - PUT update user
    test('Update user - Manual structure validations', async ({ request }) => {
        const userClient = new UserClient(request);
        const fakeUser = new DataGenerator().generateUserAPIObj();

        const id = 2;
        const payload = userPayloadBuilder({ job: fakeUser.job });
        const response = await userClient.updateUser(id, payload); // payload = userPayloadBuilder with default name but fake job
        
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        // Assert default name BUT fake generated job
        expect(responseBody.name).toEqual(userPayloadBuilder().name);
        expect(responseBody.job).toEqual(fakeUser.job);
        // Assert extra data: generated updatedAt property
        const updatedAtProperty = new Date(responseBody.updatedAt);
        expect(updatedAtProperty).toEqual(expect.any(Date));
    });
});


// DELETE
test.describe('DELETE - Delete user API test', () => {
    //TC01 - DELETE delete user
    test('Delete user with id - Manual structure validations', async ({ request }) => {
        const userClient = new UserClient(request);
        const id = 22;
        const response = await userClient.deleteUser(id);

        expect(response.status()).toBe(204);
        expect(response.statusText()).toBe('No Content');

        // Assert empty response body by text
        const responseBody = await response.text();
        expect(responseBody).toBe('');
    });
});