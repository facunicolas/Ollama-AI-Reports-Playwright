import { test, expect } from '../../utils/test-base';

test.beforeEach(async ({ accordianPage }) => {
    await accordianPage.navigate();
});

//obtener todos los button de class "accordion-button" y verificar que no estan desplegados
test('Verificar que las secciones del acordeón no están desplegadas inicialmente', async ({ accordianPage, page }) => {

    //obtenemos todos los acordeones y los contamos
    const allAccordians = await accordianPage.obtainAllAccordians;
    const count = await allAccordians.count();

    //cierro el primer acordeon porque siempre se abre el sitio con el primer acordeon abierto
    await allAccordians.nth(0).click();

    //Espero que el primer acordeon no este desplegado antes de empezar la verificacion
    await expect(allAccordians.nth(0)).toHaveAttribute('aria-expanded', 'false');

    for (let i = 0; i < count; i++) {
        const accordion = allAccordians.nth(i);

        await test.step(`Verificar que la sección ${i + 1} no está desplegada`, async () => {

            await expect(accordion).toHaveAttribute('aria-expanded', 'false');
        });
    }
});


//Desplegar cada sección del acordeón y verificar que se despliega correctamente
test('Desplegar todas las secciones y verificar despliegue', async ({ accordianPage, page }) => {

    //obtenemos todos los acordeones y los contamos
    const allAccordians = await accordianPage.obtainAllAccordians;
    const count = await allAccordians.count();

    //cierro el primer acordeon porque siempre se abre el sitio con el primer acordeon abierto
    await allAccordians.nth(0).click();

    //Espero que el primer acordeon no este desplegado antes de empezar la verificacion
    await expect(allAccordians.nth(0)).toHaveAttribute('aria-expanded', 'false');

    for (let i = 0; i < count; i++) {
        const accordion = allAccordians.nth(i);
        accordion.click();
        await test.step(`Verificar que la sección ${i + 1} este desplegada`, async () => {
            await expect(accordion).toHaveAttribute('aria-expanded', 'true');
        });
    }
});

