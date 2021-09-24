const { reset } = require('nodemon');
const Customer = require('../models/Customers');
const Product = require('../models/Products');


exports.create = async(req, res) => {

    try{
        const customer = new Customer({
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
    }catch(err){
        res.status(500).send({
            message: res.message || 'Error with sql'
        })
    }
}

exports.change = async(req, res) => {
    try{
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
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error with SQL query'
        })
    }
}

exports.removeOne = async(req, res) => {
    try{
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
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error with SQL query'
        })
    }
}

exports.removeAll = async(req, res) =>{
    try{
        Customer.removeAll((err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || 'Some errors occured'
                })
            } else res.status(200).send({
                message: 'All customers deleted'
            })
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error with SQL Query'
        })
    }
}

exports.findAll = async(req, res) => {
    try{
        Customer.findAll((err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || 'Some error occured'
                })
            } else res.status(200).send(resp);
        });
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error with SQL Query'
        })
    }
}

exports.findOne = async(req, res) => {
    try{
        Customer.findOne(req.params.id, (err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || 'Some error occured'
                })
            } else res.status(200).send(resp);
        });
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error with SQL Query'
        })
    }
}