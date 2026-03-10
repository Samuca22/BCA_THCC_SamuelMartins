import { test, expect } from '@playwright/test';
import { userSchema } from '../schemas/user.schema.js';
import { usersListSchema } from '../schemas/userList.schema.js';
import { validateSchema } from '../../utils/SchemaValidator.js';
import { loginPayloadBuilder } from '../builders/loginPayloadBuilder.js';
import { AuthClient } from '../clients/authClient.js';

test.describe('Authentication - Happy state scenarios', () => {

    //TC01 - POST - Register user successfully
    test('POST Register user successfully', async ({ request }) => {
        const authClient = new AuthClient(request);         
        const response = await authClient.registerUser(loginPayloadBuilder());

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(responseBody.token).toEqual(expect.any(String));
        expect(responseBody.token).not.toBe('');
    });

    //TC02 - POST Login sucessfully
    test('POST Login sucessfully', async ({ request }) => {
        const authClient = new AuthClient(request);
        const response = await authClient.loginUser(loginPayloadBuilder());

        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();

        const responseBody = await response.json();
        expect(responseBody.token).toEqual(expect.any(String));
        expect(responseBody.token).not.toBe('');
    });
});

test.describe('Authentication - Negative state scenarios', async () => {
    //TC01 - POST - Register user with missing password
    test('POST - Try Register user without password', async ({ request }) => {
        const authClient = new AuthClient(request);
        const response = await authClient.registerUser(loginPayloadBuilder({ password: '' })); // Override password with empty string

        expect(response.status()).toBe(400);
        expect(response.statusText()).toBe('Bad Request');

        const responseBody = await response.json();
        expect(responseBody.error).toEqual('Missing password');
    });

    //TC02 - POST - Login with missing credentials
    test('POST - Try Login with missing credentials', async ({ request }) => {
        const authClient = new AuthClient(request);
        const response = await authClient.loginUser(loginPayloadBuilder({ email: '', password: '' }));   // Override email and password with empty strings

        expect(response.status()).toBe(400);
        expect(response.statusText()).toBe('Bad Request');

        const responseBody = await response.json();
        expect(responseBody.error).toEqual('Missing email or username');
    });
});