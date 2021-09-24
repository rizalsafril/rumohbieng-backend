const History = require('../models/History');

exports.create = async(req, res) => {
    try{
        if(!req.body){
            res.status(400).send({
                message: 'Form cannot be empty'
            })
        }
    
        const history = new History({
            user_id: req.body.user_id,
            cust_id: req.body.cust_id,
            category_id: req.body.category_id
        });
    
        History.create(history, (err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || ''
                })
            }
            else res.status(201).send(resp);
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error on query sql'
        })
    }
}

exports.change = async(req, res) => {
    try{
        if(!req.body){
            res.status(400).send({
                message: 'Form should not be empty'
            })
        }
    
        History.update(req.params.id, new History(req.body), (err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(403).send({
                        message: 'History not found'
                    });
                } else {
                    res.status(500).send({
                        message: err.message || 'Some error occured'
                    })
                } 
            } else res.status(201).send(resp);
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error on sql query'
        })
    }
}

exports.removeOne = async(req, res) => {
    try{
        History.removeOne(req.params.id, (err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(403).send({
                        message: 'History not found'
                    })
                } else {
                    res.status(500).send({
                        message: err.message || 'Some error occured'
                    })
                }
            } else res.status(200).send({
                message: 'History deleted'
            });
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error on sql query'
        })
    }
}

exports.removeAll = async(req, res) => {
    try{
        History.removeAll((err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(404).send({
                        message: 'Data not available'
                    })
                } else {
                    res.status(500).send({
                        message: err.message || 'Some errors occured'
                    })
                }
            } else res.status(200).send({
                message: 'All categories deleted'
            })
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error on sql query'
        })
    }
}

exports.findAll = async(req, res) => {
    try{
        History.findAll((err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || 'Some errors occured'
                })
            } else res.status(200).send(resp);
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error on query sql'
        })
    }
}

exports.findOne = async(req, res) => {
    try{
        History.findOne(req.params.id, (err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(404).send({
                        message: 'Data not found in database'
                    })
                } else {
                    res.status(500).send({
                        message: err.message || 'Some error occured'
                    })
                }
            } else res.status(200).send(resp);
        })
    }catch(err){
        res.send(500).send({
            message: err.message || 'Error on query sql'
        })
    }
}