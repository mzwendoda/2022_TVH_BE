const dataBase = require("../connection/dbh");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/acceptParticipant/:id", (req,res) =>{
    let participant_id = req.params.id;
    let read_sql = `Select * From participants`
                +`\n Where participant_id = '${participant_id}'`;
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read participant data from the databse');
            res.json({Message:"Unable to read participant data announcements!!!"});
            return;
        }else{
            let insert_sql = `Insert Into acceptedparticipants (accepted_name,accepted_surname,accepted_gender,accepted_dob,accepted_email,accepted_record,accepted_cellno,accepted_skill)`
                          +`\n Select pName,pSurname,pGender,pDob,pemail,pRecord,pCellNo,pSkill `
                          +`\n From participants`
                          +`\n Where participant_id = ${participant_id}`;
            dataBase.query(insert_sql,(err,result)=>{
                if (err) {
                    console.log(err,"Error with sql code!!!");
                    res.json({message:"Sql error!!!"});
                }else{
                    console.log("Participant accepted succefully");

                    let select_sql = `Select pemail From participants`
                            +`\n  Where participant_id = "${participant_id}"`;
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
                                 +'\n Date and time will be communicated via this Email'
                                 +'\n Once again thank you for paricipating in this year Event💻💻🖥💻')
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

module.exports = router;