import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

const headerOverrides = {
    'My Info': 'PIM'
};

test('Navigate dashboard sidebar by name', async ({ page }) => {
    test.setTimeout(90000); //Bigger timeout to give headroom for the navigation loop

    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

    await page.waitForURL(/dashboard/, { timeout: 15000 });
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');

    const menuItems = await dashboardPage.getSidebarItemNames();

    // Loop every sidebar item and verify header title change
    for (const menuitem of menuItems) {
        const expectedHeader = headerOverrides[menuitem] ?? menuitem;
        const stayedOnPageWithSidebar = await dashboardPage.navigateToMenuItem(menuitem);

        if (!stayedOnPageWithSidebar) {
            continue;
        }
        await expect(dashboardPage.header.headerTitle).toContainText(expectedHeader);
    }
});

test('Verify dashboard elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

    await page.waitForURL(/dashboard/, { timeout: 15000 });
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    await expect(dashboardPage.dashboardGrid).toBeVisible();    
});