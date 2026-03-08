import { test, expect} from '@playwright/test';
// POM pages
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PimPage } from '../pages/PimPage';
import { AddEmployeePage } from '../pages/AddEmployeePage';
import { EmployeeDetailsPage } from '../pages/EmployeeDetailsPage';
// Test data
import employeesData from '../test-data/pim-employees-data.json';
// Utils
import { DataGenerator } from '../../utils/DataGenerator';

test('Navigate to PIM page', async ({page}) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const pimPage = new PimPage(page);

    await loginPage.gotoLoginPage();
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);
    // Ensure we have fully navigated to the dashboard
    await expect(page).toHaveURL(/dashboard/);

    await dashboardPage.clickSidebarItem('PIM');
    await expect(pimPage.header.headerTitle).toContainText('PIM');
    await expect(pimPage.employeeList).toBeVisible();
});

test.describe('Search employee in list by name', () => {
    for (const employee of employeesData.employees) {
        // TC01 - Search employee by name and expect results
        test(`Search employee by name: ${employee.firstname} and expect: ${employee.expected}`, async ({page}) => {
            const loginPage = new LoginPage(page);
            const dashboardPage = new DashboardPage(page);
            const pimPage = new PimPage(page);

            await loginPage.gotoLoginPage();
            await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD);
            await expect(dashboardPage.header.headerTitle).toHaveText('Dashboard');

            await dashboardPage.clickSidebarItem('PIM');
            await expect(pimPage.header.headerTitle).toContainText('PIM');
            await expect(pimPage.employeeList).toBeVisible();


            await pimPage.filterByName(employee.firstname);
            await pimPage.employeeList.waitFor({ state: 'visible', timeout: 10000 });
            await pimPage.employeeList.scrollIntoViewIfNeeded();

            // Verify if there are results in table and what expected result is
            const rowCount = await pimPage.getEmployeeRowCount(employee.firstname);
            if (rowCount === 0 && employee.expected === 'no-results') {
                // No results should appear toast with message "No Records Found"
                await expect(pimPage.toastNoResultsFound).toBeVisible();
            } else {
                // Results found, verify that the first row is visible
                await expect(pimPage.getEmployeeRow(employee.firstname)).toBeVisible();
            }
        });

    }
});

// TC02 - Add employee and verify in details page
test('Add employee and verify in details', async ({page}) => {
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
    let employeeObj = dataGenerator.generateEmployeeObj();
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