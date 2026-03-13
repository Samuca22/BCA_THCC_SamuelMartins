export class HeaderComponent {
    constructor(page){
        this.page = page;
        this.headerTitle = page.locator('.oxd-topbar-header-title').getByRole('heading', { level: 6 }).first();
        this.headerUserMenu = page.locator('span.oxd-userdropdown-tab');
        this.headerUserMenuItemLogout = page.getByRole('menuitem', { name: 'Logout' });
    }
    
    async logout(){
        await this.headerUserMenu.click();
        await Promise.all([
            this.page.waitForURL(/\/(auth\/login)/),
            this.headerUserMenuItemLogout.click(),
        ]);
    }
}