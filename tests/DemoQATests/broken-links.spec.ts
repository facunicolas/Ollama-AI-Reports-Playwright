import { expect, test } from '../../utils/test-base';

test.beforeEach(async ({ brokenLinksPage }) => {
    await brokenLinksPage.navigate();
});

test('Verificar que la imagen rota no se muestra', async ({ brokenLinksPage }) => {
    await test.step('Verificar que la imagen rota no se muestra', async () => {
        await expect(brokenLinksPage.brokenImage).not.toBeVisible();
    });
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


