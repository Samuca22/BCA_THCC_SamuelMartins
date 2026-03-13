import { expect} from '@playwright/test';
import { test } from '../fixtures/fixtures.js';
// Test data (populate more data if needed)
import { users } from '../test-data/user-data.js';

// Override tests to start in new browser context (without auth storage)
test.use({
    storageState: {
      cookies: [],
      origins: []
    }
  });

// TC01 - Successful login (tag sanity test)
test('Successful login', {tag: '@sanity'}, async ({ loginPage, dashboardPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login(users[0].username, users[0].password);
    //await expect(dashboardPage.header.headerTitle).toBeVisible();
    await expect(dashboardPage.page).toHaveURL(/dashboard/);
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
});

// Negative scenarios
test.describe('Negative state scenarios', {tag: '@sanity'}, () => {
    // TC02 - Failed login - Invalid password
    test('Failed login - Invalid password', async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
        // Login with first user but with invalid password
        await loginPage.login(users[0].username, 'invalid_password');
        await expect(loginPage.errorMessageInvalid).toBeVisible();
    });


    // TC03 - Failed login - Empty fields
    test('Failed login - Empty fields', {tag: '@sanity'}, async ({ loginPage }) => {
        await loginPage.gotoLoginPage();
        await loginPage.submit();
        
        await expect(loginPage.usernameRequiredError).toBeVisible();
    });
});