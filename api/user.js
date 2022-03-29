const express = require("express");
const router = express.Router();
const passport = require("passport");
// const {sequelize, user} = require('../models/user'); // import models
const dbconnection = require("../connection/db");
const bcrypt = require("bcryptjs");
const webToken = require("jsonwebtoken");
const User = require('../models/user');
const app = express();


//Signup API
// Create new user
router.post("/signup", (req,res) =>{
    const { name, surname, email, password, passcorn} = req.body
   
   

         //Validating all filleds
    if (name == undefined||name==""||surname==undefined||surname==""||
    email==undefined||email==""||password==undefined||password=="") {
        return res.json({message:"All fields are required!!!"});       
        
    }else{
        //password check
        if (password!==passcorn) {
            return res.json({message:"Password does not match!!!"});
            
        
         }else{
            //email check
            User.findOne({
            where: {
              email: req.body.email
            } 
          }).then(err => {
            if(err){
              res.json({message:"Fail -> Email is already Signed up!!!"});
              return;
            }else{
                try{
                    const user =  User.create({name, surname,email, password: bcrypt.hashSync(req.body.password, 8),passcorn: bcrypt.hashSync(req.body.password, 8)});
                    return res.json({message:"User Registered Sucessfully!!!"});
                }catch(err){
                    return res.status(500).json(err);
                }
            }
          });       
        }    
    }
});
//Fetch users
router.get("/display", async(req,res) =>{
    try{
        const users = await User.findAll();
        return res.json(users);
    }catch(err){
        return res.status(500).json({err: "An error occured"});
    }
});

//Update user
router.put("/update/:id", async(req,res) =>{
    const id = req.params.id;
    const { name, surname, email, password, passcorn} = req.body;
    const users = await User.findOne({
        where: {id}
    });
        //All fields check
        users.name = name;
        users.surname = surname;
        if (name == undefined||name==""||surname==undefined||surname==""||
        email==undefined||email==""||password==undefined||password=="") {
            return res.json({message:"All fields are required!!!"});
        }else{
            //password check
            if (password!==passcorn) {
                return res.json({message:"Password does not match!!!"});
             }else{
                //email check
                if (users.email == req.body.email) {
                    return res.json({message:"Email Already Taken/Signed Up🚀🚀🚀"})
                }else{
                    try{
                        users.password = bcrypt.hashSync(req.body.password, 8);
                        users.passcorn = bcrypt.hashSync(req.body.password, 8); 
                        users.save();
                        return res.json({message:"User Updated Sucessfully👌👌👌"});
                
                    }catch(err){
                        return res.status(500).json({err: "An error occured"});
                    }
                }
               
             }
        }
        
});


// //Delete user
// app.delete("/users/:id", async(req,res) =>{
//     const id = req.params.id;
//     try{
//         const user = await users.findOne({
//             where: {id}
//         });
//         await user.destroy();
//         return res.json({message: "User Deleted"});
//     }catch(err){
//         return res.status(500).json({err: "An error occured"});
//     }
// });
module.exports = router;
