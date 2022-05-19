const express = require('express');
const multer = require('multer');
const bodypaser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); 
const { response } = require('express');
const fileupload = require('express-fileupload')
const path = require('path');
const util = require('util');
const upload = multer({dest: './public/uploads'});
const fs = require("fs");
const http = require("http");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload());


app.use(cors());
app.use(bodypaser.json());

app.use(express.static('public'))
app.use('/public/uploads',express.static('public/uploads'))


////Database connection

const db = mysql.createConnection({

    host: 'db-tvh2022-inst.cvqpj5ith2h1.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password:'tvh2022icep',
    database: 'tvhdb',
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


////Admin login

app.post('/login', (req, res) =>{

    console.log(req.body,'loginbox');

 
    let admin_email = req.body.admin_email;
    let admin_password = req.body.admin_password;

 
    let sql1 =`SELECT admin_email, admin_password from administrator WHERE admin_email = "${admin_email}" AND admin_password = "${admin_password}" `;

    
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


///Post notice to the database

app.post('/notice', (req, res) =>{

    console.log(req.body,'LoadToNotice');

    let title = req.body.title;
    let message = req.body.message;
    let date = req.body.date;


 
    let sql1 =`INSERT INTO  announcement (title, message, date) VALUES ("${title}", "${message}" , "${date}")`;

    
    db.query(sql1,(err,result) =>{

        
        if(err)
        {
            console.log(err,'errs');

            return
        }
        if(result.length > 0)
        {

            
          
            res.send({

                message: 'Notice updated successfully',
                data:result

            
            });
            return
            
        }
        else{

         
            res.send({

                message: 'An error occured notice not updated'
                

            
            });
            return
         
        }
        
    });
      return  

       
});





//get all data from database to notice

app.get('/noticeLoadFile', (_req, _res) =>{
    

    let qr = `select *  FROM announcement `;
   
    
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




///Registration Form

app.post('/registrations', (req, res) =>{

    console.log(req.body,'LoadToRagistration');



    const {stud_number,name,surname,gender,age,stud_email,faculty, mobile_number,skills,level,specialization,campus} = req.body     
    //Filled Validation


    let tutEmail = stud_number+"@tut4life.ac.za";    

    if(stud_number == undefined||stud_number==""||name==undefined||name==""||
    surname==undefined||surname==""||gender==undefined||gender==""||
    age==undefined||age==""||stud_email==undefined||stud_email==""||
    faculty==undefined||faculty==""||mobile_number==undefined||mobile_number==""||skills==undefined||skills==""||
    level==undefined||level==""||specialization==undefined||specialization==""||
    campus==undefined||campus==""){
        return res.json({message:"All fields are required!!!"});
    }else{
        //Email Validation

    if(stud_email==tutEmail)
    {


        let select_sql =`SELECT stud_email from application WHERE stud_email = "${stud_email}"`;
        db.query(select_sql,(err,result) =>{
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
                    let insert_sql =`INSERT INTO application( stud_number,name,surname,gender,age,stud_email,faculty, mobile_number,skills,level,specialization,campus)`
                                +   `\nVALUES("${stud_number}","${name}", "${surname}", "${gender}","${age}","${stud_email}","${faculty}", "${mobile_number}","${skills}","${level}","${specialization}","${campus}")`;
                    db.query(insert_sql,(err,result) =>{
                        if(err){
                            console.log(err,'errs');
                            res.json({Message:"Unable to capture application!!!"});
                            return;
                        }else{
                            let update_sql   = `UPDATE application SET status='Pending...'`;
                            db.query(update_sql,(err,result) =>{
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
                                to:JSON.stringify(stud_email),
                                subject:'No reply :TVH Application',
                                text: ( 'You Have successfully applied  for TVH ' 
                                 +'\n participant Name : '+ name
                                +'\n participant Surname     : ' + surname
                                +'\n participant specialization     : ' + specialization
                                +'\n application status         : '+ 'Pending!!!' 
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
                    });                                         
                }
            }
        });   


    }
    else
    {
        res.json({message:"Please enter your tut4life email"});

    }
 
         

    }





    
   

  

       
});


////signup

app.post("/signUp", (req,res) =>{



    console.log(req.body,'signup');
    const { name, surname,email,password} = req.body     
        //Filled Validation
        if(name == undefined||name==""||surname==undefined||surname==""||
        email==undefined||email==""||password==undefined||password==""){
            return res.json({message:"All fields are required!!!"});
       
        }
        else{
                //Email Validation
                let select_sql =`SELECT email FROM users WHERE email = "${email}" `;
                db.query(select_sql,(err,result) =>{
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
                                //db.password = bcrypt.hashSync(req.body.password, 8); 
                               // db.passcorn = bcrypt.hashSync(req.body.password, 8);
                                //Inserting a user to users database
                                let insert_sql =`INSERT INTO users( name, surname, email, password) VALUES ("${name}","${surname}", "${email}", "${password}")`;
                                       db.query(insert_sql,(err,result) =>{
                                        if(err){
                                            console.log(err,'errs');
                                            res.json({Message:"Unable to signup!!!"});
                                            return;
                                        }else{
                                            res.json({message:"User signed Up successfully✔✔✔"});
                                            var nodemailer = require('nodemailer');
                                            let link;
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

                                             link = "http://localhost:4200/user-login";
                                     
                                        message ={
        
                                        from:'gunman4435@gmail.com',
                                        to:JSON.stringify(email),
                                        subject:'No reply :TVH Account',
                                        text: ( 'Thank you for creating the account ' 
                                         +'\n user Name : '+ name
                                        +'\n user Surname     : ' + surname),
                                        html: "Please Click the following link to confirm your password " + link
                                    };
        
                                    transporter.sendMail(message,function(err, info) {
                                        if (err) {
                                            console.log(err)
                                          } else {
                                            console.log(info);
                                          }   
                                    });
                                         let isVerified = false;

                                            return;
                                        }
                                       });                                         
                            }
                        }
                });    
             }

        
    });


/////Login?user

app.post("/userLogin", (req,res) =>{


    console.log(req.body,'UserLogin');
    const{email, password} = req.body;
    
        let select_sql =`SELECT email ,password FROM users WHERE email = "${email}" AND password ="${password}"`;
        db.query(select_sql,(err,result) =>{
                if(err){
                    console.log('Wrong password or Email!!!!');
                    res.json({Message:"User unable to signIn(email/password is Incorrect)!!!!"});
                    return;
                }else{
                    if(result.length>0){
                        res.json({message:"User sucessfully signed In✔✔✔"});
                        return;
                    }
                    else
                    {

                        res.send({

                            message: 'Please check your email or password is incorrect',
                            data:result
            
                        
                        });
                        return
                        
                    }
                }
        });    
    
});

//----------------------------------------------Start_UploadFile---------------------------------------------------------------//


///Insert to teams

app.post('/uploadTeam', async(req, res) =>{


    let name = req.body.name;
    let surname = req.body.surname;
    let occupation = req.body.occupation;
    let catagory = req.body.catagory;
    let description = req.body.description;


    const file = req.files.file;
	const fileName = file.name;
	const size = file.data.length;
	const extension = path.extname(fileName);
	
	const allowedExtensions = /jpg|png/;
	
	if(!allowedExtensions.test(extension))
    {
        res.send({

            message: 'Unsupported extension '
            
        });
    } 
	if(size > 5000000)
    {
        res.send({

            message: 'File must be less than 5MB '
            
        });
    } 
	
	const md5 = file.md5;
	const URL = "/uploads/" + md5 + extension;
    await util.promisify(file.mv)("./public" + URL);

    let sql = `INSERT INTO team (name, surname, occupation, catagory, description, file) VALUES("${name}", "${surname}", "${occupation}", "${catagory}", "${description}", "${"http://localhost:9002/public"+URL}" )`;

    db.query(sql,(err,result) =>{

        
        if(err)
        {
            console.log(err,'errs');

            // return
        }else
        {
            res.send({

                message: 'Team updated successfully',
                data:result

            
            });
            //  return
     
        }

        
    });
    //    return  
    
})

///-----------------------------------------------Ending_UploadFile------------------------------------------------------------------///





//----------------------------------------------Start_RetrieveTeamFile---------------------------------------------------------------//


app.get("/selectOrganiser",  (_req, _res) => {


 
    

    let sql = `Select * From team Where catagory = "Leading Organizing Team"`;

    db.query(sql, async(err,result) =>{

    if(err)
    {
        console.log(err,'errs');

        return
    }
    if(result.length > 0)
    {
        _res.send({

            message: 'Leading Organizing Team data retrieved ',
            data:result

        
        });
        return

    }
    else
    {
        _res.send({

            message: 'Leading Organizing Team data  not found ',
            

        
        });
        return
    }


})

})

//////////////////

app.get("/selectVolunteer", (_req, _res) => {



    

    let sql = `Select * From team Where catagory = "Industry Volunteer"`;

    db.query(sql, async(err,result) =>{

     
    if(err)
    {
        console.log(err,'errs');

        return
    }
    if(result.length > 0)
    {

        _res.send({

            message: 'Industry Volunteer data retrieved ',
            data:result

        
        });
        return

    }
    else
    {
        _res.send({

            message: 'Industry Volunteer data  not found ',
            

        
        });
        return
    }


})

})

//////////////////

app.get("/selectMentor",(_req, _res) => {



    

    let sql = `Select * From team Where catagory = "Mentor"`;

    db.query(sql, async(err,result) =>{

       
    if(err)
    {
        console.log(err,'errs');

        return
    }
    if(result.length > 0)
    {

        _res.send({

            message: 'Mentor data retrieved ',
            data:result

        
        });
        return

    }
    else
    {
        _res.send({

            message: 'Mentor data  not found ',
            

        
        });
        return
    }


})

})

//////////////////

app.get("/selectOrgTeam", (_req, _res) => {



    

    let sql = `Select * From team Where catagory = "Organizing Team"`;

    db.query(sql, async(err,result) =>{

       
    if(err)
    {
        console.log(err,'errs');

        return
    }
    if(result.length > 0)
    {

        _res.send({

            message: 'Organizing Team data retrieved ',
            data:result

        
        });
        return

    }
    else
    {
        _res.send({

            message: 'Organizing Team data not found ',
            

        
        });
        return

    }


})

return
})


//----------------------------------------------End_RetrieveTeamFile---------------------------------------------------------------//


///-------------------------------------Retrieve all teams----------------------------------------------------------//



app.get("/selectTeam", (_req, _res) => {



    

    let sql = `Select * From team`;

    db.query(sql, async(err,result) =>{

       
    if(err)
    {
        console.log(err,'errs');

        return
    }
    if(result.length > 0)
    {

        _res.send({

            message: 'Team data retrieved ',
            data:result

        
        });
        return

    }
    else
    {
        _res.send({

            message: 'Team data not found ',
            

        
        });
        return

    }


})

return
})

///--------------------------------------End retrieve team----------------------------------------------------------------//

///--------------------------------------Delete_Team------------------------------------------------------------------------///

app.delete("/deleteMember/:id",(req,res)=>{
    let id = req.params.id;
    let create_sql =`Insert Into deletedparticipants`
    +               `\nSelect * From team`
    +               `\nWhere id = '${id}'`;
    dataBase.query(create_sql,(err,result)=>{
        if (err) {
            console.log(err,"Unable to move data!!!");
            res.send({message:"Unable to move data!!!"});
            return;
        }else{
            let delete_sql = `Delete From team`
            +                `\nWhere id = '${id}'`;
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

///--------------------------------------End_Delete_Team-------------------------------------------------------------------///


///-------------------------------------Edit_Team--------------------------------------------------------------------------///

app.put("/updateMember/:id",(req,res)=>{
    let id = req.params.id;
    const { name,surname,occupation,category,description,file	} = req.body

    let update_sql = `Update team Set name ='${name}',surname = '${surname}'`
    +                `\n,occupation = '${occupation}',category = '${category}',description = '${description}',file = '${file}'`
    +                `\nWhere id = '${id}'`;
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


app.get("/viewTeamMember/:id", (req,res) =>{
    let id = req.params.id;
    let read_sql = `Select * From team Where p_id = "${id}"`;
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


////------------------------------------End_Edit_Time-----------------------------------------------------------------------//



app.listen(9002,() =>{

    console.log('server running....');
}); 
