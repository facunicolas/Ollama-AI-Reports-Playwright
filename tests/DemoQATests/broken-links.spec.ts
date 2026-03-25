import { expect, test } from '../../utils/test-base';

test.beforeEach(async ({ brokenLinksPage }) => {
    await brokenLinksPage.navigate();
});


test('Verificar que la imagen ESTA rota', async ({ page, brokenLinksPage }) => {
    const img = page.locator(`img[src*="${brokenLinksPage.brokenImageName}"]`);
    
    // Aseguramos que el elemento existe antes de evaluar
    await img.waitFor({ state: 'attached' });

    const isImageBroken = await img.evaluate((node: HTMLImageElement) => {
        // Una imagen rota generalmente tiene un ancho natural de 0
        return node.naturalWidth === 0;
    });

    expect(isImageBroken, 'El ancho natural debe ser 0 para una imagen rota').toBe(true);
});

test('Verificar que el link válido redirige correctamente', async ({ brokenLinksPage, page }) => {
    await brokenLinksPage.validLink.click()
    await expect(page).toHaveURL(`${process.env.demoQAUrl}`);
});

test('Verificar que el link roto devuelve un error 500', async ({ brokenLinksPage }) => {
    const response = await brokenLinksPage.ObtainResponseStatus(brokenLinksPage.brokenLink,
        '/status_codes/500');
    expect(response.status()).toBe(500);
});


