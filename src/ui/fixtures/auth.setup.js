import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { expect } from '@playwright/test';
import { test as setup } from './fixtures.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const authFile = path.join(__dirname, '../../../playwright/.auth/user.json');

setup('authenticate', async ({ page, loginPage, dashboardPage }) => {
    setup.setTimeout(60000);

    const username = process.env.VALID_USERNAME;
    const password = process.env.VALID_PASSWORD;
    if (!username || !password) {
        throw new Error('Set VALID_USERNAME and VALID_PASSWORD in your .env file.');
    }

    await loginPage.gotoLoginPage();
    await expect(loginPage.titleLogin).toBeVisible({ timeout: 15000 });
    await expect(loginPage.usernameInput).toBeVisible({ timeout: 15000 });

    await loginPage.login(username, password);

    await expect(page).toHaveURL(/dashboard/);
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    await page.context().storageState({ path: authFile });
});