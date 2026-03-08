import {HeaderComponent} from '../components/HeaderComponent';

export class PimPage {
    constructor(page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.employeeList = page.getByRole('table');
        this.employeeListRowGroup = page.locator('.oxd-table-body');
        this.inputFilterEmployeeName = page.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input');
        this.buttonSearch = page.getByRole('button', { name: 'Search' });
        this.buttonAdd = page.getByRole('button', { name: 'Add' });
        this.toastNoResultsFound = page.locator('#oxd-toaster_1').getByText('No Records Found');
    }

    /** Navigate to PIM Employee List (start page for PIM tests). Resolves against project baseURL. */
    async gotoEmployeeList() {
        await this.page.goto('/web/index.php/pim/viewEmployeeList');
    }

    async filterByName(name) {
        await this.inputFilterEmployeeName.fill(name);
        await this.buttonSearch.click();
    }

    async clickAddEmployee(){
        await this.buttonAdd.click();
    }
    
    async getEmployeeRowCount(name){
        return await this.employeeListRowGroup.getByRole('row').filter({ hasText: name }).count();
    }
    
    getEmployeeRow(name){
        return this.employeeListRowGroup.getByRole('row').filter({ hasText: name }).first();
    }
}