/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class PimPage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.employeeList = page.getByRole('table');
        this.employeeListRowGroup = page.getByRole('rowgroup');
        this.inputFilterEmployeeName = page.getByLabel('Employee Name');
        this.buttonSearch = page.getByRole('button', { name: 'Search' });
        this.buttonAdd = page.getByRole('button', {name: 'Add'});
    }

    async filterByName(name) {
        await this.inputFilterEmployeeName.fill(name);
        await this.buttonSearch.click();
    }

    async clickAddEmployee(){
        await this.buttonAdd.click();
    }
}