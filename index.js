const express = require('express');
const bodypaser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); 
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });


const app = express();


app.use(cors());

urlEncodedParser = app.use(bodypaser.json());



////Database connection

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password:'',
    database: 'tvh_dbh',
    port:3306
})

//connection check

db.connect(err =>{

    if(err) {console.log('err');}
    console.log('database connected..');
})


app.post('/registration', (req, res) =>{
    console.log(req.body);

  
  let first_last_name = req.body.first_last_name;
  let gender = req.body.gender;
  let birth_date = req.body.birth_date;
  let student_mail = req.body.student_mail;
  let institution = req.body.institution;
  let registration_proof = req.body.registration_proof;
  let mobile_number = req.body.mobile_number;
  let programing_skills = req.body.programing_skills;
  let applicant_status =req.body.applicant_status;
  let information_source = req.body.information_source;
  let participant_id = req.body.participant_id;

    let qr = `INSERT INTO application ( first_last_name, gender, birth_date, student_mail, institution, registration_proof, mobile_number, programing_skills, applicant_status, information_source, participant_id)
     VALUES ("${first_last_name}","${gender}","${birth_date}","${student_mail}","${institution}","${registration_proof}","${mobile_number}","${programing_skills}","${applicant_status}","${information_source}","${participant_id}")`;
    db.query(qr,(err,result)=>
    {
        if(err){console.log(err);}
        console.log(result,"result")
        res.send(
            {
                message:"Data Captured..."
            });
      
    } );
});





app.listen(9500,() =>{

    console.log('server running....On port:9500');
}); 