import { Page } from "@playwright/test";

export class BrowserWindowsPage {
    constructor(private readonly page: Page) { }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/browser-windows`);
    }

    async clickNewTabButton() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.click('#tabButton')
        ]);
        return newPage;
    }

    async clickNewWindowButton() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.click('#windowButton')
        ]);
        return newPage;
    }

    async clickNewWindowMessageButton() {
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.page.click('#messageWindowButton')
        ]);
        return newPage;
    }

    async getNewTabText(newPage: Page) {
        await newPage.waitForLoadState();
        return await newPage.locator('#sampleHeading').textContent();
    }

    async getNewWindowText(newPage: Page) {
        await newPage.waitForLoadState();
        return await newPage.locator('#sampleHeading').textContent();
    }

    async getNewWindowMessageText(newPage: Page) {
        await newPage.waitForLoadState();
        return await newPage.locator('body').textContent();
    }

}