import { test as base } from '@playwright/test';
import { env } from 'node:process';
import { BookStoreLoginPage } from '../pages/DemoQAPages/book-store-login.page';
import { ButtonsPage } from '../pages/DemoQAPages/buttons.page';
import { CheckboxPage } from '../pages/DemoQAPages/check-box.page';
import { LinksPage } from '../pages/DemoQAPages/links.page';
import { WebTablesPage } from '../pages/DemoQAPages/web-tables.page';
import { BrokenLinksPage } from '../pages/DemoQAPages/broken-links.page';
import { AccordianPage } from '../pages/DemoQAPages/accordian.page';
import { AutoCompletePage } from '../pages/DemoQAPages/auto-complete.page';
import { DatePickerPage } from '../pages/DemoQAPages/date-picker.page';
import { UploadDownloadPage } from '../pages/DemoQAPages/upload-download.page';
import { FormPage } from '../pages/DemoQAPages/form.page';  
import { BrowserWindowsPage } from '../pages/DemoQAPages/browser-windows.page';
import { SortablePage } from '../pages/DemoQAPages/sortable.page';

// Definimos los tipos de lo que vamos a inyectar
type MyFixtures = {
    webTablesPage: WebTablesPage;
    checkBoxPage: CheckboxPage;
    buttonsPage: ButtonsPage;
    linksPage: LinksPage;
    bookStoreLoginPage: BookStoreLoginPage;
    brokenLinksPage: BrokenLinksPage;
    accordianPage: AccordianPage;
    autoCompletePage: AutoCompletePage;
    datePickerPage: DatePickerPage;
    uploadDownloadPage: UploadDownloadPage;
    formPage: FormPage;
    browserWindowsPage: BrowserWindowsPage;
    sortablePage: SortablePage;
};

// Exportamos un NUEVO objeto 'test' que extiende al original
export const test = base.extend<MyFixtures>({
    // Definimos cómo se crea cada objeto
    webTablesPage: async ({ page }, use) => {
        const wtPage = new WebTablesPage(page);
        await use(wtPage);
    },

    checkBoxPage: async ({ page }, use) => {
        const cbPage = new CheckboxPage(page);
        await use(cbPage);
    },

    buttonsPage: async ({ page }, use) => {
        const btnPage = new ButtonsPage(page);
        await use(btnPage);
    },

    linksPage: async ({ page }, use) => {
        const lnkPage = new LinksPage(page);
        await use(lnkPage);
    },

    bookStoreLoginPage: async ({ page }, use) => {
        const bsPage = new BookStoreLoginPage(page);
        await use(bsPage);
    },

    brokenLinksPage: async ({ page }, use) => {
        const blPage = new BrokenLinksPage(page);
        await use(blPage);
    },

    accordianPage: async ({ page }, use) => {
        const accPage = new AccordianPage(page);
        await use(accPage);
    },

    autoCompletePage: async ({ page }, use) => {
        const acPage = new AutoCompletePage(page);
        await use(acPage);
    },

    datePickerPage: async ({ page }, use) => {
        const dpPage = new DatePickerPage(page);
        await use(dpPage);
    },

    uploadDownloadPage: async ({ page }, use) => {
        const udPage = new UploadDownloadPage(page);
        await use(udPage);
    },

    formPage: async ({ page }, use) => {
        const fPage = new FormPage(page);
        await use(fPage);
    },

    browserWindowsPage: async ({ page }, use) => {
        const bwPage = new BrowserWindowsPage(page);
        await use(bwPage);
    },

    sortablePage: async ({ page }, use) => {
        const sPage = new SortablePage(page);
        await use(sPage);
    }

});

export { expect } from '@playwright/test';
export { Page } from '@playwright/test';
export { env } from 'node:process';