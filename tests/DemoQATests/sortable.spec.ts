import { expect, test } from '../../utils/test-base';

test.beforeEach(async ({ sortablePage }) => {
    await sortablePage.navigate();
});

// Pruebas en el tab List (Lista vertical)

test('Verificar que los elementos se pueden arrastrar y soltar correctamente', async ({ sortablePage }) => {

    const initialItems = await sortablePage.getSortableItems();
    expect(initialItems).toEqual(['One', 'Two', 'Three', 'Four', 'Five', 'Six']);
    
    await sortablePage.dragAndDropItem(0, 5); // Arrastrar el primer elemento al final
    
    const newItems = await sortablePage.getSortableItems();
    expect(newItems).toEqual(['Two', 'Three', 'Four', 'Five', 'Six', 'One']); // Verificar el nuevo orden
});

test('Verificar que los elementos se pueden arrastrar y soltar en diferentes posiciones', async ({ sortablePage }) => {

    const initialItems = await sortablePage.getSortableItems();
    expect(initialItems).toEqual(['One', 'Two', 'Three', 'Four', 'Five', 'Six']);

    await sortablePage.dragAndDropItem(1, 3); // Arrastrar el segundo elemento a la cuarta posición

    const newItems = await sortablePage.getSortableItems();
    expect(newItems).toEqual(['One', 'Three', 'Four', 'Two', 'Five', 'Six']); // Verificar el nuevo orden
});

test('Verificar que los elementos se pueden arrastrar y soltar en la misma posición', async ({ sortablePage }) => {
    const initialItems = await sortablePage.getSortableItems();
    expect(initialItems).toEqual(['One', 'Two', 'Three', 'Four', 'Five', 'Six']);

    await sortablePage.dragAndDropItem(2, 2); // Arrastrar el tercer elemento a la misma posición

    const newItems = await sortablePage.getSortableItems();
    expect(newItems).toEqual(['One', 'Two', 'Three', 'Four', 'Five', 'Six']); // Verificar que el orden no cambió
});

// Pruebas en el tab Grid (Cuadrícula)

test('Verificar que los elementos se pueden arrastrar y soltar correctamente en la cuadrícula', async ({ sortablePage }) => {
    
    await sortablePage.navigateToGridTab(); // Navegar al tab Grid
    const initialItems = await sortablePage.getGridItems();

    expect(initialItems).toEqual(['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']);
    await sortablePage.dragAndDropGridItem(0, 5); // Arrastrar el primer elemento al final
    const newItems = await sortablePage.getGridItems();

    expect(newItems).toEqual(['Two', 'Three', 'Four', 'Five', 'Six', 'One', 'Seven', 'Eight', 'Nine']); // Verificar el nuevo orden
});

test('Verificar que los elementos se pueden arrastrar y soltar en diferentes posiciones en la cuadrícula', async ({ sortablePage }) => {
    
    await sortablePage.navigateToGridTab(); // Navegar al tab Grid
    const initialItems = await sortablePage.getGridItems();
    
    expect(initialItems).toEqual(['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']);
    await sortablePage.dragAndDropGridItem(1, 3); // Arrastrar el segundo elemento a la cuarta posición
    const newItems = await sortablePage.getGridItems();
    
    expect(newItems).toEqual(['One', 'Three', 'Four', 'Two', 'Five', 'Six', 'Seven', 'Eight', 'Nine']); // Verificar el nuevo orden
});

test('Verificar que los elementos se pueden arrastrar y soltar en la misma posición en la cuadrícula', async ({ sortablePage }) => {
    
    await sortablePage.navigateToGridTab(); // Navegar al tab Grid
    const initialItems = await sortablePage.getGridItems();
    
    expect(initialItems).toEqual(['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']);
    await sortablePage.dragAndDropGridItem(2, 2); // Arrastrar el tercer elemento a la misma posición
    const newItems = await sortablePage.getGridItems();
    
    expect(newItems).toEqual(['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']); // Verificar que el orden no cambió
});

