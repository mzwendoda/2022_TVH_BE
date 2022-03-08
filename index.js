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
    database: 'user',
    port:3306
})

//connection check

db.connect(err =>{

    if(err) {console.log('err');}
    console.log('database connected..');
})


//get admin data




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



app.post('/login', (req, res) =>{

    console.log(req.body,'loginbox');

    let names = req.body.fullnam;
    let eml = req.body.emal;
    let pass = req.body.passw;

 
    let sql1 =`SELECT email, password, admin_name from admin WHERE email = "${eml}" AND password = "${pass}" AND admin_name = "${names}" `;

    
    db.query(sql1,(err,result) =>{

        
        if(err)
        {
            console.log(err,'errs');

            return
        }
        if(result.length >0)
        {
          
            res.send({

                message: 'Data found',
                data:result

            
            });
            return
            response.send("successfully login");
        }
        else{

            message:"Your details are incorrect"

            return
         
        }
        
    });
      return          
});



app.listen(9002,() =>{

    console.log('server running....');
}); 
