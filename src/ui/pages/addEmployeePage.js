import { expect } from '@playwright/test';
import {HeaderComponent} from '../components/HeaderComponent';

export class AddEmployeePage {
    constructor(page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.cardTitle = page.getByRole('heading', { name: 'Add Employee' });
        this.inputFirstName = page.getByRole('textbox', { name: 'First Name' });
        this.inputLastName = page.getByRole('textbox', { name: 'Last Name' });
        this.inputEmployeeId = page.locator('.oxd-input-group').filter({ hasText: 'Employee Id' }).locator('input').first();
        this.buttonSave = page.getByRole('button', {name: 'Save'});
        this.toastSuccess = page.locator('#oxd-toaster_1').getByText('Successfully Saved');
        this.cardLoader = page.locator('.oxd-form-loader');
        this.errorEmployeeIdExists = page.getByText('Employee Id already exists');
    }

    async waitPageFullyLoaded(){
        await expect(this.cardTitle).toBeVisible({ timeout: 10000 });

        await expect(this.inputFirstName).toBeVisible();
        await expect(this.inputFirstName).toBeEnabled();
        await expect(this.inputLastName).toBeEnabled();
        await expect(this.inputEmployeeId).toBeEnabled();
        // Waits for loader to be hidden
        await expect(this.cardLoader).toBeHidden();
    }

    async addEmployee(firstname, lastName, employeeid){
        await this.inputFirstName.fill(firstname);
        await this.inputLastName.fill(lastName);
        await this.inputEmployeeId.fill(employeeid);

        // Click Save and wait for navigation to the employee details page
        await Promise.all([
            this.page.waitForURL(/pim\/viewPersonalDetails/),
            this.buttonSave.click(),
        ]);
    }
}