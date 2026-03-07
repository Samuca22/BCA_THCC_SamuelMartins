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
    const dataGenerator = new DataGenerator();
    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);
    await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');
    await dashboardPage.clickSidebarItem('PIM');
    await expect(pimPage.header.headerTitle).toContainText('PIM');

    await pimPage.clickAddEmployee();
    // Enter Add employee and wait for elements to load
    await addEmployeePage.waitPageFullyLoaded();

    // Create a new employee object with random faker data
    const employeeObj = dataGenerator.generateEmployeeObj();
    // Add employee from data object
    await addEmployeePage.addEmployee(
        employeeObj.firstname, 
        employeeObj.lastname, 
        employeeObj.employeeid
    );

    // Only Id needs to be unique, if already exists, generate a new object and try again
    if ( await addEmployeePage.errorEmployeeIdExists.isVisible() ) {
        employeeObj = dataGenerator.generateEmployeeObj();
        await addEmployeePage.addEmployee(
            employeeObj.firstname, 
            employeeObj.lastname, 
            employeeObj.employeeid
        );
    }

    // Verify in the details page the person previously created
    await employeeDetailsPage.waitPageFullyLoaded();
    await expect(employeeDetailsPage.getEmployeeDetailsNameHeading(
        employeeObj.firstname, 
        employeeObj.lastname))
        .toBeVisible();
});