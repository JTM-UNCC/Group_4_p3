class TableTemplate {
    static fillIn(id, dict, columnName) {
        const tableElem = document.getElementById(id);
        if (!tableElem) {
            console.error(`Table with id '${id}' not found.`);
            return;
        }

        const headerElem = tableElem.rows[0];

        let match = false;
        let colNum;
        const numCols = headerElem.cells.length;

        for (let j = 0; j < numCols; j++) {
            const currColName = headerElem.cells[j].innerHTML;
            const filledCurrColName = TableTemplate.processTemplate(currColName, dict);

            if (filledCurrColName === columnName) {
                match = true;
                colNum = j;
            }

            headerElem.cells[j].innerHTML = filledCurrColName;
        }

        const numRows = tableElem.rows.length;

        if (!columnName) {
            for (let i = 1; i < numRows; i++) {
                for (let j = 0; j < numCols; j++) {
                    const currCell = tableElem.rows[i].cells[j];
                    currCell.innerHTML = TableTemplate.processTemplate(currCell.innerHTML, dict);
                }
            }
            return;
        }

        if (!match) {
            return;
        }

        if (columnName) {
            for (let i = 1; i < numRows; i++) {
                const currCell = tableElem.rows[i].cells[colNum];
                currCell.innerHTML = TableTemplate.processTemplate(currCell.innerHTML, dict);
            }
        }
    }

    static processTemplate(template, dict) {
        return template.replace(/{{(.*?)}}/g, (match, property) => {
            if (dict.hasOwnProperty(property)) {
                return dict[property];
            } else {
                return '';
            }
        });
    }
}