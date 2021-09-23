const db = require('../database/db');

// Constructor
const Product = function(product){
    this.product_name = product.product_name;
    this.product_type = product.product_type;
    this.price = product.price;
    this.stock = product.stock;
    this.notes = product.notes;
}

Product.create = (data, result) => {
    try{
        db.query(`SELECT * FROM products WHERE product_name = ${data.product_name}`, (err, res) =>{
            if(err){
                result(err, null);
                return;
            }
            if(res.length){
                result({kind: 'exists'}, null);
                return;
            }

            db.query('INSERT INTO products SET ?', data, (err, res) => {
                if(err) {
                    result(err, null);
                    return;
                }
                result(null, {id: res.insertId, ...data});
                return;
            })

        })
    }catch(e){
        result(e, null);
    }
}

Product.findAll = result => {
    try{
        db.query('SELECT * FROM products', (err, res) => {
            if(err) {
                result(err, null);
                return;
            }
            result(null, res);

        });

    } catch(err){
        result(err, null);
    }
}

Product.findOne = (id, result) => {
    try{
        db.query('SELECT * FROM products WHERE id = ?', [id], (err, res) => {
            if(err){
                result(err, null);
                return;
            }

            result(null, res[0]);
        })
    } catch(err){
        result(err, null);
    }
}

Product.change = (id, data, result) => {
    try{
        db.query('UPDATE products SET product_name = ?, product_type = ?, price = ?, stock = ?, notes = ? WHERE id = ?'
        [data.product_name, data.product_type, data.price, data.stock, data.notes, id], (err, res) => {
            if(err){
                result(err, null);
                return;
            }

            if(res.affectedRows === 0){
                //not found customer with id
                result({kind: 'not_found'}, null);
                return;
            }

            result(null, {id: id, ...data});
        })
    } catch(err) {
        result(err, null);
    }
}

Product.remove = (id, result) => {
    db.query('DELETE FROM products WHERE id = ?', id, (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        if(res.affectedRows === 0){
            //not found customer with id
            result({kind: 'not_found'}, null);
            return;
        }
        result(null, res);
    })
}

Product.removeAll = result => {
    db.query('DELETE FROM products', (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        result(null, res);
    });
}

module.exports = Product;