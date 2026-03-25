import { expect, test } from "../../utils/test-base";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

test.beforeEach(async ({ datePickerPage }) => {
    await datePickerPage.navigate();
});

//Verificar que al hacer click en el campo de entrada se despliega el calendario
test('Verificar que al hacer click en el campo de entrada se despliega el calendario', async ({ datePickerPage }) => {
    await datePickerPage.dateInput.click();
    const isCalendarVisible = await datePickerPage.datePickerMonthContainer.isVisible();
    expect(isCalendarVisible).toBe(true);
});

//Verificar que las opciones de mes sean 12
test('Verificar que las opciones de mes sean 12', async ({ datePickerPage }) => {
    await datePickerPage.dateInput.click();
    const monthOptions = await datePickerPage.monthSelectDate.locator('option').allTextContents();
    expect(monthOptions.length).toBe(12);
    expect(monthOptions).toEqual(monthNames);
});

//Verificar seleccion de fecha
test('Seleccionar una fecha específica y verificar que se muestra correctamente en el campo de entrada', async ({ datePickerPage }) => {
    const month = 'October';
    const year = '2026';
    const day = '10';
    await datePickerPage.selectDate(month, year, day);

    //convertir month a su valor numerico sin 0 adelante para comparar con el valor del campo de entrada
    const monthInNumber = await datePickerPage.converMonthToNumber(month);
    
    const expectedDate = `${monthInNumber}/${day}/${year}`;
    const actualDate = await datePickerPage.dateInput.inputValue();
    expect(actualDate).toBe(expectedDate);

});

test('Seleccionar una fecha y hora específica y verificar que se muestra correctamente en el campo de entrada', async ({ datePickerPage }) => {
    const month = 'September';
    const year = '2026';
    const day = '30';
    const time = '23:30';

    await datePickerPage.selectDateAndTime(month, year, day, time);
    
    //obtener value desde dateAndTimePickerInput
    const actualDate = await datePickerPage.dateAndTimePickerInput.inputValue();

    //convertir expectedDate time a formato 12 horas para comparar con el valor del campo de entrada
    const convertedTime = await datePickerPage.convertTimeTo12HourFormat(time);
    const expectedDateWithConvertedTime = `${month} ${day}, ${year} ${convertedTime}`;

    expect(actualDate).toBe(expectedDateWithConvertedTime);
}); 

