import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/loginPage';


test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.gotoLoginPage()
    await loginPage.login(process.env.VALID_USERNAME, process.env.VALID_PASSWORD)

    await expect(page).toHaveURL(/dashboard/)
});