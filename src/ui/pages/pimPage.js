import {HeaderComponent} from '../components/HeaderComponent';

export class PimPage {
    constructor(page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.employeeList = page.getByRole('table');
        this.employeeListRowGroup = page.locator('.oxd-table-body');
        this.inputFilterEmployeeName = page.locator('.oxd-input-group').filter({ hasText: 'Employee Name' }).locator('input');
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

    getEmployeeRow(name){
        return this.employeeListRowGroup.getByRole('row').filter({ hasText: name }).first();
    }
}