const dataBase = require("../connection/dbh");
const express = require("express");
const router = express.Router();

router.post("/retrievePasssword", (req,res) =>{
    const{email} = req.body;
    if (email==undefined || email =="") {
        console.log("Enter email to get your password for!!!!");
        res.json({message:"Enter email to get password for"});
    }else{
        let select_sql =`SELECT password from users WHERE email = "${email}"`;
        dataBase.query(select_sql,(err,result) =>{
                if(err){
                    console.log('Email does not exist in the system!!!');
                    res.json({Message:"User email not found!!!!"});
                    return;
                }else{
                    if(result.length>0){
                        let pas = " " //this string returns the users password
                        
             
                        //code for parsing a value only 
                        let pas1 = JSON.stringify(result)
                        this.password1 = JSON.parse(pas1)
                        pas = this.password1[0].password;
                        console.log(pas);

                        let nodemailer = require('nodemailer');
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
                            subject:'No reply : TVH system password',
                            text: ( 'Your password is : ' + pas)
                        };

                        transporter.sendMail(message,function(err, info) {
                            if (err) {
                                console.log(err)
                              } else {
                                console.log(info);
                              }  
                        });
                        res.json({message:"User password sent via gmail✔✔✔"})
                        return;
                    }
                }
        });
    }
});

module.exports =router;