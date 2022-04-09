const express = require('express');
const bodypaser = require('body-parser');
const User = require('./routers/user');
const Announcement = require("./routers/announcement");
const Application = require("./routers/application");
const Administrator = require("./routers/administrator");
const Forgotpassword = require("./routers/forgotpassword");
const app = express();

app.use(bodypaser.json());
app.unsubscribe(bodypaser.urlencoded({extended:false}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();    
  });

app.use("/",User);
app.use("/",Announcement);
app.use("/",Application);
app.use("/",Administrator);
app.use("/",Forgotpassword);
app.use('/', function(res, res){
    res.send("App Running👌👌👌(PostMan check routers)")
});

app.listen(9500,()=>{
    console.log("Express server Up and Running in port 9500....");
});