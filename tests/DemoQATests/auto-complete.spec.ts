import { expect, test } from '../../utils/test-base';

test.beforeEach(async ({ autoCompletePage }) => {
    await autoCompletePage.navigate();
});

test('escribir varios textos en el campo de autocompletado múltiple y seleccionar la primera opción', async ({ autoCompletePage }) => {
    await autoCompletePage.enterText(autoCompletePage.autoCompleteMultipleInput, 're');
    await autoCompletePage.selectFirstOption();
    await autoCompletePage.enterText(autoCompletePage.autoCompleteMultipleInput, 'ye');
    await autoCompletePage.selectFirstOption();
    //verificar que las opciones seleccionadas son "Red" y "Yellow"
    const selectedOptions = await autoCompletePage.allSelectedOptions.allTextContents();
    expect(selectedOptions).toContain('Red');
    expect(selectedOptions).toContain('Yellow');
});

test('escribir texto en el campo de autocompletado simple y seleccionar una opción', async ({ autoCompletePage }) => {
    await autoCompletePage.enterText(autoCompletePage.autoCompleteSingleInput, 'gr');
    await autoCompletePage.selectFirstOption();
    //verificar que la opción seleccionada es "Green"
    const selectedOption = await autoCompletePage.autoCompleteSingleText.textContent();
    expect(selectedOption).toBe('Green');
});

test('verificacion borrado individual de textos en el campo de autocompletado múltiple', async ({ autoCompletePage }) => {
    await autoCompletePage.enterText(autoCompletePage.autoCompleteMultipleInput, 'wh');
    await autoCompletePage.selectFirstOption();
    await autoCompletePage.enterText(autoCompletePage.autoCompleteMultipleInput, 'ye');
    await autoCompletePage.selectFirstOption();
    //verificar que las opciones seleccionadas son "White" primero y "Yellow" segundo
    let selectedOptions = await autoCompletePage.allSelectedOptions.allTextContents();
    expect(selectedOptions[0]).toBe('White');
    expect(selectedOptions[1]).toBe('Yellow');
    //borrar la primera opcion seleccionada
    await autoCompletePage.allSelectedOptions.nth(0).locator('.auto-complete__multi-value__remove').click();
    //verificar que la opción "White" fue borrada y solo queda "Yellow"
    selectedOptions = await autoCompletePage.allSelectedOptions.allTextContents();
    expect(selectedOptions[0]).toBe('Yellow');
});

test('verificacion borrado de todas las opciones seleccionadas en el campo de autocompletado múltiple', async ({ autoCompletePage }) => {
    await autoCompletePage.enterText(autoCompletePage.autoCompleteMultipleInput, 'bl');
    await autoCompletePage.selectFirstOption();
    await autoCompletePage.enterText(autoCompletePage.autoCompleteMultipleInput, 'ye');
    await autoCompletePage.selectFirstOption();
    //verificar que las opciones seleccionadas son "Blue" primero y "Yellow" segundo
    let selectedOptions = await autoCompletePage.allSelectedOptions.allTextContents();
    expect(selectedOptions[0]).toBe('Blue');
    expect(selectedOptions[1]).toBe('Yellow');
    //borrar todas las opciones seleccionadas
    await autoCompletePage.clearAllSelectedOptions();
    //verificar que no hay opciones seleccionadas
    selectedOptions = await autoCompletePage.allSelectedOptions.allTextContents();
    expect(selectedOptions.length).toBe(0);
});


test('verificar que al seleccionar un nuevo color en el autocompletado simple se reemplaza el anterior', async ({ autoCompletePage }) => {
    await autoCompletePage.enterText(autoCompletePage.autoCompleteSingleInput, 'a');
    await autoCompletePage.selectOption('Aqua');
    //verificar que la opción seleccionada es "Aqua"
    let selectedOption = await autoCompletePage.autoCompleteSingleText.textContent();
    expect(selectedOption).toBe('Aqua');
    //seleccionar un nuevo color
    await autoCompletePage.enterText(autoCompletePage.autoCompleteSingleInput, 'gr');
    await autoCompletePage.selectFirstOption();
    //verificar que la opción seleccionada es "Green" y que "Aqua" fue reemplazada
    selectedOption = await autoCompletePage.autoCompleteSingleText.textContent();
    expect(selectedOption).toBe('Green');
});