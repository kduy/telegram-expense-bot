const _ = require('lodash')
    , cfg = require('./../config')
    , db  = require('./../db')
    , utils = require('./../utils')
    , ExpenseUtils = new require('./../Classes/ExpenseUtils');

var eu = new ExpenseUtils();

module.exports = function (bot) {
    return function (message, args) {
        if (!args[0] && !args[1]) {
            var keyboard = new bot.classes.ReplyKeyboardMarkup(4, null, true, null);
            _(cfg.MONTHS).forEach((val, month) => {
                keyboard.addButton(new bot.classes.KeyboardButton(month));
            });
            return bot.sendMessage(new bot.classes.Message(message.chat.id, 'Select a month to view expenses for.', null, null, null, null, keyboard), (res) => {});
        }

        var callback = function (err, all) {
            var sumAdded = eu.sumUp(all, "added");
            var sumSpent = eu.sumUp(all, "spent");
            bot.sendMessage(new bot.classes.Message(message.chat.id, `You have spent ${sumSpent}, added ${sumAdded}. `, null, null, null, null, new bot.classes.ReplyKeyboardHide), () => {});
            
        };
        console.log(args)
        utils.queryExpensesByUserMessage(db.getCollection(), message, args, callback);
    }
};
