const dataBase = require("../connection/dbh");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");


router.post("/apply", (req,res) =>{
    const {pName,pSurname,pGender,pDob,pemail,pRecord,pCellNo,pSkill} = req.body     
        //Filled Validation
        if(pName == undefined||pName==""||pSurname==undefined||pSurname==""||
        pGender==undefined||pGender==""||pDob==undefined||pDob==""||
        pemail==undefined||pemail==""||pRecord==undefined||pRecord==""||pCellNo==undefined||pCellNo==""||
        pSkill==undefined||pSkill==""){
            return res.json({message:"All fields are required!!!"});
        }else{
            //Email Validation
            let select_sql =`SELECT pemail from participants WHERE pemail = "${pemail}"`;
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
                        // dataBase.password = bcrypt.hashSync(req.body.password, 8); 
                        // dataBase.passcorn = bcrypt.hashSync(req.body.password, 8);
                        //Inserting a user to users database
                        let insert_sql =`INSERT INTO participants( pName,pSurname,pGender,pDob,pemail,pRecord,pCellNo,pSkill) VALUES("${pName}","${pSurname}", "${pGender}", "${pDob}","${pemail}","${pRecord}","${pCellNo}","${pSkill}")`;
                        dataBase.query(insert_sql,(err,result) =>{
                            if(err){
                                console.log(err,'errs');
                                res.json({Message:"Unable to capture application!!!"});
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
                                    to:JSON.stringify(pemail),
                                    subject:'No reply :TVH Application',
                                    text: ( 'You Have successfully applied  for TVH ' 
                                     +'\n participant Name : '+ pName
                                    +'\n participant Surname     : ' + pSurname
                                    +'\n participant Skill     : ' + pSkill 
                                    +'\n\n\n If your application is succesfull you will hear from use,' 
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
                    }
                }
            });    
             

        }
    });

    router.get("/viewRegistration", (req,res) =>{
        let read_sql = "Select * From participants";
        dataBase.query(read_sql,(err,result) =>{
            if(err){
                console.log('Unable to Read data from the databse');
                res.json({Message:"Unable to read data!!!"});
                return;
            }else{
                res.json({message:"Registration data successfully fetched✔✔✔",data:result});
                return;
            }
           });
    });
   
    //Delete user
    router.delete("/deleteRegistration/:id",(req,res) =>{
        let participant_id = req.params.id;
        const { pName,pSurname,pGender,pDob,pemail,pRecord,pCellNo,pSkill} = req.body; 
        let create_sql = `INSERT INTO deleteparticipants( pName,pSurname,pGender,pDob,pemail,pRecord,pCellNo,pSkill) VALUES ("${pName}","${pSurname}", "${pGender}", "${pDob}","${pemail}","${pRecord}","${pCellNo}","${pSkill}")`;
        dataBase.query(create_sql,(err,result) =>{
            if(err){
                console.log(err,'Unable to delete registration data!!!');
                res.json({Message:"Unable to delete!!!"});
                return;
            }else{
                let delete_sql = `DELETE  FROM participants WHERE participant_id = "${participant_id}"`;
                dataBase.query(delete_sql,(err,result) =>{
                    if(err){
                        console.log(err,'Unable to delete registration data!!!');
                        res.json({Message:"Unable to delete!!!"});
                        return;
                    }else{
                        res.json({message:"Registration successfully deleted✔✔✔"});
                        return;
                    }
                });
            }
           });
    });
    module.exports = router;