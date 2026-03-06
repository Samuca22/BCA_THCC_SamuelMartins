import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';


test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage()
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD)

    await expect(page).toHaveURL(/dashboard/)
});

// Negative scenarios
test('Failed login - Invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage()
    await loginPage.login(process.env.VALID_USERNAME, 'invalid_password')

    await expect(loginPage.errorMessageInvalid).toBeVisible();
});

test('Failed login - Empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage()
    await loginPage.submit()
    
    await expect(loginPage.usernameRequiredError).toBeVisible();
    await expect(loginPage.passwordRequiredError).toBeVisible();
});