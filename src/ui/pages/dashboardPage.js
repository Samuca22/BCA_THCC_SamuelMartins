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
        await this.sidebar.getByRole('link', { name: itemName }).click();
    }

    async navigateToMenuItem(itemName) {
        const previousURL = this.page.url();
        // click on sidebar item by name
        await this.clickSidebarItem(itemName);
        // Verify if sidebar is still visible, if not then another page was opened (without sidebar and header)
        try {
            await this.sidebar.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            try {
                await this.page.goto(previousURL);
            } catch {
                // Page/context may be closed (e.g. test timeout or link opened new tab)
                console.warn('Could not go back to previous URL:');
            }
            return false;
        }
    }

    async isSidebarVisible() {
        return await this.sidebar.isVisible();
    }
}
