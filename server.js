const express = require("express");
const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const validateUser = require("./user_modules/verify.js");
const sendAllData = require("./user_modules/sendAllData.js");
// Export server application for testing
module.exports = app;

// Used to connect and disconnect to the database.
const database = require("./user_modules/database.js");
const userSchema = require("./user_modules/Schemas/user.js");
const walletSchema = require("./user_modules/Schemas/wallet.js");
const expenseSchema = require("./user_modules/Schemas/expense.js");

const User = mongoose.model("User",userSchema);
const Wallet = mongoose.model("Wallet",walletSchema);
const Expense = mongoose.model("Expense",expenseSchema);

app.use(express.static("public",{ index: "login.html" }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: "childish_gambino-is-batman",
    cookie: {maxAge: 24 * 60 * 1000}
}));


app.post("/users/register", function(req,res,next){
    // Check if user exists in the database
    var db = database.connect();
    User.findOne({username:req.body.username},{ password: 0, _id: 0,},function(err,doc){

        if (doc == null){
            if (validateUser(req.body)){
                var newUser = new User(req.body);
                newUser.save(function(err,doc){
                    res.json(null);
                    database.disconnect(db);
                });
            } else {
                res.status(404).end();
            }

        } else {
            res.json(doc);
            database.disconnect(db);
        }
    });

});

app.post("/users/login", function(req,res,next){
    var db = database.connect();
    User.findOne({username:req.body.username}, function(err,doc){
        if (err) {
            res.status(404);
        }
        if (doc == null){
            // User does not exist in the database
            res.json(null);
            database.disconnect(db);
        }
        else {
            if (doc.username == req.body.username && doc.password == req.body.password){
                req.session.user = doc;

                req.session.user.AUTH = 1;
                res.setHeader("AUTH","1");
                res.json({redirectURL: "/profile.html"});
                database.disconnect(db);
            }
            else {
                // Bad Password
                res.json(null);
                database.disconnect(db);
            }
        }
    });
});

app.post("/users/addwallet/me", function(req,res,next){
    if (req.session.user != undefined) {
        var newWallet = new Wallet({
            owner: req.session.user._id,
            name: req.body.name,
            type: req.body.type,
            balance: req.body.balance,
            increment: req.body.increment,
            lastUpdated: req.body.lastUpdated
        });
        var db = database.connect();
        newWallet.save(function(err,doc){
            if (err) {throw err;}
            next();
            database.disconnect(db);
        });
    } else {
      res.status(412).end();
    }
},sendAllData);

app.post("/users/addexpense/me",function(req,res,next){
    if (req.session.user != undefined){
        var newExpense = new Expense({
            owner: req.session.user._id,
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
            wallet: req.body.wallet,
            date: req.body.date
        });
        var db = database.connect();
        newExpense.save(function(err,doc){
            if (err) throw err;
            Wallet.findOneAndUpdate({name: doc.wallet}, { $inc: { balance: -1 * parseFloat(doc.price) }, $set: { lastUpdated: new Date()} },function(err,doc){
                next();
                database.disconnect(db);
            });
        });
    } else {
      res.status(412).end();
    }
},sendAllData);

app.get("/users/getdata/me",sendAllData);

app.get("/users/wallet/getInformation/:name",function(req,res,next){
    if (req.session.user != undefined){
        var dataObject = {};
        Wallet.findOne({owner: req.session.user._id, name: req.params.name.trim()}, function(err,doc){
            dataObject.information = doc;
            Expense.find({owner: req.session.user._id, wallet: req.params.name.trim()})
                   .sort({'date': 'descending'})
                   .limit(5)
                   .exec(function(err,docs){
                       dataObject.expenses = docs;
                       res.json(dataObject);
            });

        });
    }
});

app.post("/users/wallet/updateBalance",function(req,res,next){
    if (req.session.user != undefined){
        var dataObject = {};
        Wallet.updateOne({owner: req.session.user._id, name: req.body.wallet},
                         { $inc: { "balance": req.body.balance }, $set: { "lastUpdated": new Date() }},
                          function(err,doc){
                              sendAllData(req,res,next);
                          });
    }
});

// Delete after production!
app.delete("/users/delete/:username",function(req,res,next){
    var db = database.connect();
    User.deleteOne({username: req.params.username},function(err,result){
        if (err) {
            throw err;
            res.status(404).end();
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
