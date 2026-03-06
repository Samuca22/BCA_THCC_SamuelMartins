export class DashboardPage {
    constructor(page){
        this.page = page;
        this.titleDashboard = page.getByRole('heading', { name: 'Dashboard' });
        this.headerUserMenu = page.locator('span.oxd-userdropdown-tab');
        this.headerUserMenuItemLogout = page.getByRole('menuitem', { name: 'Logout' });
    }

    async logout(){
        await this.headerUserMenu.click();
        await this.headerUserMenuItemLogout.click();
    }
}
