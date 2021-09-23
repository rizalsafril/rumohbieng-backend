const db = require('../database/db');

const History = function(item){
    this.user_id = item.user_id;
    this.category_id = item.category_id;
    this.addon_id = item.addon_id;
}

History.create = (data, result) => {
    try{
        db.query('INSERT INTO history SET user_id = ?, category_id = ?, addon_id = ?', [
            data.user_id, data.category_id, data.addon_id
        ], (err, res) => {
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


History.update = (id, data, result) => {
    try{
        db.query('UPDATE history set user_id = ?, category_id = ?, addon_id = ? WHERE id=?', [
            data.user_id, data.category_id, data.addon_id, id
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

History.removeOne = (id, result) => {
    try{
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
    }catch(err){
        result(err, null);
    }
}

History.removeAll = result => {
    try{
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
    }catch(err){
        result(err, null);
    }
}

History.findOne = (id, result) => {
    try{
        db.query('SELECT * FROM history WHERE id = ?', id, (err, res) => {
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

History.findAll = result => {
    try{
        db.query('SELECT * FROM history', (err, res) => {
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

module.exports = History;