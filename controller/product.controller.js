const Product = require('../models/Products');

// Validate request
exports.create = async(req, res) => {
    try{
        if(!req.body){
            res.status(400).send({
                message: 'Form cant be empty'
            });
        }
    
        // create product
        const products = new Product({
            product_name: req.body.product_name,
            product_type: req.body.product_type,
            price: req.body.price,
            stock: req.body.stock,
            notes: req.body.notes
        })
    
        //insert products to database
        Product.create(products, (err, resp) => {
            if(err){
                if(err.kind === 'exist'){
                    res.status(403).send({
                        message: 'Product with this name already exists'
                    })
                } else {
                    res.status(500).send({
                        message: err.message || 'Some error occured'
                    })
                } 
            }
            else {
                res.status(201).json(resp);
            }
        });
    } catch(err){
        res.status(500).send({
            message: err.message || 'Something errors'
        })
    }
}

exports.getAll = (req, res) => {
    Product.findAll((err, resp) => {
        if(err){
           res.status(500).send({
               message: err.message || 'Some errors occured'
           })
        }
        else res.send(resp);
    })
}

exports.getOne = async(req, res) => {
    try{
        Product.findOne(req.params.productId, (err, resp) => {
            if(err){
                res.status(500).send({
                    message: err.message || 'Some error occured'
                })
            } 
            else res.status(201).send(resp);
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Error with mysql query'
        })
    }
};

exports.update = async(req, res) => {
    try{
        if(!req.body){
            res.status(400).send({
                message: 'Field should not be empty'
            });
        }
    
        Product.change(req.params.productId, new Product(req.body), (err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(403).send({
                        message: 'Product not found'
                    })
                } else res.status(500).send({
                    message: err.message
                });
            } else {
                res.status(201).send(resp);
            }
        })
    }catch(err){
        res.status(500).send({message: err.message || 'Something error'});
    }
}

exports.removeOne = async(req, res) => {
    try{
        Product.remove(req.params.productId, (err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(404).send({
                        message: `Product not found`
                    })
                } else {
                    res.status(500).send({
                        message: err.message || 'Some error occured'
                    })
                }
            } else res.status(201).send({
                message: 'Product deleted'
            });
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'SQL Query errors'
        })
    }
}

exports.removeAll = (req, res) => {
    Product.removeAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured'
            })
        } else {
            res.status(200).send({
                message: 'All products removed'
            })    
        }
    })
}