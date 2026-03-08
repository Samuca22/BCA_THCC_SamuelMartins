import { test as setup, expect } from '@playwright/test';
import { users } from '../test-data/user-data.js';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    await page.goto(process.env.UI_BASE_URL);
    await loginPage.gotoLoginPage();
    await loginPage.login(users[0].username, users[0].password);    // users[0] => first user in the list (default user)
    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    // save auth to file
    await page.context().storageState({ path: authFile });
});