import path from 'path';
import { fileURLToPath } from 'url';
import { expect } from '@playwright/test';
import { test as setup } from './fixtures.js';
import { users } from '../test-data/user-data.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const authFile = path.join(__dirname, '../../../playwright/.auth/user.json');

setup('authenticate', async ({ page, loginPage, dashboardPage }) => {
    const username = users[0]?.username ?? process.env.VALID_USERNAME;
    const password = users[0]?.password ?? process.env.VALID_PASSWORD;
    if (!username || !password) {
        throw new Error(
            'Auth credentials missing. Set VALID_USERNAME and VALID_PASSWORD in .env or in user-data.js.'
        );
    }

    await loginPage.gotoLoginPage();
    await loginPage.login(username, password);

    await expect(page).toHaveURL(/dashboard/, { timeout: 15000 });
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    await page.context().storageState({ path: authFile });
});