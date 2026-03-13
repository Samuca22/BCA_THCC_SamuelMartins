import { HeaderComponent } from '../components/HeaderComponent';

export class DashboardPage {
    constructor(page){
        this.page = page;
        this.header = new HeaderComponent(page);
        this.sidebar = page.locator('.oxd-sidepanel-body');
        this.sidebarMenuItem = this.sidebar.getByRole('link');
        this.dashboardGrid = page.locator('div.orangehrm-dashboard-grid');
    }

    async gotoDashboardPage(){
        await this.page.goto('/');
    }
    async getSidebarItemNames(){
        const namesArray = await this.sidebarMenuItem.allTextContents();
        return namesArray.map(name => name.trim()).filter(Boolean);
    }

    async clickSidebarItem(itemName){
        await this.sidebar.getByRole('link', { name: itemName }).click();
    }

    async navigateToMenuItem(itemName) {
        await this.sidebar.waitFor({ state: 'visible', timeout: 10000 });
        await this.clickSidebarItem(itemName);
    }

    async isSidebarVisible() {
        return await this.sidebar.isVisible().catch(() => false);
    }
}
