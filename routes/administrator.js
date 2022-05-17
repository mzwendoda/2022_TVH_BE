const dataBase = require("../connection/dbs");
const express = require("express");
const router = express.Router();

router.post("/login", (req,res) =>{
    const {admin_email,admin_password} = req.body;
    let select_sql = `SELECT admin_email, admin_password from administrator` 
    +              `\nWHERE admin_email = "${admin_email}" AND admin_password = "${admin_password}"`;

    dataBase.query(select_sql,(err,result)=>{
        if (admin_email == undefined||admin_email == "" ||admin_password==undefined||admin_password=="") {
           res.send({message:"All fields are required!!!"});
        }else{
            res.send({message:"Administrator has successfully logged In!!!"});
        }
    })
});

router.get("/viewRegistrations", (req,res) =>{
    let read_sql = `SELECT * FROM applications`;
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read data from the databse');
            res.send({Message:"Unable to read data!!!"});
            return;
        }else{
            res.send({message:"Registration data successfully fetched✔✔✔",data:result});
            return;
        }
       });
});

router.get("/viewRegistration/:id", (req,res) =>{
    let application_id = req.params.id;
    let read_sql = `Select * From applications Where application_id = "${application_id}"`;
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read data for the selected application!!!');
            res.send({Message:"Unable to Read data for the selected application!!!"});
            return;
        }else{
            res.send({message:"application data successfully fetched✔✔✔",data:result});
            return;
        }
       });
});

router.post("/createAnnouncement", (req,res) =>{
    const { announcement_name,announcement_body} = req.body;
    
    if(announcement_name == undefined||announcement_name==""||
    announcement_body==undefined||announcement_body==""){
            return res.json({message:"All fields are required!!!"});
        }else{
            let create_sql =`INSERT INTO announcements( announcement_name, announcement_body) VALUES ("${announcement_name}","${announcement_body}")`;
            dataBase.query(create_sql,(err,result) =>{
                if(err){
                    console.log(err,'errs');
                    res.send({Message:"Unable to create anouncement!!!"});
                        return;
                }else{
                    res.send({message:"Announcement created successfully✔✔✔"});
                        return;
                }
            });
        }
});

router.get("/readAnnouncements", (req,res) =>{
    let read_sql = "Select * From announcements";
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read data from the databse');
            res.send({Message:"Unable to read announcements!!!"});
            return;
        }else{
            res.send({message:"Announcement data successfully fetched✔✔✔",data:result});
            return;
        }
       });
});

router.get("/readAnnouncement/:id", (req,res) =>{
    let announcement_id = req.params.id;
    let read_sql = `Select * From announcements Where announcement_id = '${announcement_id}'`;
    dataBase.query(read_sql,(err,result) =>{
        if(err){
            console.log('Unable to Read data from the databse');
            res.send({Message:"Unable to read announcements!!!"});
            return;
        }else{
            res.send({message:"Announcement data successfully fetched✔✔✔",data:result});
            return;
        }
       });
});

router.put("/updateAnnouncement/:id", (req,res) =>{
    let announcement_id = req.params.id;
    const { announcement_name,announcement_body} = req.body;
    
    let update_sql   = `UPDATE announcements SET announcement_name='${announcement_name}',announcement_body='${announcement_body}' WHERE announcement_id='${announcement_id}'`;
    dataBase.query(update_sql,(err,result) =>{
        if(err){
            console.log(err,'Unable to update announcement information!!!');
            res.send({Message:"Unable to update announcement information!!!"});
            return;
        }else{
            res.send({message:"Announcement successfully Updated✔✔✔"});
            return;
        }
    });
});

router.delete("/deleteAnnouncement/:id", (req,res) =>{

    let announcement_id = req.params.id;
    let delete_sql = `DELETE FROM announcements WHERE announcement_id = '${announcement_id}'`;
            dataBase.query(delete_sql,(err,result) =>{
                if(err){
                    console.log(err,'Unable to delete announcement data!!!');
                    res.send({Message:"Unable to delete announcements!!!"});
                    return;
                }else{
                    res.send({message:"Announcement successfully deleted✔✔✔"});
                    return;
                }
            });
});

