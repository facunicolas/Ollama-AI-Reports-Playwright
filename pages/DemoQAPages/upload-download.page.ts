import { Locator, Page } from "@playwright/test";

export class UploadDownloadPage {

    private readonly downloadButtonPrivate: Locator;
    private readonly uploadInputPrivate: Locator;
    private readonly uploadedFilePathPrivate: Locator;

    constructor(private readonly page: Page) {
        this.downloadButtonPrivate = page.locator('#downloadButton');
        this.uploadInputPrivate = page.locator('#uploadFile');
        this.uploadedFilePathPrivate = page.locator('#uploadedFilePath');
    }

    get downloadButton() {
        return this.downloadButtonPrivate;
    }

    get uploadInput() {
        return this.uploadInputPrivate;
    }

    get uploadedFilePath() {
        return this.uploadedFilePathPrivate;
    }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/upload-download`);
    }

    async downloadFile() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadButton.click();
        const download = await downloadPromise;

        // Obtener la ruta y verificar existencia del archivo
        const path = await download.path();
        return { path, name: download.suggestedFilename() };
    }

    async uploadFile(filePath: string) {
        await this.uploadInput.setInputFiles(filePath);
    }

    async uploadFileWithPath(filePath: string) {
        await this.uploadInput.setInputFiles(filePath);
    }

    async getUploadedFilePath() {
        return await this.uploadedFilePath.textContent();
    }

}