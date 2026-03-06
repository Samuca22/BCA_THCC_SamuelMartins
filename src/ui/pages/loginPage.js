export class LoginPage {
    constructor(page){
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput= page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessageRequired = page.getByText('Required', { exact: true });
        this.errorMessageInvalid = page.getByText('Invalid credentials', { exact: true });
    }

    async gotoLoginPage(){
        await this.page.goto(process.env.UI_BASE_URL);
    }

    async login(username, password){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submit();
    }

    async submit(){
        await this.loginButton.click();
    }
}