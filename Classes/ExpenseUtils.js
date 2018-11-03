"use strict";

const _ = require('lodash');

class ExpenseUtils {
    constructor() {
    }

    sumUp (expenses, type_name) {
        var sum = 0;
        _(expenses).forEach((e) => {
            if (e.type == type_name){
                sum += parseFloat(e.amount);
            }
        });
        return sum.toFixed(2);
    }


    
    prettyPrintAll(expenses) {
        var s = '';
        _(expenses).forEach((e) => {
            s += e.toString() + '\n';
        });
        return s;
    }
}

module.exports = ExpenseUtils;
