import { Locator, Page } from '@playwright/test';

export class LinksPage {
    private readonly homeLinkPrivate: Locator;
    private readonly dynamicLinkPrivate: Locator;
    private readonly createdLinkPrivate: Locator;
    private readonly noContentLinkPrivate: Locator;
    private readonly movedLinkPrivate: Locator;
    private readonly badRequestLinkPrivate: Locator;
    private readonly unauthorizedLinkPrivate: Locator;
    private readonly forbiddenLinkPrivate: Locator;
    private readonly notFoundLinkPrivate: Locator;

    constructor(private readonly page: Page) {

        this.homeLinkPrivate = page.locator('#simpleLink');
        this.dynamicLinkPrivate = page.locator('#dynamicLink');
        this.createdLinkPrivate = page.getByRole('link', { name: 'Created' })
        this.noContentLinkPrivate = page.locator('#no-content');
        this.movedLinkPrivate = page.locator('#moved');
        this.badRequestLinkPrivate = page.locator('#bad-request');
        this.unauthorizedLinkPrivate = page.locator('#unauthorized');
        this.forbiddenLinkPrivate = page.locator('#forbidden');
        this.notFoundLinkPrivate = page.locator('#invalid-url');
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/links`);
    }

    async ObtainResponseStatus(link: Locator, endpointPath: string) {
        // 1. Esperamos una respuesta que CONTENGA la ruta específica
        const responsePromise = this.page.waitForResponse(response =>
            response.url().includes(endpointPath)
        );

        await link.click();

        // 2. Retornamos la respuesta específica
        return await responsePromise;
    }

    get homeLink() {
        return this.homeLinkPrivate;
    }

    get dynamicLink() {
        return this.dynamicLinkPrivate;
    }

    get createdLink() {
        return this.createdLinkPrivate;
    }

    get noContentLink() {
        return this.noContentLinkPrivate;
    }

    get movedLink() {
        return this.movedLinkPrivate;
    }

    get badRequestLink() {
        return this.badRequestLinkPrivate;
    }

    get unauthorizedLink() {
        return this.unauthorizedLinkPrivate;
    }

    get forbiddenLink() {
        return this.forbiddenLinkPrivate;
    }

    get notFoundLink() {
        return this.notFoundLinkPrivate;
    }

    
}