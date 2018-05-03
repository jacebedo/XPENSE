var express = require("express");
var app = express();

var mongoose = require("mongoose");

// Used to connect and disconnect to the database.
var database = require("./user_modules/database.js");
var User = require("./user_modules/Schemas/user.js");

app.use(express.static("public",{ index: "main.html" }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.post("/users/register", function(req,res,next){
    // // Check if user already exists
    // var db = database.connect();
    // var newUser = new User(req.body);
    // newUser.save(function(err,doc){
    //     res.json(doc);
    //     database.disconnect(db);
    // });
    // // If exists, do something
    // // If it doesn't, register the user.
});

var port = process.env.PORT | 3000;
app.listen(port,function(err){
    if (err){
        throw err;
    }
    console.log("Application is now listening on port: ", port);
});
