const { response } = require('express');
const db = require('../database/db');

const Billings = function(item){
    this.user_id = item.user_id;
    this.cust_id = item.cust_id;
    this.category_id = item.category_id;
    this.addon_id = item.addon_id;
}

Billings.create = (data, result) => {
    try{
        db.query('INSERT INTO billings SET user_id = ?, cust_id = ?, category_id = ?, addon_id = ?',[
            data.user_id, data.cust_id, data.category_id, data.addon_id
        ], (err, res) => {
            if(err){
                result(err, null);
                return;
            }
    
            result(null, {id: res.insertId, ...res});
        })
    }catch(err){
        result(err, null);
    }
}

Billings.updateById = (id, data, result) => {
    try{
        db.query('UPDATE billings set user_id = ?, cust_id = ?, category_id = ?, addon_id=? where id = ?', [
            data.user_id, data.cust_id, data.category_id, data.addon_id, id
        ], (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            if(res.affectedRows === 0){
                result({kind: 'not_found'}, null);
                return;
            }
            result(null, {id: id, ...data});
        })
    }catch(err){
        result(err, null);
    }
}


Billings.removeOne = (id, result) => {
    try{
        db.query('DELETE FROM billings where id = ?', id, (err, res) => {
            if(err){
                result(err, null);
                return;
            } 
            if(res.affectedRows === 0){
                result({kind: 'not_found'}, null);
                return;
            }
            result(null, res);
        })
    }catch(err){
        result(err, null);
    }
}


Billings.removeAll = result => {
    try{
        db.query('DELETE FROM billings', (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            result(null, res);
        })
    }catch(err){
        result(err, null);
    }
}

Billings.findAll = result => {
    try{
        db.query('SELECT * FROM billings', (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            result(null, res);
        })
    }catch(err){
        result(err, null);
    }
}

Billings.findOne = (id, result) => {
    try{
        db.query('SELECT * FROM billings WHERE id =?', id, (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            if(res.affectedRows ===0){
                result({kind: 'not_found'}, null);
                return;
            }
            else result(null, resp[0]);
        })
    }catch(err){
        result(err, null);
    }
}

module.exports = Billings;