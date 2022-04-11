const express = require('express');
const bodypaser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); 
const { response } = require('express');
const fileupload = require('express-fileupload')
const path = require('path');
const util = require('util');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload());


app.use(cors());
app.use(bodypaser.json());


////Database connection

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password:'',
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
    

    let qr = `select *  FROM applications `;
   
    
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


///Registration Form

app.post('/registrations', (req, res) =>{

    console.log(req.body,'LoadToRagistration');



    const {student_number,student_name,student_surname,student_gender,student_dob,student_email,student_cellno, participant_skills,student_faculty,specialization,student_level,student_campus,student_hobby} = req.body     
    //Filled Validation
    if(student_number == undefined||student_number==""||student_name==undefined||student_name==""||
    student_surname==undefined||student_surname==""||student_gender==undefined||student_gender==""||
    student_dob==undefined||student_dob==""||student_email==undefined||student_email==""||
    student_cellno==undefined||student_cellno==""||participant_skills==undefined||participant_skills==""||student_faculty==undefined||student_faculty==""||
    specialization==undefined||specialization==""||student_level==undefined||student_level==""||
    student_campus==undefined||student_campus==""||
    student_hobby==undefined||student_hobby==""){
        return res.json({message:"All fields are required!!!"});
    }else{
        //Email Validation
        let select_sql =`SELECT student_email from applications WHERE student_email = "${student_email}"`;
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
                    let insert_sql =`INSERT INTO applications( student_number,student_name,student_surname,student_gender,student_dob,student_email,student_cellno, participant_skills,student_faculty,specialization,student_level,student_campus,student_hobby)`
                                +   `\nVALUES("${student_number}","${student_name}", "${student_surname}", "${student_gender}","${student_dob}","${student_email}","${student_cellno}", "${participant_skills}","${student_faculty}","${specialization}","${student_level}","${student_campus}","${student_hobby}")`;
                    db.query(insert_sql,(err,result) =>{
                        if(err){
                            console.log(err,'errs');
                            res.json({Message:"Unable to capture application!!!"});
                            return;
                        }else{
                            let update_sql   = `UPDATE applications SET application_status='Panding!!!!'`;
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
                                to:JSON.stringify(student_email),
                                subject:'No reply :TVH Application',
                                text: ( 'You Have successfully applied  for TVH ' 
                                 +'\n participant Name : '+ student_name
                                +'\n participant Surname     : ' + student_surname
                                +'\n participant specialization     : ' + specialization
                                +'\n application status         : '+ 'Panding!!!' 
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


//Testing to upload pdf file

app.post("/upload", async (req, res) => {

	try{
	
	const file = req.files.file;
	const fileName = file.name;
	const size = file.data.length;
	const extension = path.extname(fileName);
	
	const allowedExtensions = /pdf|jpg|png/;
	
	if(!allowedExtensions.test(extension)) throw "Unsupported extension";
	if(size > 5000000) throw "File must be less than 5MB"
	
	const md5 = file.md5;
	const URL = "/uploads/" + md5 + extension;
	
	await util.promisify(file.mv)("./public" + URL);
	
	res.json({
	
		message: "File uploaded successfully",
	})
	
	
	}catch(err){
	
	console.log(err)
	res.status(500).json({
	
	message: err,
	
	});
	
	
	}


});
//////////end of pdf file upload


//2nd post pdf

app.post('/pdf', (req, res) =>{

    if(req.files){

        console.log(req.files)
        var file = req.files.file
        var filename = file.name
        console.log(filename)

        file.mv('./public/'+ filename, function(err){

            if(err){
                res.send(err)
            }else{

                res.send("file uploaded")
            }
        })
    }
})

//end


///send email test



//send email-end





app.listen(9002,() =>{

    console.log('server running....');
}); 
