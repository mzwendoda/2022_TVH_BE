const dataBase = require("../connection/dbh");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/viewApplications", (req,res) =>{
    let read_sql = `SELECT * FROM applications`;
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read data from the databse');
            res.json({Message:"Unable to read data!!!"});
            return;
        }else{
            res.json({message:"Applications data successfully fetched✔✔✔",data:result});
            return;
        }
       });
});

router.get("/viewApplication/:id", (req,res) =>{
    let application_id = req.params.id;
    let read_sql = `Select * From applications Where application_id = "${application_id}"`;
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read data for the selected application!!!');
            res.json({Message:"Unable to Read data for the selected application!!!"});
            return;
        }else{
            res.json({message:"application data successfully fetched✔✔✔",data:result});
            return;
        }
       });
});

router.get("/acceptApplication/:id", (req,res) =>{
    let application_id = req.params.id;
    let read_sql = `Select * From applications`
                +`\n Where application_id = '${application_id}'`;
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read participant data from the databse');
            res.json({Message:"Unable to read participant data announcements!!!"});
            return;
        }else{
            let update_sql   = `UPDATE applications SET application_status='Accepted!!!!'`;
            dataBase.query(update_sql,(err,result)=>{
                if (err) {
                    console.log(err,"Error with sql code!!!");
                    res.json({message:"Sql error!!!"});
                }else{
                    console.log("Application accepted succefully");

                    let select_sql = `Select student_email From applications`
                            +`\n  Where application_id = "${application_id}"`;
                    dataBase.query(select_sql,(err,result)=>{
                        if (err) {
                            console.log("Unable to read email!!!");
                            res.json({message:"Unable to send email!!!"});
                        }else{
                            var nodemailer = require('nodemailer');
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
                                to:JSON.stringify(result),
                                subject:'No reply :TVH Application',
                                text: ( 'You Have been successfully Accepted to participate in the TVH event' 
                                 +'\n\n Date and time will be communicated via this Email'
                                 +'\n\n Application status: ' + 'Accepted!!!'
                                 +'\n\n\n Once again thank you for paricipating in this year Event💻💻🖥💻')
                            };

                            transporter.sendMail(message,function(err, info) {
                                if (err) {
                                    console.log(err)
                                  } else {
                                    console.log(info);
                                  }  
                            });
                            res.json({message:"Acceptance Email Sent✔✔✔"});
                        }
                    })
                }
            })
            
            return;
        }
       });
});


router.get("/rejectApplication/:id", (req,res) =>{
    let application_id = req.params.id;
    let read_sql = `Select * From applications`
                +`\n Where application_id = '${application_id}'`;
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read application data from the database');
            res.json({Message:"Unable to read application data announcements!!!"});
            return;
        }else{
            let update_sql   = `UPDATE applications SET application_status='Rejected!!!!'`;
            dataBase.query(update_sql,(err,result)=>{
                if (err) {
                    console.log(err,"Error with sql code!!!");
                    res.json({message:"Sql error!!!"});
                }else{
                    console.log("Application accepted succefully✔✔✔");

                    let select_sql = `Select student_email From applications`
                            +`\n  Where application_id = "${application_id}"`;
                    dataBase.query(select_sql,(err,result)=>{
                        if (err) {
                            console.log("Unable to read email!!!");
                            res.json({message:"Unable to send email!!!"});
                        }else{
                            var nodemailer = require('nodemailer');
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
                                to:JSON.stringify(result),
                                subject:'No reply :TVH Application',
                                text: ( 'You Have been Rejected to participate in the TVH event' 
                                 +'\n\n Please apply next time💻💻'
                                 +'\n\n Application status: ' + 'Rejected!!!'
                                 +'\n\n\n Once again thank you for applying in this year Event💻💻🖥💻')
                            };

                            transporter.sendMail(message,function(err, info) {
                                if (err) {
                                    console.log(err)
                                  } else {
                                    console.log(info);
                                  }  
                            });
                            res.json({message:"Rejection Email Sent✔✔✔"});
                        }
                    })
                }
            })
            
            return;
        }
       });
});

//Delete user
router.delete("/deleteApplication/:id",(req,res) =>{
    let application_id = req.params.id; 
    let create_sql = `INSERT INTO deletedapplications`
    +               ` Select * From applications`
    +               ` Where application_id = ${application_id}`;
    dataBase.query(create_sql,(err,result) =>{
        if(err){
            console.log(err,'Unable to delete application data!!!');
            res.json({Message:"Unable to delete!!!"});
            return;
        }else{
            let delete_sql = `DELETE  FROM applications WHERE application_id = "${application_id}"`;
            dataBase.query(delete_sql,(err,result) =>{
                if(err){
                    console.log(err,'Unable to delete application data!!!');
                    res.json({Message:"Unable to delete application data!!!"});
                    return;
                }else{
                    res.json({message:"Application data successfully deleted✔✔✔"});
                    return;
                }
            });
        }
       });
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

//Delete user
router.delete("/deleteUser/:id",(req,res) =>{
    let user_id = req.params.id;
    
    let create_sql = `INSERT INTO deletedusers`
    +               ` Select * From users`
    +               ` Where id = ${user_id}`;
    dataBase.query(create_sql,(err,result) =>{
        if(err){
            console.log(err,'Unable to delete user data!!!');
            res.json({Message:"Unable to delete!!!"});
            return;
        }else{
            let delete_sql = `DELETE  FROM users WHERE id = "${user_id}"`;
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