import { Page } from "../../utils/test-base";

export class SortablePage {
    constructor(private readonly page: Page) { }

    async navigate() {
        await this.page.goto(`${process.env.demoQAUrl}/sortable`);
    }

    async navigateToGridTab() {
        await this.page.click('#demo-tab-grid');
    }

    async getSortableItems() {
        return await this.page.locator('.vertical-list-container .list-group-item').allTextContents();
    }

    async getGridItems() {
        return await this.page.locator('.grid-container .list-group-item').allTextContents();
    }

    async dragAndDropGridItem(sourceIndex: number, targetIndex: number) {
        const gridContainer = '.grid-container';
        const itemSelector = '.list-group-item';

        await this.page.evaluate(({ containerSel, itemSel, src, tgt }) => {
            const container = document.querySelector(containerSel);

            if (!container) return;

            const items = Array.from(container.querySelectorAll(itemSel));
            const sourceElement = items[src];
            const targetElement = items[tgt];

            if (sourceElement && targetElement) {
                // En el Grid, insertBefore funciona igual para reordenar los nodos
                if (src < tgt) {
                    targetElement.parentNode?.insertBefore(sourceElement, targetElement.nextSibling);
                } else {
                    targetElement.parentNode?.insertBefore(sourceElement, targetElement);
                }
            }
        }, {
            containerSel: gridContainer,
            itemSel: itemSelector,
            src: sourceIndex,
            tgt: targetIndex
        });

        await this.page.waitForTimeout(500);
    }

    async dragAndDropItem(sourceIndex: number, targetIndex: number) {
        const listContainerSelector = '.vertical-list-container';
        const itemSelector = '.list-group-item';

        await this.page.evaluate(({ containerSel, itemSel, src, tgt }) => {
            const container = document.querySelector(containerSel);
            if (!container) return;

            const items = Array.from(container.querySelectorAll(itemSel));
            const sourceElement = items[src];
            const targetElement = items[tgt];

            if (sourceElement && targetElement) {
                // Si movemos hacia abajo, insertamos después del target
                if (src < tgt) {
                    targetElement.parentNode?.insertBefore(sourceElement, targetElement.nextSibling);
                } else {
                    // Si movemos hacia arriba, insertamos antes del target
                    targetElement.parentNode?.insertBefore(sourceElement, targetElement);
                }
            }
        }, {
            containerSel: listContainerSelector,
            itemSel: itemSelector,
            src: sourceIndex,
            tgt: targetIndex
        });

        // Esperamos un momento para que el estado de la página se estabilice
        await this.page.waitForTimeout(500);
    }
}
