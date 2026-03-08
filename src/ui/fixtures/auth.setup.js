import path from 'path';
import { fileURLToPath } from 'url';

import { test as setup, expect } from '@playwright/test';

import { users } from '../test-data/user-data.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, '../../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await page.goto(process.env.UI_BASE_URL);
    await loginPage.gotoLoginPage();
    await loginPage.login(users[0].username, users[0].password);    // users[0] => first user in the list (default user)
    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    // save auth to file
    await page.context().storageState({ path: authFile });
});