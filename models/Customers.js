const db = require('../database/db');

const Customer = function(item){
    this.cust_name = item.cust_name;
    this.notes = item.notes;
}

Customer.create = (data, result) => {
    try{
        db.query('SELECT * FROM customers WHERE cust_name = ?', data.cust_name, (err, resp) => {
            if(err){
                result(err, null);
                return;
            } 
            if(resp.length){
                result({kind: 'exists'}, null);
                return;
            }
    
            db.query('INSERT INTO customers SET cust_name = ?, notes = ?', data, (err, resp) => {
                if(err){
                    result(err, null);
                    return;
                }
                result(null, {id: resp.insertId, ...resp});
            });
        });
    }catch(err){
        result(err, null);
    }
}

Customer.update = (id, data, result) => {
    try{
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
    
            result(null, {id: resp.id, ...data});
        })
    }catch(err){
        result(err, null);
    }
}

Customer.removeOne = (id, result) => {
    try{
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
    }catch(err){
        result(err, null);
    }
}

Customer.removeAll = result => {
    try{
        db.query('DELETE FROM customers', (err, resp) => {
            if(err){
                result(err, null);
                return;
            }
            result(null, resp);
        })
    }catch(err){
        result(err, null);
    }
}


Customer.findAll = result => {
    try{
        db.query('SELECT * FROM customers', (err, res) => {
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


Customer.findOne = (id, result) => {
    try{
        db.query('SELECT * FROM customers WHERE id = ?', id, (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            result(null, res);
        });
    }catch(err){
        result(err, nul);
    }
}

module.exports = Customer;