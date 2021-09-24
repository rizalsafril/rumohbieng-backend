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
    password varchar(250) not null,
    level varchar(50) not null
)`;

const tableProducts = `create table if not exists products(
    id int primary key auto_increment,
    product_name varchar(250) null,
    product_type varchar(50) null,
    price varchar(20),
    stock varchar(20) null,
    notes text null
)`;


const tableCategory = `create table if not exists categories(
    id int primary key auto_increment,
    product_id int not null,
    categ_name varchar(100) null,
    service_fee varchar(20) null,
    index(product_id),
    foreign key(product_id) references products(id)
    on update cascade on delete cascade
)`;


const tableCustomer = `create table if not exists customers(
    id int primary key auto_increment,
    cust_name varchar(100) null,
    notes varchar(200) null
)`;

const tableBilling = `create table if not exists billings(
    id int primary key auto_increment,
    user_id int not null,
    cust_id int not null,
    category_id int not null,
    
    index(user_id),
    index(cust_id),
    index(category_id),
    
    foreign key(user_id) references users(id) on update cascade on delete cascade,
    foreign key(cust_id) references customers(id) on update cascade on delete cascade,
    foreign key(category_id) references categories(id) on update cascade on delete cascade
)`;


const tableHistory = `create table if not exists history(
    id int primary key auto_increment,
    user_id int not null,
    category_id int not null,
    time datetime default null,
    
    index(user_id),
    index(category_id),
    
    foreign key(user_id) references users(id) on update cascade on delete cascade,
    foreign key(category_id) references categories(id) on update cascade on delete cascade
)`;

const tableShifts = `create table if not exists shifts(
    id int primary key auto_increment,
    user_id int not null,
    checkin datetime default null,
    checkout datetime default null,
    revenue varchar(20) null,

    index(user_id),
    foreign key(user_id) references users(id) on delete cascade on update cascade
)`;

//Open Connection
db.connect(error => {
    if(error) throw error;
    console.log('Connected to DB...')
    
    db.query(tableUser, (err, res) => {
        if(err) throw err;
        console.log('Tabel user created..');
    });

    db.query(tableProducts, (err, res) => {
        if(err) throw err;
        console.log('Tabel Products created..');
    });

    db.query(tableCategory, (err, res) => {
        if(err) throw err;
        console.log('Tabel Category created..');
    });

    db.query(tableCustomer, (err, res) => {
        if(err) throw err;
        console.log('Tabel Customer created..');
    });

    db.query(tableBilling, (err, res) => {
        if(err) throw err;
        console.log('Tabel Billing created..');
    });

    db.query(tableHistory, (err, res) => {
        if(err) throw err;
        console.log('Tabel History created..');
    });

    db.query(tableShifts, (err, res) => {
        if(err) throw err;
        console.log('Tabel Shifts created..');
    })
    
});
// db.end(err => {
//     if(err) throw err;
//     console.log('Closing database');
// })

module.exports = db;