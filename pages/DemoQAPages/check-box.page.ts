import { Locator, Page } from "@playwright/test";

export class CheckboxPage {
    private readonly switcher: Locator;
    private readonly treeTitlesPrivate: Locator;
    private readonly checkboxHome: Locator;
    private readonly successTextsPrivate: Locator;

    constructor(private readonly page: Page) {
        this.switcher = page.locator('.rc-tree-switcher.rc-tree-switcher_close');
        this.treeTitlesPrivate = page.locator('.rc-tree-title');
        this.checkboxHome = page.getByRole('checkbox', { name: 'Select Home' });
        this.successTextsPrivate = page.locator('.text-success');
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/checkbox`);
    }

    async expandAllTree() {
        while (await this.switcher.count() > 0) {
            await this.switcher.first().click();
            await this.page.waitForTimeout(200);
        }
    }

    async getAllTreeTitles() {
        return await this.treeTitlesPrivate.evaluateAll((nodes: HTMLElement[]) => 
            nodes.map(n => n.innerText)
        );
    }

    async selectHomeCheckbox() {
        await this.checkboxHome.first().check();
    }

    async getAllResults() {
        return await this.successTextsPrivate.evaluateAll((nodes: HTMLElement[]) => 
            nodes.map(n => n.innerText)
        );
    }

    async normalizeText(text: Array<string>) {
        return text.map(t => t.split('.')[0].replace(/\s+/g, '').toLowerCase());
    }

    get treeTitles() {
        return this.treeTitlesPrivate;
    }

    get successTexts() {
        return this.successTextsPrivate;
    }

}