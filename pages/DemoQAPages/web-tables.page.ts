import { Locator, Page } from '@playwright/test';

export class WebTablesPage {
    private readonly addNewRecordButton: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly ageInput: Locator;
    private readonly salaryInput: Locator;
    private readonly departmentInput: Locator;
    private readonly submitButton: Locator;
    private readonly deleteButton: Locator;

    constructor(private readonly page: Page) {
        this.addNewRecordButton = page.locator('#addNewRecordButton');
        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.ageInput = page.locator('#age');
        this.salaryInput = page.locator('#salary');
        this.departmentInput = page.locator('#department');
        this.submitButton = page.locator('#submit');
        this.deleteButton = page.locator('span[title="Delete"]');
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/webtables`);
    }

    async addNewRecordToTable() {
        await this.addNewRecordButton.click();

        //create random data
        const randomFirstName = `Name ${Math.floor(Math.random() * 1000)}`;
        const randomLastName = `LastName ${Math.floor(Math.random() * 1000)}`;
        const randomEmail = `email${Math.floor(Math.random() * 1000)}@example.com`;
        const randomAge = Math.floor(Math.random() * 100);
        const randomSalary = Math.floor(Math.random() * 100000);
        const randomDepartment = `Department${Math.floor(Math.random() * 100)}`;

        await this.firstNameInput.fill(randomFirstName);
        await this.lastNameInput.fill(randomLastName);
        await this.emailInput.fill(randomEmail);
        await this.ageInput.fill(randomAge.toString());
        await this.salaryInput.fill(randomSalary.toString());
        await this.departmentInput.fill(randomDepartment);

        await this.submitButton.click();
    }

    async deleteFirstRecord() {
        await this.deleteButton.first().click();
    }


    async getTableLength() {
        return await this.page.locator('tbody tr').count();
    }

}


