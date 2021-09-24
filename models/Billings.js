const { response } = require('express');
const db = require('../database/db');

const Billings = function(item){
    this.user_id = item.user_id;
    this.cust_id = item.cust_id;
    this.category_id = item.category_id;
}

Billings.create = (data, result) => {
    db.query('INSERT INTO billings SET ?',data, (err, res) => {
        if(err){
            result(err, null);
            return;
        }

        result(null, {id: res.insertId, ...data});
    })
}

Billings.updateById = (id, data, result) => {
    db.query('UPDATE billings SET user_id = ?, cust_id = ?, category_id = ? where id = ?', [
        data.user_id, data.cust_id, data.category_id, id
    ], (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        if(res.affectedRows === 0){
            result({kind: 'not_found'}, null);
            return;
        }
        result(null, {id: parsetInt(id), ...data});
    })
}


Billings.removeOne = (id, result) => {
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
}


Billings.removeAll = result => {
    db.query('DELETE FROM billings', (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        if(res.affectedRows === 0){
            result({kind: 'not_found'}, null);
        }
        result(null, res);
    })
}

Billings.findAll = result => {
    db.query('SELECT users.id, users.nama, customers.cust_name, categories.service_fee,'+
    'products.product_name FROM billings LEFT JOIN users ON billings.user_id=users.id '+
    'LEFT JOIN customers ON billings.cust_id=customers.id '+
    'LEFT JOIN categories ON billings.category_id=categories.id '+ 
    'LEFT JOIN products ON categories.product_id=products.id',
    (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    })
}

Billings.findOne = (id, result) => {
    db.query('SELECT * FROM billings WHERE id = ?', [id], (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        else result(null, res[0]);
    });
}

module.exports = Billings;