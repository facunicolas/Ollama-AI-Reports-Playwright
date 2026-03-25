import { Locator, Page } from "@playwright/test";

export class BrokenLinksPage {
    private readonly brokenImagePrivate: Locator;
    private readonly validLinkPrivate: Locator;
    private readonly brokenLinkPrivate: Locator;
    private readonly brokenImageNamePrivate: string;

    constructor(private readonly page: Page) {  
        this.brokenImagePrivate = page.locator(`img[src="/images/Toolsqa_1.jpg"]`);
        this.validLinkPrivate = page.getByRole('link', { name: 'Click Here for Valid Link' })
        this.brokenLinkPrivate = page.getByRole('link', { name: 'Click Here for Broken Link' })
        this.brokenImageNamePrivate = 'Toolsqa_1.jpg';
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/broken`);
    }

    async ObtainResponseStatus(link: Locator, endpointPath: string) {
        // 1. Esperamos cualquier respuesta
        const responsePromise = this.page.waitForResponse(response =>
            response.url().includes(endpointPath)
        );

        await link.click();

        // 2. Retornamos la respuesta específica
        return await responsePromise;
    }

    get brokenImage() {
        return this.brokenImagePrivate;
    }
    
    get validLink() {
        return this.validLinkPrivate;
    }

    get brokenLink() {
        return this.brokenLinkPrivate;
    }

    get brokenImageName() {
        return this.brokenImageNamePrivate;
    }

    
}
