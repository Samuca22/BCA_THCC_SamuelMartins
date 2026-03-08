export class LoginPage {
    constructor(page){
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.usernameRequiredError = page.getByText('Required', { exact: true }).nth(0);
        this.passwordRequiredError = page.getByText('Required', { exact: true }).nth(1);
        this.errorMessageInvalid = page.getByText('Invalid credentials', { exact: true });
        this.titleLogin = page.getByRole('heading', { name: 'Login' });
    }

    async gotoLoginPage(){
        await this.page.goto(process.env.UI_BASE_URL + 'web/index.php/auth/login');
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submit();
    }

    async submit(){
        await this.loginButton.click();
        // Wait for post-login navigation so the next assertion has a stable URL
        await this.page.waitForURL(/\/(dashboard|auth\/login)/, { timeout: 15000 });
    }
}