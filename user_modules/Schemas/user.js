const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = new Schema({
    username: String,
    password: String,
    fname: String,
    lname: String,
    bday: Date,
    email: String

}, {versionKey: false} );
