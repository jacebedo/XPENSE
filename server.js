var express = require("express");
var app = express();
var mongoose = require("mongoose");

// Export server application for testing
module.exports = app;

// Used to connect and disconnect to the database.
var database = require("./user_modules/database.js");
var userSchema = require("./user_modules/Schemas/user.js");

var User = mongoose.model("User",userSchema);


app.use(express.static("public",{ index: "main.html" }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.post("/users/register", function(req,res,next){
    // Check if user exists in the database
    var db = database.connect();
    User.findOne({username:req.body.username},{ password: 0, _id: 0,},function(err,doc){

        if (doc == null){
            var newUser = new User(req.body);
            newUser.save(function(err,doc){
                res.redirect("/");
                database.disconnect(db);
            });
        } else {
            res.json(doc);
            database.disconnect(db);
        }
    });

});

// Delete after production!
app.delete("/users/delete/:username",function(req,res,next){
    var db = database.connect();
    User.deleteOne({username: req.params.username},function(err,result){
        if (err) {
            throw err;
            res.status(404);
        }
        res.send("OK");
        database.disconnect(db);
    });
});

var port = process.env.PORT | 3000;
app.listen(port,function(err){
    if (err){
        throw err;
    }
    console.log("Application is now listening on port: ", port);
});
