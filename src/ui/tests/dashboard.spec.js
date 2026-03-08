import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures.js';

const headerOverrides = {
    'My Info': 'PIM'
};

test('Navigate dashboard sidebar by name', async ({ page, dashboardPage }) => {
    test.setTimeout(90000); //Bigger timeout to give headroom for the navigation loop

    await dashboardPage.gotoDashboardPage();
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard', { timeout: 15000 });
    await expect(dashboardPage.sidebar).toBeVisible({ timeout: 15000 });

    const menuItems = await dashboardPage.getSidebarItemNames();
    expect(menuItems.length).toBeGreaterThan(0);
    // Loop every sidebar item and verify header title change
    for (const menuitem of menuItems) {
        const expectedHeader = headerOverrides[menuitem] ?? menuitem;
        const stayedOnPageWithSidebar = await dashboardPage.navigateToMenuItem(menuitem);

        if (!stayedOnPageWithSidebar) {
            continue;
        }
        await expect(dashboardPage.header.headerTitle).toContainText(expectedHeader, { timeout: 15000 });
    }
});

test('Verify dashboard elements', async ({ dashboardPage }) => {
    await dashboardPage.gotoDashboardPage();
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    await expect(dashboardPage.dashboardGrid).toBeVisible();
});