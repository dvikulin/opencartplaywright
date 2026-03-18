import { Page, Locator } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage';

export class ProductPage {
    private readonly page: Page;

    private readonly txtQuantity: Locator;
    private readonly btnAddToCart: Locator;
    private readonly cnfMsg: Locator;
    private readonly btnItems: Locator;
    private readonly lnkViewCart: Locator;

    constructor(page: Page) {
    this.page = page;

    this.txtQuantity = page.locator('input[name="quantity"]');
    this.btnAddToCart = page.locator('#button-cart');
    this.cnfMsg = page.locator('.alert.alert-success');

    // Correct cart dropdown button
    this.btnItems = page.locator('#cart button[data-bs-toggle="dropdown"]');

    // View Cart link
    this.lnkViewCart = page.locator('a:has-text("View Cart")');
}

    async setQuantity(qty: string): Promise<void> {
        await this.txtQuantity.fill('');
        await this.txtQuantity.fill(qty);
    }

    async addToCart(): Promise<void> {
        await this.btnAddToCart.click();
    }

    async isConfirmationMessageVisible(): Promise<boolean> {
        try {
            await this.cnfMsg.waitFor({ state: 'visible' });
            return await this.cnfMsg.isVisible();
        } catch (error) {
            console.log(`Confirmation message not found: ${error}`);
            return false;
        }
    }

   async clickItemsToNavigateToCart(): Promise<void> {
    await this.btnItems.waitFor({ state: 'visible' });
    await this.btnItems.click();
}

    async clickViewCart(): Promise<ShoppingCartPage> {
        await this.lnkViewCart.waitFor({ state: 'visible' });
        await this.lnkViewCart.click();
        return new ShoppingCartPage(this.page);
    }

    async addProductToCart(quantity: string): Promise<void> {
        await this.setQuantity(quantity);
        await this.addToCart();
        await this.isConfirmationMessageVisible();
    }
}