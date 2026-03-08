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
        const base = process.env.UI_BASE_URL;
        const url = base ? `${base.replace(/\/$/, '')}/web/index.php/auth/login` : '/web/index.php/auth/login';
        await this.page.goto(url);
    }

    async login(username, password){
        await this.usernameInput.click();
        await this.usernameInput.fill(username);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.submit();
        await this.page.waitForURL(/\/(dashboard|auth\/login)/, { timeout: 15000 });
    }

    async submit(){
        await this.loginButton.click();
    }
}