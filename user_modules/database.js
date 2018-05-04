const url = "mongodb://admin:1234@ds014658.mlab.com:14658/xpense_testing";
const mongoose = require("mongoose");

module.exports.connect = function(){

    mongoose.connect(url);
    var db = mongoose.connection;

    db.on("error",function(err){
        throw err;
    });

    db.once('open',function(){
        return db;
    });
};

module.exports.disconnect = function(db) {
    if (db != null || db != undefined) {
        db.close();
    }
}
