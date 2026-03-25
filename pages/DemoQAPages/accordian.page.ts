import { Locator, Page } from "@playwright/test";

export class AccordianPage {
    
    constructor(private readonly page: Page) {
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/accordian`);
    }

    //opensection recibe un numero del 1 al 3 para abrir la seccion correspondiente
    async openSection(sectionNumber: number) {
        const sectionHeader = this.page.locator(`#section${sectionNumber}Heading`);
        await sectionHeader.click();
    }

    //obtener todos los button de class "accordion-button"
    get obtainAllAccordians() {
        return this.page.locator('.accordion-button');
    };   

}