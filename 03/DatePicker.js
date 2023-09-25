'use strict';

class DatePicker{


    constructor(id, callback) {
        this.id = id;
        this.element = document.getElementById(id);
        this.callback = callback;
    }

    render(date, selectedElement){

        if (this.date != null && this.date.getMonth() === date.getMonth()
            && this.date.getFullYear() === date.getFullYear()){
            this.selectedDate.classList.remove('selected');
            this.selectedDate = selectedElement;
            selectedElement.setAttribute('class', 'selected');
        }
        this.date = date;
        if(this.element.firstChild != null){
            this.element.removeChild(this.element.firstChild);
        }
        const table = this.createTable();
        this.element.appendChild(table);
    }


    createTable(){

        const table = document.createElement('table');
        table.appendChild(this.createCaption());
        const header = this.createHeader();
        table.appendChild(header);
        const body = this.createBody();
        table.appendChild(body);
        return table;

    }



    /**
     * gets first row of header, nav controls
     * @returns array of values of each cell in the row
     */
    static header1(){
        return [{value: "<-", active: true},
            {value: "\u00a0", active: false},
            {value: "\u00a0", active: false},
            {value: "\u00a0", active: false},
            {value: "\u00a0", active: false},
            {value: "\u00a0", active: false},
            {value: "->", active: true}];
    }

    /**
     * gets second row of header, the days of the week
     * @returns array of values of the cells in the row
     */
    static daysOfWeek(){
        return [{value: 'Sun', active: false},
            {value: 'Mon', active: false},
            {value: 'Tue', active: false},
            {value: 'Wed', active: false},
            {value: 'Thu', active: false},
            {value: 'Fri', active: false},
            {value: 'Sat', active: false}];
    }
    createCaption(){
        const month = this.date.toLocaleString('default', { month: 'long' });
        const caption = document.createElement('caption');
        const text = document.createTextNode(month + " " + this.date.getFullYear());
        caption.appendChild(text);
        return caption;
    }

    createBody(){
        const firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
        const month = firstDayOfMonth.getMonth();
        const tempDate = new Date(firstDayOfMonth.getFullYear(),
            firstDayOfMonth.getMonth(), 1 - firstDayOfMonth.getDay());
        const body = document.createElement("tbody");

        for(let i = 0; i < 7; i++){
            if (i >= 4 && tempDate.getMonth() !== month){
                break;
            }

            const rowContent = [];
            for (let k = 0; k < 7; k++){
                rowContent.push({value: tempDate.getDate(), active: tempDate.getMonth() === month});
                tempDate.setDate(tempDate.getDate() + 1);
            }
            const row = this.getRow(rowContent, 'td');
            body.appendChild(row);

        }

        return body;

    }


    getRow(values, cellType){
        const row = document.createElement('tr');
        for (const val in values){
            if (Object.hasOwn(values, val)) {
                const cell = document.createElement(cellType);
                cell.appendChild(document.createTextNode(values[val].value));
                row.appendChild(cell);
                if (values[val].active) cell.setAttribute('class', 'active');
                if (values[val].active && cellType !== 'th') {

                    if (values[val].value === this.date.getDate()) {
                        cell.setAttribute('class', 'selected');
                        this.selectedDate = cell;
                    }
                    cell.addEventListener('click', (evt) => {
                        const tempDate = new Date(this.date.getFullYear(),
                            this.date.getMonth(), parseInt(evt.target.textContent, 10));
                        this.render(tempDate, evt.target);
                        this.callback(this.id, ({
                                month: tempDate.getMonth() + 1,//month value is 0-indexed by default
                                day: tempDate.getDate(),
                                year: tempDate.getFullYear()
                            })
                        );
                    });
                } else if (values[val].active === false && cellType !== 'th') {
                    cell.setAttribute('class', 'inactive');
                }
            }
        }
        return row;
    }



    createHeader(){
        const head = document.createElement("thead");

        const row1 = this.getRow(DatePicker.header1(), 'th');
        row1.children[0].addEventListener('click', () => {
            this.render(new Date(this.date.getFullYear(), this.date.getMonth() - 1, 1));
        });
        row1.children[6].addEventListener('click', () => {
            this.render(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 1));
        });
        head.appendChild(row1);
        head.appendChild(this.getRow(DatePicker.daysOfWeek(), 'th'));
        return head;
    }

}