import { test, expect } from '../../utils/test-base';

test.beforeEach(async ({ linksPage }) => {
    await linksPage.navigate();
});

test('Verificar que el link "Home" redirige a la página principal', async ({ linksPage, page }) => {

    await test.step('Hacer click en el link "Home"', async () => {
        // Espera a abrir la nueva ventana y la carga en la variable newPage
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            linksPage.homeLink.click()
        ]);
        // Compara la url de la nueva página con la url base del linksPage
        await expect(newPage).toHaveURL(`${process.env.demoQAUrl}`);
    });
});

test('Verificar que el link Home "Dynamic" redirige a la página principal', async ({ linksPage, page }) => {

    await test.step('Hacer click en el link "Dynamic"', async () => {
        const [newPage] = await Promise.all([
            page.waitForEvent('popup'),
            linksPage.dynamicLink.click()
        ]);
        await expect(newPage).toHaveURL(`${process.env.demoQAUrl}`);
    });
});

test('Verificar que el link "Created" devuelve el status 201-special test', async ({ linksPage }) => {
    
    await test.step('Hacer click en el link "Created"', async () => {
        const response = await linksPage.ObtainResponseStatus(linksPage.createdLink, '/created');

        expect(response.status()).toBe(201);
    });
});


test('Verificar que el link "No Content" devuelve el status 204--bis', async ({ linksPage }) => {
    
    await test.step('Hacer click en el link "No Content"', async () => {
        const response = await linksPage.ObtainResponseStatus(linksPage.noContentLink, '/no-content');

        expect(response.status()).toBe(204);
    });
});

test('Verificar que el link "Moved" devuelve el status 301', async ({ linksPage }) => {

    await test.step('Hacer click en el link "Moved"', async () => {
        const response = await linksPage.ObtainResponseStatus(linksPage.movedLink, '/moved');
        expect(response.status()).toBe(301);
    });
});

test('Verificar que el link "Bad Request" devuelve el status 400', async ({ linksPage }) => {

    await test.step('Hacer click en el link "Bad Request"', async () => {
        const response = await linksPage.ObtainResponseStatus(linksPage.badRequestLink, '/bad-request');

        expect(response.status()).toBe(400);
    });
});

test('Verificar que el link "Unauthorized" devuelve el status 401', async ({ linksPage }) => {

    await test.step('Hacer click en el link "Unauthorized"', async () => {
        const response = await linksPage.ObtainResponseStatus(linksPage.unauthorizedLink, '/unauthorized');

        expect(response.status()).toBe(401);
    });
});


test('Verificar que el link "Forbidden" devuelve el status 403', async ({ linksPage }) => {

    await test.step('Hacer click en el link "Forbidden"', async () => {
        const response = await linksPage.ObtainResponseStatus(linksPage.forbiddenLink, '/forbidden');

        expect(response.status()).toBe(403);
    });
});

test('Verificar que el link "Not Found" devuelve el status 404', async ({ linksPage }) => {

    await test.step('Hacer click en el link "Not Found"', async () => {
        const response = await linksPage.ObtainResponseStatus(linksPage.notFoundLink, '/invalid-url');

        expect(response.status()).toBe(404);
    });
});



