import { expect } from '@playwright/test';
import {HeaderComponent} from '../components/HeaderComponent';

export class EmployeeDetailsPage {
    constructor(page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.cardLoader = page.locator('.oxd-form-loader');
        this.employeeName = page.locator('.orangehrm-edit-employee-name');
    }

    async waitPageFullyLoaded(){
        await expect(this.employeeName).toBeVisible();
        await expect(this.cardLoader).toBeHidden();
    }

    getEmployeeDetailsNameHeading(firstname, lastname) {
        const fullName = `${firstname} ${lastname}`;
        return this.employeeName.getByRole('heading', { name: fullName });
    }
}


