const Addons = require('../models/Addons');

exports.create = async(req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'Form cannot empty'
        })
    }

    // constructor
    const addons = Addons({
        addon_name = req.body.addon_name,
        price = req.body.price,
    });

    Addons.create = (addons, (err, resp) => {
        if(err){
            res.send(500).send({
                message: err.message || 'Some Errors occured'
            });
        }
        else res.status(201).send(resp);
    })
}

exports.findAll = async(req, res) => {
    Addons.findAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Error occured'
            })
        }
        else res.send(resp);
    })
}

exports.findOne = (req, res) => {
    Addons.findById(req.params.id, (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(403).send({
                    message: 'Cannot find this product in database'
                })
            } else {
                res.status(500).send({
                    message: err.message || 'Some Errors occured'
                })
            }
        } else res.send(resp);
    });
}

exports.removeOne = (req, res) => {
    Addons.removeOne(req.params.id, (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(403).send({
                    message: 'Product not found'
                })
            } else{
                res.status(500).send({
                    message: err.message || 'Some errors occured'
                })
            }
        } else res.status(201).send({
            message: 'Product deleted'
        })
    });
}

exports.removeAll = (req, res) => {
    Addons.removeAll(req.params.id, (err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some Error occured'
            })
        } else res.status(201).send({
            message: 'All Products removed from database'
        })
    });
}

exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'Form should not empty'
        })
    }

    Addons.update(req.params.id, new Addons(req.body), (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(403).send({
                    message: 'Product not found'
                })
            } else {
                res.status(500).send({
                    message: err.message || 'Some Errors occured'
                })
            }
        } else res.status(201).send({
            message: 'Product updated'
        })
    });
}