/**
 * @typedef {import('@playwright/test').Page} Page
 */

export class AddEmployeePage {
    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        this.inputFirstName = page.getByRole('textbox', {name: 'firstName'});
        this.inputLastName = page.getByRole('textbox', {name: 'lastName'});
        this.buttonSave = page.getByRole('button', {name: 'Save'});
        this.toastSuccess = page.locator('#oxd-toaster_1').getByText('SuccessSuccessfully Saved');
    }

    async addEmployee(firstname, lastName){
        await this.inputFirstName.fill(firstname);
        await this.inputLastName.fill(lastName);
        await this.buttonSave.click();
    }
}