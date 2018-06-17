const database = require("./database");
const mongoose = require("mongoose");

const walletSchema = require("./Schemas/wallet.js");
const expenseSchema = require("./Schemas/expense.js");

const Wallet = mongoose.model("Wallet",walletSchema);
const Expense = mongoose.model("Expense",expenseSchema);

module.exports = function(req,res,next){
    if (req.session.user == undefined) {
        res.json(null);
    } else {
        var dataObject = {};
        Wallet.find({owner: req.session.user._id}).find(function(err,docs){
            dataObject.wallets = docs;
            Expense.find({owner: req.session.user._id}).find(function(err,docs){
                dataObject.expenses = docs;
                res.json(dataObject);
            });
        });
    }
}