//Participants Routes
router.post("/addTeamMember", (req,res) =>{
    const { name,surname,occupation,category,description,image	} = req.body     
        //Filled Validation
        if(name == undefined||name==""||surname==undefined||surname==""||
        occupation==undefined||occupation==""||category==undefined||category==""||
        description==undefined||description==""||image==undefined||image==""){
            return res.json({message:"All fields are required!!!"});
        }else{
            //Inserting a user to users database
            let insert_sql =`INSERT INTO team( name,surname,occupation,category,description,image)`
            +            `\n VALUES ("${name}","${surname}", "${occupation}", "${category}","${description}","${image}")`;
            dataBase.query(insert_sql,(err,result) =>{
                if(err){
                 console.log(err,'errs');
                 res.json({Message:"Unable add team member Informatiom!!!"});
                 return;
                }else{
                    res.json({message:"Team member profile successfully✔✔✔"});
                    return; 
                }
            });
        }
    });

    router.get("/viewTeamMembers", (req,res) =>{
        let read_sql = `SELECT * FROM team`;
        dataBase.query(read_sql,(err,result) =>{
            if(err){
                console.log('error in the sql statement!!!');
                res.send({Message:"Unable to read data!!!"});
                return;
            }else{
                res.send({message:"Team member data successfully fetched✔✔✔",data:result});
                return;
            }
           });
    });
    
    router.get("/viewTeamMember/:id", (req,res) =>{
        let participant_id = req.params.id;
        let read_sql = `Select * From team Where p_id = "${participant_id}"`;
        dataBase.query(read_sql,(err,result) =>{
            if(err){
                console.log('error in the sql statement!!!!!!');
                res.send({Message:"Unable to Read data for the selected team member!!!"});
                return;
            }else{
                res.send({message:"Team member data successfully fetched✔✔✔",data:result});
                return;
            }
           });
    });

    router.delete("/deleteMember/:id",(req,res)=>{
        let member_id = req.params.id;
        let create_sql =`Insert Into deletedparticipants`
        +               `\nSelect * From team`
        +               `\nWhere p_id = '${member_id}'`;
        dataBase.query(create_sql,(err,result)=>{
            if (err) {
                console.log(err,"Unable to move data!!!");
                res.send({message:"Unable to move data!!!"});
                return;
            }else{
                let delete_sql = `Delete From team`
                +                `\nWhere p_id = '${member_id}'`;
                dataBase.query(delete_sql,(err,result)=>{
                    if (err) {
                        console.log(err,"Unable to delete data!!!");
                        res.send({message:"Unable to delete data!!!"});
                        return;
                    }else{
                        res.send({message:"Team Member Data successfully deleted✔✔✔"});
                        return;
                    }
                });
            }
        });
    });

    router.put("/updateMember/:id",(req,res)=>{
        let member_id = req.params.id;
        const { name,surname,occupation,category,description,image	} = req.body

        let update_sql = `Update team Set name ='${name}',surname = '${surname}'`
        +                `\n,occupation = '${occupation}',category = '${category}',description = '${description}',image = '${image}'`
        +                `\nWhere p_id = '${member_id}'`;
        dataBase.query(update_sql,(err,result)=>{
            if (err) {
                console.log(err,"Unable to update data!!!");
                res.send({message:"Unable to update data!!!"});
                return;
            }else{
                res.send({message:"Team Member Data successfully updated✔✔✔"});
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
                                    to:JSON.stringify(result),
                                    subject:'No reply :TVH Acceptance',
                                    text: ( 'You Have been successfully Accepted to participate in the TVH event' 
                                     +'\n\n Date and time will be communicated via this Email'
                                     +'\n\n Application status: ' + 'Accepted!!!'
                                     +'\n\n\n Once again thank you for paricipating in this year Event.')
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
                        console.log("Application rejected succefully✔✔✔");
    
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
                                    to:JSON.stringify(result),
                                    subject:'No reply :TVH Rejection',
                                    text: ( 'You Have been Rejected to participate in the TVH event' 
                                     +'\n\n Please apply next time'
                                     +'\n\n Application status: ' + 'Rejected!!!'
                                     +'\n\n\n Once again thank you for applying in this year Event.')
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
module.exports = router;