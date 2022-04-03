const dataBase = require("../connection/dbh");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//Signup API
// Create new user
router.post("/signUp", (req,res) =>{
    const { name, surname,email,password, passcorn} = req.body     
        //Filled Validation
        if(name == undefined||name==""||surname==undefined||surname==""||
        email==undefined||email==""||password==undefined||password==""){
            return res.json({message:"All fields are required!!!"});
        }else{
            //Password Validation
            if (password!==passcorn) {
                return res.json({message:"Password does not match!!!"});
             }else{
                //Email Validation
                let select_sql =`SELECT email from users WHERE email = "${email}"`;
                dataBase.query(select_sql,(err,result) =>{
                    if(err){
                        console.log(err,'errs');
                        res.json({Message:"Problem with table!!!!"});
                        return;
                        }else{
                            if(result.length>0)
                            {
                                console.log('Email stored in the databse!!!');
                                res.json({message:"Email already signed up!!!"});
                                return;
                            }else{
                                dataBase.password = bcrypt.hashSync(req.body.password, 8); 
                                dataBase.passcorn = bcrypt.hashSync(req.body.password, 8);
                                //Inserting a user to users database
                                let insert_sql =`INSERT INTO users( name, surname, email, password, passcorn) VALUES ("${name}","${surname}", "${email}", "${dataBase.password}","${dataBase.passcorn}")`;
                                       dataBase.query(insert_sql,(err,result) =>{
                                        if(err){
                                            console.log(err,'errs');
                                            res.json({Message:"Unable to signup!!!"});
                                            return;
                                        }else{
                                            res.json({message:"User signed Up successfully✔✔✔"});
                                            return;
                                        }
                                       });                                         
                            }
                        }
                });    
             }

        }
    });

    //Fetch users
router.get("/viewUsers", (req,res) =>{
    let read_sql = "Select * From users";
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read data from the databse');
            res.json({Message:"Unable to read data!!!"});
            return;
        }else{
            res.json({message:"users data successfully fetched✔✔✔",data:result});
            return;
        }
       });
});

//Fetch a user
router.get("/viewUser/:id", (req,res) =>{
    let id = req.params.id;
    let read_sql = `Select * From users Where id = "${id}"`;
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read data for the selected user!!!');
            res.json({Message:"Unable to Read data for the selected user!!!"});
            return;
        }else{
            res.json({message:"User data successfully fetched✔✔✔",data:result});
            return;
        }
       });
});

//Updating data for a user
router.put("/updateUser/:id", (req,res) =>{
    const { name, surname,email,password, passcorn} = req.body   
        //Filled Validation
        if(name == undefined||name==""||surname==undefined||surname==""||
        email==undefined||email==""||password==undefined||password==""){
            return res.json({message:"All fields are required!!!"});
        }else{
            //Password Validation
            if (password!==passcorn) {
                return res.json({message:"Password does not match!!!"});
             }else{
                //Email Validation
                let select_sql =`SELECT email from users WHERE email = "${email}"`;
                dataBase.query(select_sql,(err,result) =>{
                    if(err){
                        console.log(err,'Select statement not running!!!');
                        res.json({Message:"Error in select statement!!!!"});
                        return;
                        }else{
                            if(result.length>0)
                            {
                                console.log('Email stored in the databse!!!');
                                res.json({message:"Email already signed up!!!"});
                                return;
                            }else{
                                dataBase.password = bcrypt.hashSync(req.body.password, 8); 
                                dataBase.passcorn = bcrypt.hashSync(req.body.password, 8);
                                //update a user from users database
                                let id = req.params.id;
                                let update_sql   = `UPDATE users SET name='${name}',surname='${surname}',email='${email}',password='${dataBase.password}',passcorn='${dataBase.passcorn}' WHERE id = '${id}'`;
                                       dataBase.query(update_sql,(err,result) =>{
                                        if(err){
                                            console.log('Unable to update user data!!!');
                                            res.json({Message:"Unable to update!!!"});
                                            return;
                                        }else{
                                            res.json({message:"User successfully Updated✔✔✔"});
                                            return;
                                        }
                                       });
                            }
                        }
                });    
             }

        }
});

//Delete user
router.delete("/deleteUser/:id",(req,res) =>{
    let id = req.params.participant_id;
    const { name, surname,email} = req.body; 
    dataBase.password = bcrypt.hashSync(req.body.password, 8);
    dataBase.passcorn = bcrypt.hashSync(req.body.password, 8);
    let create_sql = `INSERT INTO deletedusers( name, surname, email, password, passcorn) VALUES ("${name}","${surname}", "${email}", "${dataBase.password}","${dataBase.passcorn}")`;
    dataBase.query(create_sql,(err,result) =>{
        if(err){
            console.log(err,'Unable to delete user data!!!');
            res.json({Message:"Unable to delete!!!"});
            return;
        }else{
            let delete_sql = `DELETE  FROM users WHERE id = "${id}"`;
            dataBase.query(delete_sql,(err,result) =>{
                if(err){
                    console.log(err,'Unable to delete user data!!!');
                    res.json({Message:"Unable to delete!!!"});
                    return;
                }else{
                    res.json({message:"User successfully deleted✔✔✔"});
                    return;
                }
            });
        }
       });
});
module.exports = router;