import { expect, test } from '../../utils/test-base';

test.beforeEach(async ({ browserWindowsPage }) => {
    await browserWindowsPage.navigate();
});

test('Verificar que se abre una nueva pestaña con el texto correcto', async ({ browserWindowsPage }) => {
    const newTab = await browserWindowsPage.clickNewTabButton();
    const text = await browserWindowsPage.getNewTabText(newTab);
    expect(text).toBe('This is a sample page');
});

test('Verificar que se abre una nueva ventana con el texto correcto', async ({ browserWindowsPage }) => {
    const newWindow = await browserWindowsPage.clickNewWindowButton();
    const text = await browserWindowsPage.getNewWindowText(newWindow);
    //expect(text).toBe('This is a sample page');
    expect(text).toBe('This is NOT!!! a sample page');
});

test('Verificar que se abre una nueva ventana de mensaje con el texto correcto', async ({ browserWindowsPage }) => {
    const newWindowMessage = await browserWindowsPage.clickNewWindowMessageButton();
    const text = await browserWindowsPage.getNewWindowMessageText(newWindowMessage);
    expect(text).toBe('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
});

