"use strict";

const df = require('dateformat');

class Expense {
    constructor(user, amount, type, description, timestamp, category) {
        this.user = user;
        this.amount = amount;
        this.type = type;
        this.description = description;
        this.category = category;
        this.timestamp = timestamp;
    }

    toString () {
        var d = new Date(this.timestamp);
        return `[${df(d, 'dd/mm/yy')}] - ${this.type} - ${this.amount} - ${this.description}${this.category ? ' - ' + this.category : ''}`
    }
}

module.exports = Expense;