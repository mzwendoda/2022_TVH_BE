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
    const { pImage,pName,pRole,pDescription} = req.body     
        //Filled Validation
        if(pImage == undefined||pImage==""||pName==undefined||pName==""||
        pRole==undefined||pRole==""||pDescription==undefined||pDescription==""){
            return res.json({message:"All fields are required!!!"});
        }else{
            //Inserting a user to users database
            let insert_sql =`INSERT INTO participants( pImage,pName,pRole,pDescription)`
            +            `\n VALUES ("${pImage}","${pName}", "${pRole}", "${pDescription}")`;
            dataBase.query(insert_sql,(err,result) =>{
                if(err){
                 console.log(err,'errs');
                 res.json({Message:"Unable add participant Informatiom!!!"});
                 return;
                }else{
                    res.json({message:"Participant profile successfully✔✔✔"});
                    return; 
                }
            });
        }
    });

    router.get("/viewTeamMembers", (req,res) =>{
        let read_sql = `SELECT * FROM participants`;
        dataBase.query(read_sql,(err,result) =>{
            if(err){
                console.log('error in the sql statement!!!');
                res.send({Message:"Unable to read data!!!"});
                return;
            }else{
                res.send({message:"Participants data successfully fetched✔✔✔",data:result});
                return;
            }
           });
    });
    
    router.get("/viewTeamMember/:id", (req,res) =>{
        let participant_id = req.params.id;
        let read_sql = `Select * From participants Where p_id = "${participant_id}"`;
        dataBase.query(read_sql,(err,result) =>{
            if(err){
                console.log('error in the sql statement!!!!!!');
                res.send({Message:"Unable to Read data for the selected participant!!!"});
                return;
            }else{
                res.send({message:"Participant data successfully fetched✔✔✔",data:result});
                return;
            }
           });
    });

module.exports = router;