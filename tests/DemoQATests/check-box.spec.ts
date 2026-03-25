import { test, expect } from '../../utils/test-base'; 

test('Test dinamico de texto al seleccionar los checkboxes', async ({ checkBoxPage }) => {

    await checkBoxPage.navigate();

    await checkBoxPage.expandAllTree();

    //Guarda todos los títulos del árbol en un array y los normaliza
    const treeTitles = await checkBoxPage.getAllTreeTitles()
        .then(checkBoxPage.normalizeText);

    //Verifica que el título del primer nodo del árbol sea visible
    await expect(checkBoxPage.treeTitles.first()).toBeVisible();

    //Guarda todos los textos resultado del pie de pagina
    //cada texto debiera corresponde al label del checkbox marcado
    const results = await checkBoxPage.getAllResults()
        .then(checkBoxPage.normalizeText);

    ////-----------------------
    //results.push('pepe'); //Agrego un resultado que no existe para verificar que el test falle
    ////-----------------------

    //Selecciona el checkbox Home para marcar todos los checkboxes del árbol
    await checkBoxPage.selectHomeCheckbox();

    //Verifica que el texto de aunque sea el resultado del pie de pagina sea visible
    await expect(checkBoxPage.successTexts.first()).toBeVisible();

    results.forEach((result: string) => {
        expect(treeTitles, `El label ${result} no está en el árbol`).toContain(result);
    });
});