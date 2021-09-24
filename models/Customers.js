const db = require('../database/db');

const Customer = function(item){
    this.cust_name = item.cust_name;
    this.notes = item.notes;
}

Customer.create = (data, result) => {
    db.query('SELECT * FROM customers WHERE cust_name = ?', [data.cust_name], (err, resp) => {
        if(err){
            result(err, null);
            return;
        } 
        if(resp.length !== 0){
            result({kind: 'exists'}, null);
            return;
        }

        db.query('INSERT INTO customers SET ?', data, (err, resp) => {
            if(err){
                result(err, null);
                return;
            }
            result(null, {id: resp.insertId, ...data});
        });
    });
}

Customer.update = (id, data, result) => {
    db.query('UPDATE customers SET cust_name = ?, notes = ? WHERE id = ?', [data.cust_name, data.notes, id], (err, resp) => {
        if(err){
            result(err, null);
            return;
        }
        if(resp.affectedRows === 0){
            //not found customer with id
            result({kind: 'not_found'}, null);
            return;
        }

        result(null, {id: parseInt(id), ...data});
    })
}

Customer.removeOne = (id, result) => {
    db.query('DELETE FROM customers WHERE id = ?', id, (err, resp) => {
        if(err){
            result(err, null);
            return;
        }
        if(resp.affectedRows === 0){
            result({kind: 'not_found'}, null);
            return;
        }

        result(null, resp);
    })
}

Customer.removeAll = result => {
    db.query('DELETE FROM customers', (err, resp) => {
        if(err){
            result(err, null);
            return;
        }
        if(resp.affectedRows === 0){
            result({kind: 'not_found'}, null);
            return;
        }

        result(null, resp);
    })
}


Customer.findAll = result => {
    db.query('SELECT * FROM customers', (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    })
}


Customer.findOne = (id, result) => {
    db.query('SELECT * FROM customers WHERE id = ?', id, (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res[0]);
    });
}

module.exports = Customer;