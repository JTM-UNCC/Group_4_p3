'use strict';

class TemplateProcessor {
    constructor(template) {
        this.template = template;
    }
    fillIn(dictionary){
        let returnString = this.template;
        for (const property in dictionary){
            if (Object.prototype.hasOwnProperty.call(dictionary, property)) {
                returnString = returnString.replaceAll("{{" + property + "}}",dictionary[property]);
            }
        }
        const regex = /{{.*}}/g;
        returnString = returnString.replaceAll(regex,"");
        return returnString;
    }
}