const express = require('express');
const bodypaser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); 

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
    

    let qr = 'select email, password, admin_name FROM admin WHERE email = "sanele@gmail.com" AND password ="sanele" AND admin_name = "Mzwe" ';
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





app.listen(9002,() =>{

    console.log('server running....');
}); 
