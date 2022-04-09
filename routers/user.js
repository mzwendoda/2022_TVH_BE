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
                                //Inserting a user to users database
                                let insert_sql =`INSERT INTO users( name, surname, email, password, passcorn) VALUES ("${name}","${surname}", "${email}", "${password}","${passcorn}")`;
                                       dataBase.query(insert_sql,(err,result) =>{
                                        if(err){
                                            console.log(err,'errs');
                                            res.json({Message:"Unable to signup!!!"});
                                            return;
                                        }else{
                                            res.json({message:"User signed Up successfully✔✔✔"});
                                            
                                            
                                            var nodemailer = require('nodemailer');
                                            let tvhSignIn = "http://localhost:4200/signin";
                                        let transporter = nodemailer.createTransport({
                                            service:'gmail',
                                            host: 'smtp.gmail.com',
                                            port:'587',
                                            auth:{
                                                user: 'gunman4435@gmail.com',
                                                pass: 'Mthethwa@4435'
                                            },
                                            secureConnection: 'false',
                                            tls: {
                                                ciphers: 'SSLv3',
                                                rejectUnauthorized: false
                                            }
                                    }); 
                                 
                                    message ={

                                    from:'gunman4435@gmail.com',
                                    to:JSON.stringify(email),
                                    subject:'No reply :TVH Application',
                                    text: ( 'User signed Up successfully✔✔✔  for TVH ' 
                                    +'\n\nUser Name      : '+ name
                                    +'\n  User Surname   : '+ surname
                                    +'\n  User Email     : '+ email
                                    +'\n\n  Click her to sign in to TVH website    : '+ tvhSignIn 
                                    +'\n\n\n Once again thank you for signing up in this year Event💻💻🖥💻,')
                                };

                                transporter.sendMail(message,function(err, info) {
                                    if (err) {
                                        console.log(err)
                                      } else {
                                        console.log(info);
                                      }   
                                });
                                            
                                            return;
                                        }
                                       });                                         
                            }
                        }
                });    
             }

        }
    });

    router.post("/signIn", (req,res) =>{
        const{email, password} = req.body;
        
            let select_sql =`SELECT email,password from users WHERE email = "${email}" and password ="${password}`;
            dataBase.query(select_sql,(err,result) =>{
                    if(err){
                        console.log('Wrong password or Email!!!!');
                        res.json({Message:"User unable to signIn(email/password is Incorrect)!!!!"});
                        return;
                    }else{
                        if(result.length>0){
                            res.json({message:"User sucessfully signed In✔✔✔"});
                            return;
                        }
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


module.exports = router;