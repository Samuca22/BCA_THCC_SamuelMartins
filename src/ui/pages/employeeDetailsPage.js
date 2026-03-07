/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class AddEmployeePage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.employeeName = page.locator('.orangehrm-edit-employee-name');
    }

    getEmployeeDetailsNameHeading(firstname, lastname) {
        const fullName = `${firstname} ${lastname}`;
        return this.employeeName.getByRole('heading', { name: fullName });
    }
}