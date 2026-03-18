import { Page, Locator } from '@playwright/test';
import { CheckoutPage } from './CheckoutPage';

export class ShoppingCartPage {
    private readonly page: Page;
    private readonly lblTotalPrice: Locator;
    private readonly btnCheckout: Locator;
    private readonly txtCartQuantity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.lblTotalPrice = page.locator('#checkout-total tr:last-child td.text-end:last-child');
        this.btnCheckout = page.locator('a:has-text("Checkout")');
        this.txtCartQuantity = page.locator('#output-cart input[name="quantity"]');
    }

    async getCartQuantity(): Promise<string | null> {
        try {
            await this.txtCartQuantity.waitFor({ state: 'visible' });
            return await this.txtCartQuantity.inputValue();
        } catch (error) {
            console.log(`Unable to retrieve cart quantity: ${error}`);
            return null;
        }
    }

    /**
     * Get total price from shopping cart totals section
     * @returns Promise<string | null>
     */
    async getTotalPrice(): Promise<string | null> {
        try {
            await this.lblTotalPrice.waitFor({ state: 'visible' });
            return (await this.lblTotalPrice.textContent())?.trim() ?? null;
        } catch (error) {
            console.log(`Unable to retrieve total price: ${error}`);
            return null;
        }
    }

    /**
     * Click Checkout button
     * @returns Promise<CheckoutPage>
     */
    async clickOnCheckout(): Promise<CheckoutPage> {
        await this.btnCheckout.click();
        return new CheckoutPage(this.page);
    }

    /**
     * Verify shopping cart page is loaded
     * @returns Promise<boolean>
     */
    async isPageLoaded(): Promise<boolean> {
        try {
            await this.lblTotalPrice.waitFor({ state: 'visible' });
            return true;
        } catch {
            return false;
        }
    }
}