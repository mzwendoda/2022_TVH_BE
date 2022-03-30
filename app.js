const express = require("express");
const bodyparser = require("body-parser");
const dbconnection = require("./connection/db");
const user = require("./router/user");
const app = express();

//dbconnection varification
dbconnection.authenticate()
.then(()=>
{
    console.log("Database connection sucessfully estamblished!!!");
}).catch((err)=>
{
    console.log("Database connection NOT estamblished!!!",err);
})

app.use(bodyparser.json());
app.unsubscribe(bodyparser.urlencoded({
        extended:true
    }))

//Calling The Routers
app.use("/",user);

app.get('/', function (req, res) {
    res.send("App Running👌👌👌");
});

//lisignig port
app.listen({port: 5005}, async() =>{
    // await sequelize.authenticate();
});