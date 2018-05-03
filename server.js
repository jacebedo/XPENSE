var express = require("express");
var app = express();



app.use(express.static("public",{ index: "main.html" }));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


var port = process.env.PORT | 3000
app.listen(port,function(err){
    if (err){
        throw err;
    }
    console.log("Application is now listening on port: ", port);
});
