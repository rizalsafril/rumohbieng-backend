const { response } = require('express');
const db = require('../database/db');

// Constructor
const Addons = function(item){
    this.addon_name = item.addon_name;
    this.price = item.price
}

Addons.create = (data, result) => {
    try{
        db.query('INSERT INTO addons SET ?', data, (err, res) => {
            if(err){
                result(err, null);
                return;
            } 
            result(null, {id: res.insertId, ...data});
        })
    }catch(err){
        result(err, null);
    }
}

Addons.findAll = result => {
    try{
        db.query('SELECT * FROM addons', (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            result(null, res);
        });
    }catch(err){
        result(err, null);
    }
}

Addons.findById = (data, result) => {
    try{
        db.query(`SELECT * FROM addons WHERE id = ${data}`, (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            if(res.length){
                result(null, res[0]);
                return;
            }

            result({kind: 'not_found'}, null);
        });
    }catch(err){
        result(err, null);
    }
}

Addons.change = (id, data, result) => {
    try{
        db.query('UPDATE addons SET addon_name = ?, price = ? WHERE id = ?', [data.addon_name, data.price, id], (err, res) => {
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


Addons.removeOne = (id, result) => {
    db.query('DELETE FROM addons WHERE id = ?', id, (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        if(res.affectedRows === 0) {
            result({kind: 'not_found'}, null);
            return;
        }
        result(null, res);
    });
}

Addons.removeAll = result => {
    db.query('DELETE FROM addons', (err, res) => {
        if(err){
            result(err, null);
        }
        result(null, res);
    });
}

module.exports = Addons;