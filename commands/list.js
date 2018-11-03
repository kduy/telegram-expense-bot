const _ = require('lodash')
    , cfg = require('./../config')
    , utils = require('./../utils')
    , db  = require('./../db')
    , ExpenseUtils = new require('./../Classes/ExpenseUtils');

var eu = new ExpenseUtils();

module.exports = function (bot) {
    return function (message, args) {
        if (!args[0] && !args[1]) {
            var keyboard = new bot.classes.ReplyKeyboardMarkup(3, null, true, null);
            _(cfg.MONTHS).forEach((val, month) => {
                keyboard.addButton(new bot.classes.KeyboardButton(month));
            });
            return bot.sendMessage(new bot.classes.Message(message.chat.id, `Please specify a month to list the expenses for.\nE.g. you can type \`${cfg.COMMANDS.LIST} Apr\` to get expenses for Apr or \`${cfg.COMMANDS.LIST} #food\``, 'Markdown'), () => {});
            //return bot.sendMessage(new bot.classes.Message(message.chat.id, 'Select a month to view expenses for.', null, null, null, null, keyboard), (res) => {});
    
        }
        var callback = function (err, all) {
            bot.sendMessage(new bot.classes.Message(message.chat.id, eu.prettyPrintAll(all), null, null, null, null, new bot.classes.ReplyKeyboardHide), () => {
            });
        };
        console.log(message, args)
        utils.queryExpensesByUserMessage(db.getCollection(), message, args, callback);
    }
};
