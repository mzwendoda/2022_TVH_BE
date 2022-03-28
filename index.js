const express = require('express');
const bodypaser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); 
const { response } = require('express');

const app = express();


app.use(cors());
app.use(bodypaser.json());


////Database connection

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password:'',
    database: 'tvhweb',
    port:3306
})

//connection check

db.connect(err =>{

    if(err) {console.log('err');}
    console.log('database connected..');
})


//get admin data


/*

app.get('/admin', (req, res) =>{
    

    let qr = 'select email, password, admin_name FROM admin ';
    db.query(qr, (err, result) => {

        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length >0)
        {
            res.send({

                message: 'loged in',
                data:result
            });

          
        }
    });


    
});
*/


app.post('/login', (req, res) =>{

    console.log(req.body,'loginbox');

 
    let eml = req.body.emal;
    let pass = req.body.passw;

 
    let sql1 =`SELECT email, password from admin WHERE email = "${eml}" AND password = "${pass}" `;

    
    db.query(sql1,(err,result) =>{

        
        if(err)
        {
            console.log(err,'errs');

            return
        }
        if(result.length >0)
        {
          
            res.send({

                message: 'login Successful',
                data:result

            
            });
            return
            
        }
        else{

         
            res.send({

                message: 'Please enter the correct data'
                

            
            });
            return
         
        }
        
    });
      return  

       
});

/*
app.post('/notice', (req, res) =>{

    console.log(req.body,'LoadToNotice');

    let input = req.body.fullnam;


 
    let sql1 =`SELECT noticeMessage from admin WHERE email = "${eml}" AND password = "${pass}" AND admin_name = "${names}" `;

    
    db.query(sql1,(err,result) =>{

        
        if(err)
        {
            console.log(err,'errs');

            return
        }
        if(result.length >0)
        {
          
            res.send({

                message: 'login Successful',
                data:result

            
            });
            return
            
        }
        else{

         
            res.send({

                message: 'Please enter the correct data'
                

            
            });
            return
         
        }
        
    });
      return  

       
});

*/

app.post('/registration', (req, res) =>{

    console.log(req.body,'LoadToRagistration');

    let names = req.body.fullnam;
    let surname = req.body.surname;
    let gender = req.body.gender;
    let dateBirth = req.body.dateBirth;
    let stEmail = req.body.stEmail;
    let password = req.body.password;
    let institute = req.body.institute;
    let proof = req.body.proof;
    let mNumber = req.body.mNumber;
    let skills = req.body.skills;
    let stat = req.body.stat;
    


 
    let sql1 =`INSERT INTO application( fullName,surname, gender, dateOfBirth, emailAddress, institution, academicRecord, mobileNumber, skills) VALUES ("${names}","${surname}", "${gender}", "${dateBirth}","${stEmail}","${institute}","${proof}","${mNumber}","${skills}") `;

    
    db.query(sql1,(err,result) =>{

        
        if(err)
        {
            console.log(err,'errs');

            return
        }
/*
        if(result.length >0)
        {
          
            res.send({

                message: 'Application Successfully submited',
                data:result

            
            });
            return
            
        }

        */
        

         
            res.send({

                message: 'Application Successfully submited',
                data:result

            
            });
            return
         
        
    });
      return  

       
});



app.listen(9002,() =>{

    console.log('server running....');
}); 
