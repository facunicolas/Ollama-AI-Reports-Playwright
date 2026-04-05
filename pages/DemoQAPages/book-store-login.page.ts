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

    async navigateLogin() {
        await this.page.goto(`${process.env.demoQAUrl}/login`);
    }

    async navigateRegister() {
        await this.page.goto(`${process.env.demoQAUrl}/register`);
    }

    async login(username: string, password: string) {
        await this.navigateLogin();
        await this.usernameInput.fill(String(username));
        await this.passwordInput.fill(String(password));
        await this.loginButton.click();
    }

    async createUser(username: string, password: string) {
        await this.navigateRegister();
        await this.page.locator('#firstname').fill(username);
        await this.page.locator('#lastname').fill('User');
        await this.page.locator('#userName').fill(username);
        await this.page.locator('#password').fill(password);
        await this.page.locator('#register').click();
    }

    get usernameLabel() {
        return this.usernameLabelPrivate;
    }

}