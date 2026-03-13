import { expect} from '@playwright/test';
// POM pages
import { test } from '../fixtures/fixtures.js';

// Test data
import employeesData from '../test-data/pim-employees-data.json' assert { type: "json" };
// Utils
import { DataGenerator } from '../../utils/DataGenerator';

test('Navigate to PIM page', async ({ page, dashboardPage, pimPage }) => {
    await page.goto('/');
    await expect(dashboardPage.sidebar).toBeVisible();
    await dashboardPage.clickSidebarItem('PIM');
    await expect(pimPage.header.headerTitle).toContainText('PIM');
    await expect(pimPage.employeeList).toBeVisible();
});

test.describe('Search employee in list by name', () => {
    test.beforeEach(async ({ pimPage }) => {
        await pimPage.gotoEmployeeList();
        await expect(pimPage.employeeList).toBeVisible();
    });

    for (const employee of employeesData.employees) {
        test(`Search employee by name: ${employee.firstname} and expect: ${employee.expected}`, async ({ pimPage }) => {
            
            await pimPage.searchEmployeeByName(employee.firstname);
            // Assert page is loaded
            await expect(pimPage.employeeList).toBeVisible({ timeout: 20000 });
            await expect(pimPage.cardLoader).toBeHidden();
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
test('Add employee and verify in details', async ({ pimPage, addEmployeePage, employeeDetailsPage }) => {
    const dataGenerator = new DataGenerator();          

    await addEmployeePage.gotoAddEmployeePage();

    // Validate page is loaded
    await expect(addEmployeePage.cardTitle).toBeVisible({ timeout: 10000 });
    await expect(addEmployeePage.inputFirstName).toBeVisible();
    await expect(addEmployeePage.inputFirstName).toBeEnabled();
    await expect(addEmployeePage.cardLoader).toBeHidden();
    
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
        while ( await addEmployeePage.errorEmployeeIdExists.isVisible()) {
            employeeObj = dataGenerator.generateEmployeeObj();
            await addEmployeePage.addEmployee(
                employeeObj.firstname,
                employeeObj.lastname,
                employeeObj.employeeid
            );
        }
    }
    
    // Verify if details card is loaded
    await expect(employeeDetailsPage.cardLoader).toBeHidden({ timeout: 15000 });

    // Verify card has the employee full name
    const employeeFullname = employeeDetailsPage.getEmployeeDetailsNameHeading(
        employeeObj.firstname, 
        employeeObj.lastname
    );
    await expect(employeeFullname).toBeVisible({ timeout: 20000 });
});