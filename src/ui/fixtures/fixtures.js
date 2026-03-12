import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { DashboardPage } from '../pages/dashboardPage.js';
import { PimPage } from '../pages/pimPage.js';
import { AddEmployeePage } from '../pages/addEmployeePage.js';
import { EmployeeDetailsPage } from '../pages/employeeDetailsPage.js';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },

    pimPage: async ({ page }, use) => {
        await use(new PimPage(page));
    },

    addEmployeePage: async ({ page }, use) => {
        await use(new AddEmployeePage(page));
    },

    employeeDetailsPage: async ({ page }, use) => {
        await use(new EmployeeDetailsPage(page));
    },
});
