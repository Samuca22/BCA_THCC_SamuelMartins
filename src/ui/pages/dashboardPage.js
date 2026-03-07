import { HeaderComponent } from '../components/HeaderComponent';

export class DashboardPage {
    constructor(page){
        this.page = page;
        this.header = new HeaderComponent(page);
        this.sidebar = page.locator('.oxd-sidepanel-body');
        this.sidebarMenuItem = this.sidebar.getByRole('link');
        this.dashboardGrid = page.locator('div.orangehrm-dashboard-grid');
    }

    async getSidebarItemNames(){
        const namesArray = await this.sidebarMenuItem.allTextContents();
        return namesArray.map(name => name.trim()).filter(Boolean);
    }

    async clickSidebarItem(itemName){
        await this.sidebar.getByRole('link', {name: itemName}).click();
    }
}
