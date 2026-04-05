import { test, expect } from '../../utils/test-base';
import { createRandomUser } from '../../utils/DataFactory';

test.beforeEach(async ({ formPage }) => {
    await formPage.navigate();
});

test('Completar y enviar el formulario', async ({ formPage }) => {

    const testData = createRandomUser();

    //llenar el formulario con los datos de "testData"
    await formPage.fillForm(testData);

    //enviar el formulario
    await formPage.submitForm();

    //verificacion básica de que el modal de confirmación aparece
    const modalTitle = formPage.formResult;
    await expect(modalTitle).toBeVisible();
    await expect(modalTitle).toHaveText('Thanks for submitting the form');

    //verificar que los datos se muestran correctamente en la tabla del modal
    await formPage.validateFormResultTable(testData);

});

test('Validaciones de campos obligatorios', async ({ formPage }) => {
    await formPage.submitForm();

    // 1. Verificación de flujo: No debe haber modal de éxito
    await expect(formPage.formResult).not.toBeVisible();

    // 2. Verificación de campos específicos
    const requiredFields = [
        formPage.firstNameInput,
        formPage.lastNameInput,
        formPage.genderInput,
        formPage.mobileInput
    ];

    for (const field of requiredFields) {
        // Verificamos el estado nativo de validez
        const isValid = await formPage.checkInputValidity(field);
        expect(isValid, `El campo ${await field.getAttribute('placeholder')} debería ser inválido`).toBe(false);
    }
});