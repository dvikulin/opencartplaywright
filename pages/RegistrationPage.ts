import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
    private readonly page: Page;

    private readonly txtFirstName: Locator;
    private readonly txtLastName: Locator;
    private readonly txtEmail: Locator;
    private readonly txtPassword: Locator;
    private readonly chkPrivacyPolicy: Locator;
    private readonly btnContinue: Locator;
    private readonly pageHeading: Locator;
    private readonly msgWarning: Locator;

    constructor(page: Page) {
        this.page = page;

        this.txtFirstName = page.locator('#input-firstname');
        this.txtLastName = page.locator('#input-lastname');
        this.txtEmail = page.locator('#input-email');
        this.txtPassword = page.locator('#input-password');
        this.chkPrivacyPolicy = page.locator('input[name="agree"]');
        this.btnContinue = page.locator('button:has-text("Continue")');

        // Same selector works on both register and success pages
        this.pageHeading = page.locator('#content h1');

        // Optional warning/error area
        this.msgWarning = page.locator('.alert, .text-danger');
    }

    async setFirstName(firstName: string) {
        await this.txtFirstName.fill(firstName);
    }

    async setLastName(lastName: string) {
        await this.txtLastName.fill(lastName);
    }

    async setEmail(email: string) {
        await this.txtEmail.fill(email);
    }

    async setPassword(password: string) {
        await this.txtPassword.fill(password);
    }

    async setPrivacyPolicy() {
        await this.chkPrivacyPolicy.click();
    }

    async clickContinue() {
        await this.btnContinue.click();
    }

    async waitForRegistrationSuccess() {
        await this.page.waitForURL(/route=account\/success/);
        await this.pageHeading.waitFor({ state: 'visible' });
    }

    async getConfirmationMsg(): Promise<string | null> {
        await this.waitForRegistrationSuccess();
        return await this.pageHeading.textContent();
    }

    async getWarningMessage(): Promise<string | null> {
        if (await this.msgWarning.count() > 0) {
            return await this.msgWarning.first().textContent();
        }
        return null;
    }
}