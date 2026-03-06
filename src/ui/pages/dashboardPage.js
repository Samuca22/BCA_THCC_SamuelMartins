export class DashboardPage {
    constructor(page){
        this.page = page;
        this.headerTitle = page.locator('span.oxd-topbar-header-breadcrumb');

        this.headerUserMenu = page.locator('span.oxd-userdropdown-tab');
        this.headerUserMenuItemLogout = page.getByRole('menuitem', { name: 'Logout' });

        this.sidebar = page.locator('.oxd-sidepanel-body');
        this.sidebarMenuItem = this.sidebar.getByRole('link');

        this.dashboardGrid = page.locator('div.orangehrm-dashboard-grid');
    }

    async logout(){
        await this.headerUserMenu.click();
        await this.headerUserMenuItemLogout.click();
    }

    async getSidebarItemNames(){
        const namesArray = await this.sidebarMenuItem.allTextContents();
        return namesArray.map(name => name.trim()).filter(Boolean);
    }

    async clickSidebarItem(itemName){
        await this.sidebar.getByRole('link', {name: itemName}).click();
    }
}
