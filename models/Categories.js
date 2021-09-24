const db = require('../database/db');

const Categories = function(items){
    this.product_id = items.product_id;
    this.categ_name = items.categ_name;
    this.service_fee = items.service_fee;
}

Categories.create = (data, result) => {
    db.query('SELECT * FROM categories WHERE product_id = ? AND categ_name = ?', [data.product_id, data.categ_name], (err, res) => {
        if(err){
            result(err, null);
            return;
        }
        if(res.length !== 0){
            result({kind: 'exists'}, null);
            return;
        }

        db.query(`INSERT INTO categories SET ?`, data, (err, resp) => {
            if(err){
                result(err, null);
                return;
            } 
            result(null, {id: resp.insertId, ...data})
        });
    })
}

Categories.change = (id, data, result) => {
    db.query('UPDATE categories SET product_id = ?, categ_name = ? WHERE id = ?', 
        [data.product_id, data.categ_name, id], (err, res) => {
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
}


Categories.removebyId = (id, result) => {
    try{
        db.query('DELETE FROM categories WHERE id = ?', id, (err, res) => {
            if(err){
                result(err, null);
                return;
            }
            if(res.affectedRows === 0){
                result({kind: 'not_found'}, null);
                return;
            }
            result(null, res);
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