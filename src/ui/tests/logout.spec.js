import { expect} from '@playwright/test';
import { test } from '../fixtures/fixtures.js';
import { users } from '../test-data/user-data.js';

// Override tests to start in new browser context (without auth storage)
test.use({
    storageState: {
        cookies: [],
        origins: []
    }
});

// TC01 - Login with valid credentials, enter dashboard and logout
test('Logout', async ({ loginPage, dashboardPage }) => {
    await loginPage.gotoLoginPage();
    await loginPage.login(users[0].username, users[0].password);
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');

    await dashboardPage.header.logout();
    
    await expect(dashboardPage.page).toHaveURL(/auth\/login/);
    await expect(loginPage.titleLogin).toBeVisible();
});