import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PimPage } from '../pages/PimPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { EmployeeDetailsPage } from '../pages/EmployeeDetailsPage';

test('Navigate to PIM page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);
    const addEmployeePage = new AddEmployeePage(page);
    const employeeDetailsPage = new EmployeeDetailsPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

    // Ensure we have fully navigated to the dashboard
    await expect(page).toHaveURL(/dashboard/);

    await dashboardPage.clickSidebarItem('PIM');

    await expect(pimPage.header.headerTitle).toContainText('PIM');
    await expect(pimPage.employeeList).toBeVisible();
});

test('Search employee by name', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);
    //const addEmployeePage = new AddEmployeePage(page);
    //const employeeDetailsPage = new EmployeeDetailsPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');

    await dashboardPage.clickSidebarItem('PIM');

    await expect(pimPage.header.headerTitle).toContainText('PIM');
    await expect(pimPage.employeeList).toBeVisible();

    // TODO add data driven logic to search and validate multiple employees
    const name = 'John';
    await pimPage.filterByName(name);
    await pimPage.employeeList.scrollIntoViewIfNeeded();
    const employeeRow = pimPage.getEmployeeRow(name);
    await expect(employeeRow).toContainText(name);
});

test.only('Add employee and verify in details', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);
    const addEmployeePage = new AddEmployeePage(page);
    const employeeDetailsPage = new EmployeeDetailsPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);

    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');

    await dashboardPage.clickSidebarItem('PIM');

    await expect(pimPage.header.headerTitle).toContainText('PIM');

    // Click ADD
    await pimPage.clickAddEmployee();
    // Enter Add employee and wait for elements to load
    await addEmployeePage.waitPageFullyLoaded();

    // Create new user by Firstname, Lastname and a unique Employee Id
    const firstname = 'Samuel';
    const lastname = 'Martins';
    // Employee Id must be unique and <= 10 chars
    const employeeid = Date.now().toString().slice(-6);
    
    await addEmployeePage.addEmployee(firstname, lastname, employeeid);

    // Verify we navigated to the employee details page and the full name is shown
    await employeeDetailsPage.waitPageFullyLoaded();
    await expect(
        employeeDetailsPage.getEmployeeDetailsNameHeading(firstname, lastname)
    ).toBeVisible();
});