const mysql = require("mysql");

const dataBase = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password:'',
    database: 'tvh_dbh',
    port:3306
})

//connection check

dataBase.connect(err =>{

    if(err){
      console.log('err');
    }else{
      console.log('database connected..');
    }
});

module.exports = dataBase;