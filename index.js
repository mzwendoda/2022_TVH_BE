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

app.get('/adminLoadFile', (_req, _res) =>{
    

    let qr = `select COUNT(fullName)  FROM application `;
    var names = [];
    const counts:any;
    db.query(qr, (err, result) => {

        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length >0)
        { 
            counts = result.length;

            while (counts >0){

                let qr = `select surname  FROM application WHERE id = ${counts} `;
                db.query(qr, (_err, _result) => {


                    if(err)
                    {
                        console.log(err,'errs');
                    }
                    if(result.length >0)
                    { 
                        names[i] = _result ;
                        console.log(names[i]);
                        
                    }

                 // show data
                //console.log(names);

            
                ///names.push(i);
    

                

                });

                counts++;
            }
           
            

  
        }
    });


    
});

*/


//get all data from database to front

app.get('/adminLoadFile', (_req, _res) =>{
    

    let qr = `select *  FROM application `;
   
    
    db.query(qr, (err, result) => {

        if(err)
        {
            console.log(err,'errs');
        }
        if(result.length >0)
        { 
           
                
                      
            _res.send({

                message: 'data retrieved ',
                data:result

            
            });
            return
                

                
        }else{

         
            _res.send({

                message: 'Not retieved'
                

            
            });
            return
         
        }
           
            

  
        }
    );

});

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

app.post('/registrations', (req, res) =>{


    

    ///let sql2 = "SELECT emailAddress from application";


    // if( sql2 ==stEmail)
    // {

    //     res.send({

    //         message: 'Email already exist',
    //         data:result

        
    //     });


    // }
    
    
    console.log(req.body,'LoadToRagistration');

    let fullName = req.body.fullName;
    let surname = req.body.surname;
    let gender = req.body.gender;
    let dateOfBirth = req.body.dateOfBirth;
    let emailAddress = req.body.emailAddress;
    let institution = req.body.institution;
    let academicRecord = req.body.academicRecord;
    let mobileNumber = req.body.mobileNumber;
    let skills = req.body.skills;
   
    


 
    let sql1 =`INSERT INTO application( fullName,surname, gender, dateOfBirth, emailAddress, institution, academicRecord, mobileNumber, skills) VALUES ("${fullName}","${surname}", "${gender}", "${dateOfBirth}","${emailAddress}","${institution}","${academicRecord}","${mobileNumber}","${skills}") `;

    
    db.query(sql1,(err,result) =>{

        
        if(err)
        {
            console.log(err,'errs');

            return
        }
        else{

                        res.send({

                message: 'Application Successfully submited',
                data:result

            
            });
            return

        }      

         
        
    });
     
       
});


////signup

app.post("/signUp", (req,res) =>{
    const { firstName, lastName,emailAddress,password} = req.body     
        //Filled Validation
        if(firstName == undefined||firstName==""||lastName==undefined||lastName==""||
        emailAddress==undefined||emailAddress==""||password==undefined||password==""){
            return res.json({message:"All fields are required!!!"});
       
        }
        else{
                //Email Validation
                let select_sql =`SELECT emailAddress from users_account WHERE emailAddress = "${emailAddress}"`;
                dataBase.query(select_sql,(err,result) =>{
                    if(err){
                        console.log(err,'errs');
                        res.json({Message:"Problem with table!!!!"});
                        return;
                        }else{
                            if(result.length>0)
                            {
                                console.log('Email stored in the databse!!!');
                                res.json({message:"Email already signed up!!!"});
                                return;
                            }else{
                                dataBase.password = bcrypt.hashSync(req.body.password, 8); 
                                dataBase.passcorn = bcrypt.hashSync(req.body.password, 8);
                                //Inserting a user to users database
                                let insert_sql =`INSERT INTO users( firstName, lastName, emailAddress, password) VALUES ("${firstName}","${lastName}", "${emailAddress}", "${password}")`;
                                       dataBase.query(insert_sql,(err,result) =>{
                                        if(err){
                                            console.log(err,'errs');
                                            res.json({Message:"Unable to signup!!!"});
                                            return;
                                        }else{
                                            res.json({message:"User signed Up successfully✔✔✔"});
                                            return;
                                        }
                                       });                                         
                            }
                        }
                });    
             }

        
    });


/////Login?user

app.get("/userLogin", (req,res) =>{
    const{emailAddress, password} = req.body;
    
        let select_sql =`SELECT emailAddress ,password from users_account WHERE email = "${emailAddress}" and password ="${password}`;
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



app.listen(9002,() =>{

    console.log('server running....');
}); 
