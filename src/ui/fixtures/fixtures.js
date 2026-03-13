import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { PimPage } from '../pages/PimPage.js';
import { AddEmployeePage } from '../pages/AddEmployeePage.js';
import { EmployeeDetailsPage } from '../pages/EmployeeDetailsPage.js';

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
