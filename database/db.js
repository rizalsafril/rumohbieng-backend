const mysql = require('mysql');
const dbConfig = require('./db.config');

// Create a connection
const db = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
})

// Create Tabel to mysql server
const tableUser = `create table if not exists users(
    id int primary key auto_increment,
    username varchar(100) not null,
    nama varchar(200) null,
    email varchar(200) not null,
    password varchar(250) not null
)`;

//Open Connection
db.connect(error => {
    if(error) throw error;
    console.log('Connected to DB...')
    
    db.query(tableUser, (err, res) => {
        if(err) throw err;
        console.log('Tabel user created..');
    })
    
});
// db.end(err => {
//     if(err) throw err;
//     console.log('Closing database');
// })

module.exports = db;