const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    fname: String,
    lname: String,
    bday: Date,
    email: String
    // To-do: Add wallet and expense feature to user schema

}, {versionKey: false} );

module.exports = function(){
    var User = mongoose.model("User",userSchema);
    console.log(User);
    return mongoose.model("User",userSchema);
}
