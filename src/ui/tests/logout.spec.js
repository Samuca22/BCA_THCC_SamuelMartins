import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');

    await dashboardPage.header.logout();

    await expect(loginPage.titleLogin).toBeVisible();
});