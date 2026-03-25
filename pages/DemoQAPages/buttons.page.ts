import { Page, Locator } from '@playwright/test';

export class ButtonsPage {
    private readonly doubleClickButton: Locator;
    private readonly rightClickButton: Locator;
    private readonly dynamicClickButton: Locator;
    private readonly doubleClickMessagePrivate: Locator;
    private readonly rightClickMessagePrivate: Locator;
    private readonly dynamicClickMessagePrivate: Locator;

    constructor(private readonly page: Page) {

        //selectores
        this.doubleClickButton = this.page.locator('#doubleClickBtn');
        this.rightClickButton = this.page.locator('#rightClickBtn');
        this.dynamicClickButton = this.page.getByRole('button', { name: 'Click Me', exact: true });
        this.doubleClickMessagePrivate = this.page.locator('#doubleClickMessage');
        this.rightClickMessagePrivate = this.page.locator('#rightClickMessage');
        this.dynamicClickMessagePrivate = this.page.locator('#dynamicClickMessage');
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/buttons`);
    }

    async doubleClick() {
        await this.doubleClickButton.dblclick();
    }

    async rightClick() {
        await this.rightClickButton.click({ button: 'right' });
    }

    async dynamicClick() {
        await this.dynamicClickButton.click();
    }

    get doubleClickMessage() {
        return this.doubleClickMessagePrivate;
    }

    get rightClickMessage() {
        return this.rightClickMessagePrivate;
    }

    get dynamicClickMessage() {
        return this.dynamicClickMessagePrivate;
    }
}
