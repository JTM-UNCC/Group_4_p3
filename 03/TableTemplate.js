'use strict';

class TableTemplate {
    static fillIn(tableId, dictionary, columnName) {
        const table = document.getElementById(tableId);

        if (!table) {
            console.error(`Table with id "${tableId}" not found.`);
            return;
        }

        const tbody = table.tBodies[0] || document.createElement("tbody");
        const headerRow = tbody.rows[0];

        // Process the header row to replace template strings
        for (let i = 0; i < headerRow.cells.length; i++) {
            const cell = headerRow.cells[i];
            cell.textContent = this.processTemplate(cell.textContent, dictionary);
        }

        // If columnName is specified, find the index of that column
        let columnIndex = -1;
        if (columnName) {
            for (let i = 0; i < headerRow.cells.length; i++) {
                if (headerRow.cells[i].textContent === columnName) {
                    columnIndex = i;
                    break;
                }
            }
        }

        // If a valid columnIndex is found, fill in the specified column
        if (columnIndex !== -1) {
            for (let i = 1; i < tbody.rows.length; i++) {
                const cell = tbody.rows[i].cells[columnIndex];
                cell.textContent = this.processTemplate(cell.textContent, dictionary);
            }
        }

        // Replace the table's body with the updated tbody
        if (!table.tBodies[0]) {
            table.appendChild(tbody);
        }

        // Make the table visible
        table.style.visibility = "visible";
    }

    static processTemplate(text, dictionary) {
        return text.replace(/{{(.*?)}}/g, (match, property) => {
            const value = dictionary[property];
            return value !== undefined ? value : "";
        });
    }
}