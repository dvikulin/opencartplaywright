import { Page, Locator } from '@playwright/test';
import { LogoutPage } from './LogoutPage';

export class MyAccountPage {
    private readonly page: Page;
    private readonly msgHeading: Locator;
    private readonly lnkLogout: Locator;

    constructor(page: Page) {
        this.page = page;
        this.msgHeading = page.locator('#content h1');
        this.lnkLogout = page.locator('#column-right a:has-text("Logout")');
    }

    async isMyAccountPageExists(): Promise<boolean> {
        try {
            await this.page.waitForURL(/route=account\/account/);
            await this.msgHeading.waitFor({ state: 'visible' });

            const headingText = await this.msgHeading.textContent();
            return headingText?.trim() === 'My Account';
        } catch (error) {
            console.log('Current URL:', this.page.url());
            console.log(`Error checking My Account page: ${error}`);
            return false;
        }
    }

    async clickLogout(): Promise<LogoutPage> {
        await this.lnkLogout.click();
        return new LogoutPage(this.page);
    }

    async getPageTitle(): Promise<string> {
        return this.page.title();
    }
}