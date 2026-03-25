import { Page, Locator } from '@playwright/test';

export class BookStoreLoginPage {
    private readonly usernameInput: Locator
    private readonly passwordInput: Locator
    private readonly loginButton: Locator
    private readonly usernameLabelPrivate: Locator

    constructor(private readonly page: Page) {
        this.usernameInput = this.page.locator('#userName');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.locator('#login');
        this.usernameLabelPrivate = this.page.locator('#userName-value');
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/login`);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(String(username));
        await this.passwordInput.fill(String(password));
        await this.loginButton.click();
    }

    get usernameLabel() {
        return this.usernameLabelPrivate;
    }

}