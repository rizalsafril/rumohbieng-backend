const History = require('../models/History');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'Form cannot be empty'
        })
    }

    const history = History({
        user_id: req.body.user_id,
        category_id: req.body.category_id,
        addon_id: req.body.addon_id
    });

    History.create(history, (err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || ''
            })
        }
        else res.status(201).send(resp);
    })
}

exports.change = (req, res) => {
    if(!res.body){
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
}

exports.removeOne = (req, res) => {
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
}

exports.removeAll = (req, res) => {
    History.removeAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some errors occured'
            })
        } else res.status(200).send({
            message: 'All categories deleted'
        })
    })
}

exports.findAll = (req, res) => {
    History.findAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some errors occured'
            })
        } else res.status(200).send(resp);
    })
}

exports.findOne = (req, res) => {
    History.findOne(req.params.id, (err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured'
            })
        } else res.status(200).send(resp);
    })
}