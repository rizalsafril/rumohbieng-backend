const Billings = require('../models/Billings');

const billings = Billings({
    user_id: req.body.user_id,
    cust_id: req.body.cust_id,
    category_id: req.body.category_id,
    addon_id: req.body.addon_id
})

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'form cannot be empty'
        })
    }

    Billings.create(billings, (err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some Errors occured'
            })
        } else res.status(201).send(resp);
    });
}

exports.change = (req, res) => {
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
}

exports.removeOne = (req, res) => {
    Billings.removeOne(req.params.id, (err, res) => {
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
}

exports.removeAll = (req, res) => {
    Billings.removeAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some errors occured'
            })
        }
        else res.status(200).send(resp);
    })
}

exports.findAll = (req, res) => {
    Billings.findAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some errors occured'
            })
        }
        else res.status(200).send(resp);
    })
}

exports.findOne = (req, res) => {
    Billings.findOne(req.params.id, (err, resp) => {
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
        } else res.status(200).send(resp);
    })
}

