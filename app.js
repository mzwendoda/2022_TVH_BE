const express = require('express');
const bodypaser = require('body-parser');
const signUp = require('./routers/signUp');
const signIn = require("./routers/signIn");
const Announcement = require("./routers/annoucement");
const app = express();

app.use(bodypaser.json());
app.unsubscribe(bodypaser.urlencoded({extended:false}));

app.use("/",signUp);
app.use("/",signIn);
app.use("/",Announcement);
app.use('/', function(res, res){
    res.send("App Running👌👌👌(PostMan check routers)")
});

app.listen(9500,()=>{
    console.log("Express server Up and Running in port 9500....");
});
