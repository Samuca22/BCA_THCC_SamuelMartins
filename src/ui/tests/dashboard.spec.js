import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

const headerOverrides = {
    'My Info': 'PIM'
};

test('Navigate dashboard sidebar by name', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');

    const menuItems = await dashboardPage.getSidebarItemNames();

    console.log('Array menu items => ' + menuItems);

    for(const menuitem of menuItems){
        if (menuitem == 'Maintenance') {
            continue;
        }
        // Checks if the current menuItem name matches anything inside headerOverrides object, if no match then keeps the menuItem
        const expectedHeader = headerOverrides[menuitem] ?? menuitem;
        await dashboardPage.clickSidebarItem(menuitem);
        await expect(dashboardPage.header.headerTitle).toContainText(expectedHeader);
    }
});

test('Verify dashboard elements', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    await expect(dashboardPage.dashboardGrid).toBeVisible();    
});