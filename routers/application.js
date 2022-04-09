const dataBase = require("../connection/dbh");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


router.post("/apply", (req,res) =>{
    const {student_number,student_name,student_surname,student_gender,student_dob,student_email,student_cellno,student_faculty,specialization,student_level,student_campus,student_hobby} = req.body     
        //Filled Validation
        if(student_number == undefined||student_number==""||student_name==undefined||student_name==""||
        student_surname==undefined||student_surname==""||student_gender==undefined||student_gender==""||
        student_dob==undefined||student_dob==""||student_email==undefined||student_email==""||
        student_cellno==undefined||student_cellno==""||student_faculty==undefined||student_faculty==""||
        specialization==undefined||specialization==""||student_level==undefined||student_level==""||
        student_campus==undefined||student_campus==""||
        student_hobby==undefined||student_hobby==""){
            return res.json({message:"All fields are required!!!"});
        }else{
            //Email Validation
            let select_sql =`SELECT student_email from applications WHERE student_email = "${student_email}"`;
            dataBase.query(select_sql,(err,result) =>{
                if(err){
                    console.log(err,'errs');
                    res.json({Message:"Problem with table!!!!"});
                    return;
                }else{
                    if(result.length>0){
                        console.log('Email stored in the databse!!!');
                        res.json({message:"Email already signed up!!!"});
                        return;
                    }else{
                        let insert_sql =`INSERT INTO applications( student_number,student_name,student_surname,student_gender,student_dob,student_email,student_cellno,student_faculty,specialization,student_level,student_campus,student_hobby)`
                                    +   `\nVALUES("${student_number}","${student_name}", "${student_surname}", "${student_gender}","${student_dob}","${student_email}","${student_cellno}","${student_faculty}","${specialization}","${student_level}","${student_campus}","${student_hobby}")`;
                        dataBase.query(insert_sql,(err,result) =>{
                            if(err){
                                console.log(err,'errs');
                                res.json({Message:"Unable to capture application!!!"});
                                return;
                            }else{
                                let update_sql   = `UPDATE applications SET application_status='Panding!!!!'`;
                                dataBase.query(update_sql,(err,result) =>{
                                    if(err){
                                        console.log('Unable to update application status!!!');
                                        res.json({Message:"Unable to update!!!"});
                                        return;
                                    }else{
                                        res.json({message:"Application successfully captured✔✔✔"});
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
                                    to:JSON.stringify(student_email),
                                    subject:'No reply :TVH Application',
                                    text: ( 'You Have successfully applied  for TVH ' 
                                     +'\n participant Name : '+ student_name
                                    +'\n participant Surname     : ' + student_surname
                                    +'\n participant specialization     : ' + specialization
                                    +'\n application status         : '+ 'Panding!!!' 
                                    +'\n\n\n If your application is succesfull you will hear from us,' 
                                    +'\n if not please apply next time')
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

                                return;
                            }  
                        });                                         
                    }
                }
            });    
             

        }
    });
    
    module.exports = router;