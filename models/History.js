const db = require('../database/db');

const History = function(item){
    this.user_id = item.user_id;
    this.cust_id = item.cust_id;
    this.category_id = item.category_id;
}

History.create = (data, result) => {
    db.query('INSERT INTO history SET ?', data, (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...data});
    })
}


History.update = (id, data, result) => {
    db.query('UPDATE history set user_id = ?, cust_id = ?, category_id = ? WHERE id = ?', [
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
        result(null, {id: parseInt(id), ...data});
    });
}

History.removeOne = (id, result) => {
    db.query('DELETE FROM history WHERE id = ?', id, (err, res) => {
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

History.removeAll = result => {
    db.query('DELETE FROM history', (err, res) => {
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

History.findOne = (id, result) => {
    db.query('SELECT history.id, users.id as userid, users.nama as operator, customers.cust_name,'+ 
    'categories.service_fee, products.product_name, history.time '+
    'FROM history LEFT JOIN users ON history.user_id=users.id '+
    'LEFT JOIN customers ON history.cust_id=customers.id '+
    'LEFT JOIN categories ON history.category_id=categories.id '+ 
    'LEFT JOIN products ON categories.product_id=products.id WHERE history.id = ?', [id], (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        if(res.length === 0){
            result({kind: 'not_found'}, null);
            return;
        }

        result(null, res[0]);
    })
}

History.findAll = result => {
    db.query('SELECT history.id, users.id as userid, users.nama as operator, customers.cust_name, categories.service_fee,'+
    'products.product_name, history.time FROM history LEFT JOIN users ON history.user_id=users.id '+
    'LEFT JOIN customers ON history.cust_id=customers.id '+
    'LEFT JOIN categories ON history.category_id=categories.id '+ 
    'LEFT JOIN products ON categories.product_id=products.id', (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    })
}

module.exports = History;