const dataBase = require("../connection/dbs");
const express = require("express");
const router = express.Router();

router.post("/register", (req,res) =>{
    const {student_name,student_surname,student_age,student_gender,student_number,student_email,student_cellno,student_faculty,specialization,student_level,student_campus,student_role} = req.body;
    let tutEmail = student_number+"@tut4life.ac.za";     
        //Filled Validation
        if(student_name==undefined||student_name==""||
        student_surname==undefined||student_surname==""||student_age==undefined||student_age==""||student_gender==undefined||student_gender==""||
        student_number == undefined||student_number==""||student_email==undefined||student_email==""||
        student_cellno==undefined||student_cellno==""||student_faculty==undefined||student_faculty==""||
        specialization==undefined||specialization==""||student_level==undefined||student_level==""||
        student_campus==undefined||student_campus==""||
        student_role==undefined||student_role==""){
            return res.send({message:"All fields are required!!!"});
        }else{
            if(student_email==tutEmail){
                let select_sql =`SELECT student_email from applications WHERE student_email = "${student_email}"`;
                dataBase.query(select_sql,(err,result)=>{
                    if (err) {
                        console.log(err,'errs');
                        res.send({Message:"Error in the SQL statement!!!!"});
                        return;
                    }else{
                        if (result.length>0) {
                            console.log('Email stored in the database!!!');
                            res.send({message:"Email already registered!!!"});
                            return;    
                        }else{
                            let insert_sql =`INSERT INTO applications( student_name,student_surname,student_age,student_gender,student_number,student_email,student_cellno,student_faculty,specialization,student_level,student_campus,student_role)`
                                    +   `\nVALUES("${student_name}","${student_surname}", "${student_age}","${student_gender}","${student_number}","${student_email}","${student_cellno}","${student_faculty}","${specialization}","${student_level}","${student_campus}","${student_role}")`;
                            dataBase.query(insert_sql,(err,result) =>{
                                if (err) {
                                    console.log(err,'errs');
                                    res.json({Message:"Error in the SQL statement!!!!"});
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
                                                    user: 'tshwanevirtualhackathon@gmail.com',
                                                    pass: 'Tvh@0152'
                                                },
                                                secureConnection: 'false',
                                                tls: {
                                                    ciphers: 'SSLv3',
                                                    rejectUnauthorized: false
                                                }
                                             }); 
                                 
                                            message ={

                                                from:'tshwanevirtualhackathon@gmail.com',
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
                            })    
                        }
                    }
                })
            }else{
                console.log('Email Not registered at TUT!!!');
                res.send({message:"Email not registered on tut4life!!!"});
                return; 
            }
        }
    });
    
module.exports = router;