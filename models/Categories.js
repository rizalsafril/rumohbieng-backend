const db = require('../database/db');

const Categories = function(items){
    this.products_id = items.products_id;
    this.categ_name = items.categ_name;
    this.service_fee = items.service_fee;
}

Categories.create = (data, result) => {
    try{
        db.query('SELECT * FROM categories WHERE categ_name = ? ', data.categ_name, (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            if(res.length){
                result({kind: 'exists'}, null);
                return;
            }

            db.query('INSERT INTO categories SET products_id = ?, categ_name = ?, service_fee = ?', data, (err, resp) => {
                if(err){
                    result(err, null);
                    return;
                } 
                result(null, resp)
            });
        })
    }catch(err){
        result(err, null);
    }
}

Categories.change = (id, data, result) => {
    try{
        db.query('UPDATE customers SET products_id = ?, categ_name = ? WHERE id = ?', 
        [data.products_id, data.categ_name, id], (err, res) => {
            if(err){
                result(err, null);
                return;
            } 
            if(res.affectedRows === 0){
                result({kind: 'not_found'}, null);
                return;
            }
            result(null, {id: id, ...res});
        })
    }catch(err){
        result(err, null);
    }
}


Categories.removebyId = (id, result) => {
    try{
        db.query('DELETE FROM customers WHERE id = ?', id, (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            if(res.affectedRows === 0){
                result({kind: 'not_found'}, null);
                return;
            }
        });
    } catch(err){
        result(err, null);
    }
}

Categories.removeAll = result => {
    try{
        db.query('DELETE FROM categories', (err, res) => {
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

Categories.findById = (id, result) => {
    try{
        db.query('SELECT * FROM categories WHERE id = ?', id, (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            result(null, res[0]);
        })
    }catch(err){
        result(err, null);
    }
}

Categories.findAll = result => {
    try{
        db.query('SELECT * FROM categories', (err, res) => {
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

module.exports = Categories;