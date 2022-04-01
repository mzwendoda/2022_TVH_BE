const dataBase = require("../connection/dbh");
const express = require("express");
const router = express.Router();

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
module.exports = router;