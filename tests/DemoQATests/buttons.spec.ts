import { test, expect } from '../../utils/test-base';

test("Prueba de los botones con diferentes tipos de clicks", async ({ buttonsPage }) => {

    await buttonsPage.navigate();
    //Doble click
    await buttonsPage.doubleClick();
    await expect(buttonsPage.doubleClickMessage)
        .toHaveText(/You have done a double click/i);

    //Click derecho
    await buttonsPage.rightClick();
    await expect(buttonsPage.rightClickMessage)
        .toHaveText(/You have done a right click/i);

    //Click dinamico
    await buttonsPage.dynamicClick();
    await expect(buttonsPage.dynamicClickMessage)
    //Error insertado intencionadamente para mostrar el error en el reporte AI.
        .toHaveText(/You have done a --STATIC!!-- click/i);
    //.toHaveText(/You have done a dynamic click/i);

});
