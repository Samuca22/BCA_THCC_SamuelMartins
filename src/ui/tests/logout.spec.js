import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';

test('Logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.gotoLoginPage()
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD)

    await expect(dashboardPage.titleDashboard).toBeVisible();

    await dashboardPage.logout()

    await expect(loginPage.titleLogin).toBeVisible();
});