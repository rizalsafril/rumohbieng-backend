const Billings = require('../models/Billings');

exports.create = async(req, res) => {
    try{
        if(!req.body){
            res.status(400).send({
                message: 'form cannot be empty'
            })
        }

        const billings = new Billings({
            user_id: req.body.user_id,
            cust_id: req.body.cust_id,
            category_id: req.body.category_id,
            addon_id: req.body.addon_id
        })
    
        Billings.create(billings, (err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || 'Some Errors occured'
                })
            } else res.status(201).send(resp);
        });
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error on sql query'
        })
    }
}

exports.change = async(req, res) => {
    try{
        if(!req.body){
            res.status(400).send({
                message: 'Form cannot be empty'
            })
        }
    
        Billings.updateById(req.params.id, new Billings(req.body), (err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(403).send({
                        message: 'Billing not found'
                    })
                } else {
                    res.status(500).send({
                        message: err.message || 'Some errors occured'
                    })
                }
            } else res.status(201).send(resp);
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error in sql query'
        })
    }
}

exports.removeOne = async(req, res) => {
    try{
        Billings.removeOne(req.params.id, (err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(403).send({
                        message: 'Billing not found'
                    })
                } else {
                    res.status(500).send({
                        message: err.message || 'Some errors occured'
                    })
                }
            } else res.status(200).send({
                message: 'Billing removed'
            });
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error in sql query'
        })
    }
}

exports.removeAll = async(req, res) => {
    try{
        Billings.removeAll((err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(404).send({
                        message: 'Billing not found'
                    });
                } else {
                    res.status(500).send({
                        message: err.message || 'Some errors occured'
                    })
                }
            }
            else res.status(200).send({
                message: 'All billing records deleted'
            });
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error in sql query'
        })
    }
}

exports.findAll = async(req, res) => {
    try{
        Billings.findAll((err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || 'Some errors occured'
                })
            }
            else res.status(200).send(resp);
        });
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error in sql query'
        })
    }
}

exports.findOne = async(req, res) => {
    try{
        Billings.findOne(req.params.id, (err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || 'Some errors occured'
                })
            } else res.status(200).send(resp);
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error in sql query'
        })
    }
}

