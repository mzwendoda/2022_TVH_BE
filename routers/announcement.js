const dataBase = require("../connection/dbh");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

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
                    res.json({Message:"Unable to create anouncement!!!"});
                        return;
                }else{
                    res.json({message:"Announcement created successfully✔✔✔"});
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
            res.json({Message:"Unable to read announcements!!!"});
            return;
        }else{
            res.json({message:"Announcement data successfully fetched✔✔✔",data:result});
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
            res.json({Message:"Unable to read announcements!!!"});
            return;
        }else{
            res.json({message:"Announcement data successfully fetched✔✔✔",data:result});
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
            res.json({Message:"Unable to update announcement information!!!"});
            return;
        }else{
            res.json({message:"Announcement successfully Updated✔✔✔"});
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
                    res.json({Message:"Unable to delete announcements!!!"});
                    return;
                }else{
                    res.json({message:"Announcement successfully deleted✔✔✔"});
                    return;
                }
            });
});
module.exports = router;