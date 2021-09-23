const db = require('../database/db');
const enkrip = require('bcrypt');

const generateAccesToken = require('../jwt/generateToken');

// Constructor
const User = function(user){
    this.username = user.username;
    this.email = user.email;
    this.nama = user.nama;
    this.password = user.password;
    this.level = user.level;
}

User.create =  (newUser, result) => {
    db.query(`SELECT * FROM users WHERE username = ? OR email = ?`, [
        newUser.username, newUser.email
    ], (err, res) => {

        if(res.length !== 0){
            result({kind: 'exists'}, null);
            return;

        } 
        db.query('INSERT INTO users SET ?', newUser, (err, res) => {
            if(err) {
                console.log(`Error : ${err}`);
                result(err, null);
                return;
            }
            let token = generateAccesToken({
                username: newUser.username,
                level: newUser.level
            })
            // console.log("User created :", {id: res.insertId, ...newUser});
            result(null, token);
        })
    })
}

User.findById = (userId, result) => {
    db.query(`SELECT * FROM users WHERE id = ${userId}`, (err, resp) => {
        if(err) {
            console.log(`Error : ${err}`);
            result(err, null)
        }
        if(resp.length){
            // console.log("Found user :", resp[0]);
            result(null, resp[0]);
            return;
        }

        // not found user
        result({kind: 'not_found'}, null)
    });
}

User.getAll = result => {
    db.query(`SELECT * FROM users`, (err, resp) => {
        if(err){
            console.log(`Error: ${err}`);
            result(err, null);
            return;
        }
        result(null, resp);
    })
}

User.updateById = (userId, user, result) => {
    db.query(`UPDATE users SET email = ?, nama = ?, password = ? WHERE id = ?`, 
    [user.email, user.nama, user.password, parseInt(userId)], (err, resp) => {
        if(err){
            console.log('Error :', err);
            result(err, null);
            return;
        }
        if(resp.affectedRows == 0){
            //not found customer with id
            result({kind: 'not_found'}, null);
            return;
        }
        console.log('User updated: ', {id: userId, ...user});
        result(null, {id: parseInt(userId), ...user});
    });
}

User.remove = (userId, result) => {
    db.query('DELETE FROM users WHERE id = ?', userId, (err, resp) => {
        if(err) {
            console.log('Error : ', err);
            result(err, null);
            return;
        }
        if(resp.affectedRows == 0){
            //not found user with the id
            result({kind : 'not_found'}, null);
            return;
        }
        console.log('Deleted user with id : ', userId);
        result(null, resp);
    })
}

User.removeAll = result => {
    db.query('DELETE FROM users', (err, resp) => {
        if(err){
            console.log('Error : ', err);
            result(err, null);
            return;
        }
        console.log(`Deleted ${resp.affectedRows} users`);
        result(null, resp);
    })
}

User.login = (data, result) => {
    try{

   db.query(`SELECT * FROM users WHERE username = ?`, 
    [data.username], (err, resp) => {
     
        if(!resp){
            result({kind: 'not_found'}, null);
            return;
        }
        const validPass = enkrip.compareSync(data.password, resp[0].password);
        
        if(!validPass){
            result({kind: 'not_auth'}, null)
            return;
        } 

        const token = generateAccesToken(data.username)
        result(null, {
            'token':token,
            'username': data.username
        });

        })
    }
    catch(e){
        result(e, null);
    }
}

module.exports = User;