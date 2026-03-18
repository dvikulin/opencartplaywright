import { Page, Locator } from '@playwright/test';
import { SearchResultsPage } from './SearchResultsPage';

export class HomePage {
    private readonly page: Page;

    // My Account menu and dropdown options
    private readonly lnkMyAccount: Locator;
    private readonly lnkRegister: Locator;
    private readonly lnkLogin: Locator;

    // Search controls
    private readonly txtSearchbox: Locator;
    private readonly btnSearch: Locator;

    constructor(page: Page) {
        this.page = page;

        // Account menu locators
        this.lnkMyAccount = page.locator('span:has-text("My Account")');
        this.lnkRegister = page.locator('a:has-text("Register")');
        this.lnkLogin = page.locator('a:has-text("Login")');

        // Search locators
        this.txtSearchbox = page.locator('input[placeholder="Search"]');
        this.btnSearch = page.locator('#search button');
    }

    /**
     * Verify that Home Page exists
     * @returns Promise<boolean> true if page title contains 'Your Store'
     */
    async isHomePageExists(): Promise<boolean> {
        try {
            const title = await this.page.title();
            return title.includes('Your Store');
        } catch (error) {
            console.log(`Error verifying Home Page: ${error}`);
            return false;
        }
    }

    /**
     * Click My Account dropdown
     */
    async clickMyAccount() {
        await this.lnkMyAccount.click();
    }

    /**
     * Click Register link under My Account
     */
    async clickRegister() {
        await this.lnkRegister.click();
    }

    /**
     * Click Login link under My Account
     */
    async clickLogin() {
        await this.lnkLogin.click();
    }

    /**
     * Enter product name in search box
     * @param productName - Product name to search
     */
    async enterProductName(productName: string) {
        await this.txtSearchbox.fill(productName);
    }

    /**
     * Click Search button
     */
    async clickSearch() {
        await this.btnSearch.waitFor({ state: 'visible' });
        await this.btnSearch.scrollIntoViewIfNeeded();
        await this.btnSearch.click();
    }

    /**
     * Search product using Enter key
     * @param productName - Product name to search
     * @returns Promise<SearchResultsPage>
     */
    async searchProduct(productName: string): Promise<SearchResultsPage> {
        await this.txtSearchbox.fill(productName);
        await this.txtSearchbox.press('Enter');
        return new SearchResultsPage(this.page);
    }
}