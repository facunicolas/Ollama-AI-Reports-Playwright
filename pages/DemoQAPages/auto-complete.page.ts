import { Locator, Page } from "@playwright/test";

export class AutoCompletePage {
    private readonly autoCompleteMultipleInputPrivate: Locator;
    private readonly autoCompleteSingleInputPrivate: Locator;
    private readonly autoCompleteSingleTextPrivate: Locator;
    private readonly clearMultipleButtonPrivate: Locator;

    constructor(private readonly page: Page) {
        this.autoCompleteMultipleInputPrivate = page.locator('#autoCompleteMultipleInput');
        this.autoCompleteSingleInputPrivate = page.locator('#autoCompleteSingleInput');
        this.autoCompleteSingleTextPrivate = page.locator('.auto-complete__single-value');
        this.clearMultipleButtonPrivate = page.locator('.auto-complete__clear-indicator');
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/auto-complete`);
    }

    async enterText(Locator: Locator, text: string) {
        await Locator.fill(text);
    }

    async selectOption(option: string) {
        await this.page.locator(`text=${option}`).click();
    }

    //obtener todos los div clase "auto-complete__multi-value"
    get allSelectedOptions() {
        return this.page.locator('.auto-complete__multi-value');
    }  

    //seleccionar la primera opcion sugerida
    async selectFirstOption() {
        await this.page.locator('.auto-complete__option').first().click();
    }
    
    //borrar todas las opciones seleccionadas
    async clearAllSelectedOptions() {
        await this.clearMultipleButtonPrivate.click();
    }

    get autoCompleteMultipleInput() {
        return this.autoCompleteMultipleInputPrivate;
    }

    get autoCompleteSingleInput() {
        return this.autoCompleteSingleInputPrivate;
    }

    get autoCompleteSingleText() {
        return this.autoCompleteSingleTextPrivate;
    }

    get clearMultipleButton() {
        return this.clearMultipleButtonPrivate;
    }


}