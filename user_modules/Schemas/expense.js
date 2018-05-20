const Schema = require('mongoose').Schema;


module.exports = new Schema({
    owner: String,
    name: String,
    price: Number,
    type: String,
    wallet: String,
    date: Date,
},{versionKey: false});
