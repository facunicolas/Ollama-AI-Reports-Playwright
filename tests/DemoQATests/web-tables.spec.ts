import { test, expect } from '../../utils/test-base'; 

test.beforeEach(async ({ webTablesPage }) => {
    await webTablesPage.navigate();
});


test('Agregar un nuevo registro a la tabla y verificar cantidad de elementos', async ({ webTablesPage }) => {

    const initialTableLength = await webTablesPage.getTableLength();

    await test.step('Agregar 2 registros nuevos a la tabla', async () => {
        await webTablesPage.addNewRecordToTable();
        await webTablesPage.addNewRecordToTable();
    });

    const finalTableLength = await webTablesPage.getTableLength();

    
    expect(finalTableLength,'La tabla debiera tener ahora 2 registros nuevos').toBe(initialTableLength + 2);

});

test("Borrar un elemento de la tabla y verificar cantidad de elementos", async ({ webTablesPage }) => {

    const initialTableLength = await webTablesPage.getTableLength();

    await test.step("Borrar el primer elemento de la tabla", async () => {
        await webTablesPage.deleteFirstRecord();
    });

    const finalTableLength = await webTablesPage.getTableLength();

    expect(finalTableLength).toBe(initialTableLength - 1);

});