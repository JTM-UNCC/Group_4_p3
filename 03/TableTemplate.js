'use strict';

class TableTemplate {
    static fillIn(tableId, dictionary, columnName = null) {
        const table = document.getElementById(tableId);

        if (!table) {
            console.error(`Table with id "${tableId}" not found.`);
            return;
        }

        const headerRow = table.rows[0];
        for (let i = 0; i < headerRow.cells.length; i++) {
            const cell = headerRow.cells[i];
            cell.textContent = this.processTemplate(cell.textContent, dictionary);
        }

        let columnIndex = -1;
        if (columnName) {
            for (let i = 0; i < headerRow.cells.length; i++) {
                if (headerRow.cells[i].textContent === columnName) {
                    columnIndex = i;
                    break;
                }
            }
        }

        if (columnIndex !== -1) {
            for (let i = 1; i < table.rows.length; i++) {
                const cell = table.rows[i].cells[columnIndex];
                cell.textContent = this.processTemplate(cell.textContent, dictionary);
            }
        }

        table.style.visibility = 'visible';
    }

    static processTemplate(text, dictionary) {
        return text.replace(/{{(.*?)}}/g, (match, property) => {
            const value = dictionary[property];
            return value !== undefined ? value : '';
        });
    }
}