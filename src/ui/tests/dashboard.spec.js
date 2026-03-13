import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures.js';

const headerOverrides = {
    'My Info': 'PIM'
};

test('Navigate dashboard sidebar by name', async ({ page, dashboardPage }) => {
    test.setTimeout(90000); //Bigger timeout to give headroom for the navigation loop

    await dashboardPage.gotoDashboardPage();
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard', { timeout: 15000 });
    await expect(dashboardPage.sidebar).toBeVisible({ timeout: 20000 });

    const menuItems = await dashboardPage.getSidebarItemNames();
    expect(menuItems.length).toBeGreaterThan(0);
    // Loop every sidebar item and verify header title change
    for (const menuitem of menuItems) {
        const expectedHeader = headerOverrides[menuitem] ?? menuitem;
        const previousURL = dashboardPage.page.url();
    
        await dashboardPage.navigateToMenuItem(menuitem);

        // Verify if new page without sidebar is loaded
        const stillHasSidebar = await dashboardPage.isSidebarVisible();
        if (!stillHasSidebar) {
            await dashboardPage.page.goto(previousURL);
            continue;
        }

        await expect(dashboardPage.page).toHaveURL(previousURL);
        await expect(dashboardPage.header.headerTitle).toContainText(expectedHeader, { timeout: 20000 });
    }
});

test('Verify dashboard elements', {tag: '@sanity'}, async ({ dashboardPage }) => {
    await dashboardPage.gotoDashboardPage();
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    await expect(dashboardPage.dashboardGrid).toBeVisible();
});