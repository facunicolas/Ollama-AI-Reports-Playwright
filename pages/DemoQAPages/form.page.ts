import { expect, Locator, Page } from "@playwright/test";
import path from "path";

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    gender: 'Male' | 'Female' | 'Other';
    mobile: string;
    dob: string;
    subjects: string[];
    hobbies: string[];
    picturePath: string;
    address: string;
    state: string;
    city: string;
}

export class FormPage {

    private readonly formResultPrivate: Locator;
    private readonly tableResultPrivate: Locator;
    private readonly submittedDataTablePrivate: Locator;
    private readonly firstNameInputPrivate: Locator;
    private readonly lastNameInputPrivate: Locator;
    private readonly genderInputPrivate: Locator;
    private readonly mobileInputPrivate: Locator;

    constructor(private readonly page: Page) {
        this.formResultPrivate = page.locator('#example-modal-sizes-title-lg');
        this.tableResultPrivate = page.locator('.table-responsive table');
        this.submittedDataTablePrivate = page.locator('.modal-body tbody');
        this.firstNameInputPrivate = page.locator('#firstName');
        this.lastNameInputPrivate = page.locator('#lastName');
        this.genderInputPrivate = page.locator('input[name="gender"]').first();
        this.mobileInputPrivate = page.locator('#userNumber');
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/automation-practice-form`);
    }

    async fillForm( data: FormData  ) {

        await this.page.fill('#firstName', data.firstName);
        await this.page.fill('#lastName', data.lastName);
        await this.page.fill('#userEmail', data.email);
        await this.page.click(`label:has-text("${data.gender}")`);
        await this.page.fill('#userNumber', data.mobile);
        await this.page.fill('#dateOfBirthInput', data.dob);
        await this.page.click('#dateOfBirthInput'); 

        for (const subject of data.subjects) {
            await this.page.fill('#subjectsInput', subject);
            await this.page.click(`div[id^="react-select-2-option"] >> text="${subject}"`);
        }

        for (const hobby of data.hobbies) {
            const label = this.page.locator(`label:has-text("${hobby}")`);
            const inputId = await label.getAttribute('for');
            await this.page.locator(`#${inputId}`).click({ force: true });
        }

        await this.page.fill('#currentAddress', data.address);

        const absolutePath = path.resolve(data.picturePath);
    
        await this.page.setInputFiles('#uploadPicture', absolutePath);

        // --- SECCIÓN DE ESTADO ---
        const stateContainer = this.page.locator('#state');
        await stateContainer.scrollIntoViewIfNeeded();
        await stateContainer.click(); // Abrimos el menú

        // En lugar de escribir y dar Enter, buscamos la opción y le damos clic
        await this.page.locator('div[id^="react-select-3-option"]').filter({ hasText: data.state }).click();

        // --- SECCIÓN DE CIUDAD ---
        const cityContainer = this.page.locator('#city');
        await cityContainer.waitFor({ state: 'visible' });
        await cityContainer.click();

        // Buscamos la opción específica de la ciudad y clic
        await this.page.locator('div[id^="react-select-4-option"]').filter({ hasText: data.city }).click();
    }

    async submitForm() {
        await this.page.click('#submit');
    }

    async formatDOB(dob: string): Promise<string> {
        const [day, monthStr, year] = dob.split(' ');
        const month = new Date(`${monthStr} 1, 2000`).toLocaleString('en-US', { month: 'long' }); // Obtener el nombre completo del mes en ingles
        return `${day} ${month},${year}`;
    }

    async validateFormResultTable(expectedData: FormData) {
        //verificar que los datos se muestran correctamente en la tabla del modal
        const rows = this.submittedDataTable;
        
        await expect(rows).toContainText(expectedData.firstName);
        await expect(rows).toContainText(expectedData.lastName);
        await expect(rows).toContainText(expectedData.email);
        await expect(rows).toContainText(expectedData.gender);
        await expect(rows).toContainText(expectedData.mobile);
    
        // El formato de fecha en la tabla es diferente al que ingresamos,
        // así que usamos el método formatDOB para convertirlo
        const formattedDOB = await this.formatDOB(expectedData.dob);
        await expect(rows).toContainText(formattedDOB);
    
        for (const subject of expectedData.subjects) {
            await expect(rows).toContainText(subject);
        }
    
        for (const hobby of expectedData.hobbies) {
            await expect(rows).toContainText(hobby);
        }
    
        await expect(rows).toContainText(path.basename(expectedData.picturePath));
        await expect(rows).toContainText(expectedData.address);
        await expect(rows).toContainText(expectedData.state);
        await expect(rows).toContainText(expectedData.city);
    }

    async checkInputValidity(selector: Locator) {
        return await selector.evaluate((el: HTMLInputElement) => el.checkValidity());
    }

    get formResult() {
        return this.formResultPrivate;
    }

    get tableResult() {
        return this.tableResultPrivate;
    }

    get submittedDataTable() {
        return this.submittedDataTablePrivate;
    }

    get firstNameInput() {
        return this.firstNameInputPrivate;
    }

    get lastNameInput() {
        return this.lastNameInputPrivate;
    }

    get genderInput() {
        return this.genderInputPrivate;
    }

    get mobileInput() {
        return this.mobileInputPrivate;
    }




}