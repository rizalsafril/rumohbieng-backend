const Customer = require('../models/Customers');
const Product = require('../models/Products');


exports.create = (req, res) => {

    const customer = Customer({
        cust_name : req.body.cust_name,
        notes: req.body.notes
    })

    if(!req.body){
        res.status(400).send({
            message: 'Form cannot be empty'
        })
    }

    Customer.create(customer, (err, resp) => {
        if(err){
            if(err.kind === 'exists'){
                res.status(403).send({
                    message: 'This customer already exists'
                })
            } else {
                res.status(500).send({
                    message: err.message || 'Some errors occured'
                })
            }
        } else res.status(201).send(resp);
    })
}

exports.change = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'Form cannot be empty'
        })
        return;
    }

    Customer.update(req.params.id, new Customer(req.body), (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(403).send({
                    message: 'Customer not found'
                })
            } else {
                res.status(500).send({
                    message: err.message || 'Some Error occured'
                })
            }
        } else res.status(201).send(resp)
    });
}

exports.removeOne = (req, res) => {
    Customer.removeOne(req.params.id, (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(403).send({
                    message: 'Customer not found'
                })
            } else {
                res.status(500).send({
                    message: err.message || 'Some error occured'
                })
            }
        } else res.status(200).send({
            message: 'Customer deleted'
        })
    });
}

exports.removeAll = (req, res) =>{
    Customer.removeOne((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some errors occured'
            })
        } else res.status(200).send({
            message: 'All customers deleted'
        })
    })
}

exports.findAll = (req, res) => {
    Customer.findAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured'
            })
        } else res.status(200).send(resp);
    });
}

exports.findOne = (req, res) => {
    Customer.findOne(req.params.id, (err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured'
            })
        } else res.status(200).send(resp);
    });
}