import { expect } from '@playwright/test';
import { test } from '../fixtures/fixtures.js';

const headerOverrides = {
    'My Info': 'PIM'
};

test('Navigate dashboard sidebar by name', async ({ page, dashboardPage }) => {
    test.setTimeout(90000); //Bigger timeout to give headroom for the navigation loop

    await page.goto('/');
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    
    const menuItems = await dashboardPage.getSidebarItemNames();
    expect(menuItems.length).toBeGreaterThan(0);
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

test('Verify dashboard elements', async ({ page, dashboardPage }) => {
    await page.goto('/');
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    await expect(dashboardPage.dashboardGrid).toBeVisible();
});