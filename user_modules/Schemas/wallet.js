const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    owner: String,
    name: String,
    type: {type: String, enum: ["one-time","daily","weekly","monthly"]},
    balance: Number,
    increment: Number,
    lastUpdated: Date
}, {versionKey: false});
