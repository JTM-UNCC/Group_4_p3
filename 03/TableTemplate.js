'use strict';

class TableTemplate {
    static fillIn(id, dictionary, columnName){
        console.log(columnName);
        const table = document.getElementById(id);
        if (columnName === undefined) {
            const templateProcessor = new TemplateProcessor(table.innerHTML);
            table.innerHTML = templateProcessor.fillIn(dictionary);
        } else {
            const headerRow = table.rows[0];
            let templateProcessor = new TemplateProcessor(headerRow.innerHTML);
            headerRow.innerHTML = templateProcessor.fillIn(dictionary);
            let processingindex = null;
            for(let index = 0; index < headerRow.cells.length; index++){
                if (headerRow.cells[index].innerHTML === columnName){
                    processingindex = index;
                    break;
                }
            }
            if (processingindex !== null){
                for(let index = 1; index < table.rows.length; index++){
                    const row = table.rows[index];
                    for(let jndex = 0; jndex < row.cells.length; jndex++){
                        if (jndex === processingindex){
                            const cell = row.cells[jndex];
                            templateProcessor = new TemplateProcessor(cell.innerHTML);
                            cell.innerHTML = templateProcessor.fillIn(dictionary);
                        }
                    }
                }
            }
        }
        table.style.visibility = "visible";
    }
}