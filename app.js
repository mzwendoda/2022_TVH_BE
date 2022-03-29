const express = require("express");
const {sequelize, users} = require("./models"); // import models
const bodyparser = require("body-parser");
const dbconnection = require("./connection/db");
const user = require("./api/user");
const bcrypt = require("bcryptjs");
const path = require("path");
const cors = require("cors");

//dbconnection varification
dbconnection.authenticate()
.then(()=>
{
    console.log("Database connection sucessfully estamblished!!!");
}).catch((err)=>
{
    console.log("Database connection NOT estamblished!!!",err);
})

const app = express();
app.use(bodyparser.json());

// app.use("/",user);
app.unsubscribe(bodyparser.urlencoded(
    {
        extended:true
    }))

app.use(express.json());
app.use("/",user);
app.get("/", function (req, res) {
    res.json({message});
});



app.listen({port: 5005}, async() =>{
    // await sequelize.authenticate();
});