const Categories = require('../models/Categories');

exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'Form cannot be empty'
        })
    }

    const categories = Categories({
        products_id: req.body.products_id,
        categ_name: req.body.categ_name,
        service_fee: req.body.service_fee
    })

    Categories.create(categories, (err, resp) => {
        if(err){
            if(err.kind === 'exists'){
                res.status(403).send({
                    message: 'This category already exists'
                })
            } else {
                res.status(500).send({
                    message: err.message || 'Some errors occured'
                })
            }
        } else {
            res.status(201).send(resp);
        }
    })
}

exports.change = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'Form cannot be empty'
        })
        return;
    }

    Categories.change(req.params.id, new Categories(req.body), (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(403).send({
                    message: 'This categories not found'
                })
            } else {
                res.status(500).send({
                    message: err.message || 'Some errors occured'
                })
            } 
        } else {
            res.status(201).send(resp);
        }
    })
}


exports.removeOne = (req, res) => {
    Categories.removebyId(req.params.id, (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(403).send({
                    message: 'Categories not found'
                })
            } else {
                res.status(500).send({
                    message: err.message || 'Some error occured'
                })
            }
        } else res.status(200).send(resp);
    })
}

exports.removeall = (req, res) => {
    Categories.removeAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured'
            })
        } else res.status(200).send(resp);
    })
}

exports.findAll = (req, res) => {
    Categories.findAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some errors occured'
            })
        } else res.status(200).send(resp);
    })
}

exports.findById = (req, res) => {
    Categories.findById(req.params.id, (err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Error occured'
            })
        } else res.status(200).send(resp);
    })
}