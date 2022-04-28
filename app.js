const express = require('express');
const bodypaser = require('body-parser');
const app = express();
const Register = require("./routes/register");
const Administrator = require("./routes/administrator");

app.use(bodypaser.json());
app.unsubscribe(bodypaser.urlencoded({extended:false}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();    
  });

app.use("/",Register);
app.use("/",Administrator);
app.use('/', function(res, res){
    res.send("App Running👌👌👌(PostMan check routers)")
});

app.listen(9500,()=>{
    console.log("Express server Up and Running in port 9500....");
});