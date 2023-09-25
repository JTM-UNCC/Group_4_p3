class TableTemplate {
    static fillIn(tableId, dictionary, columnName = null) {
        const table = document.getElementById(tableId);

        // Process the header row to replace template strings
        const headerRow = table.rows[0];
        for (let i = 0; i < headerRow.cells.length; i++) {
            const cell = headerRow.cells[i];
            cell.textContent = this.processTemplate(cell.textContent, dictionary);
        }

        // If columnName is specified, find the column index
        let columnIndex = -1;
        if (columnName) {
            for (let i = 0; i < headerRow.cells.length; i++) {
                if (headerRow.cells[i].textContent === columnName) {
                    columnIndex = i;
                    break;
                }
            }
        }

        // If columnIndex is found, fill in the specified column
        if (columnIndex !== -1) {
            for (let i = 1; i < table.rows.length; i++) {
                const cell = table.rows[i].cells[columnIndex];
                cell.textContent = this.processTemplate(cell.textContent, dictionary);
            }
        }

        // Make the table visible
        table.style.visibility = 'visible';
    }

    static processTemplate(text, dictionary) {
        return text.replace(/{{(.*?)}}/g, (match, property) => {
            const value = dictionary[property];
            return value !== undefined ? value : '';
        });
    }
}