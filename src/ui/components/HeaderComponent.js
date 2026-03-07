export class HeaderComponent {
    constructor(page){
        this.page = page;
        this.headerTitle = page.locator('span.oxd-topbar-header-breadcrumb');
        this.headerUserMenu = page.locator('span.oxd-userdropdown-tab');
        this.headerUserMenuItemLogout = page.getByRole('menuitem', { name: 'Logout' });
    }
    
    async logout(){
        await this.headerUserMenu.click();
        await this.headerUserMenuItemLogout.click();
    }
}