const Product = require('../models/Products');

// Validate request
exports.create = async(req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'Form cant be empty'
        });
    }

    // create product
    const products = Product({
        product_name: req.body.product_name,
        product_type: req.body.product_type,
        price: req.body.price,
        stock: req.body.stock,
        notes: req.body.notes
    })

    //insert products to database
    Product.create(products, (err, res) => {
        if(err){
            if(err.kind === 'exist'){
                res.status(403).send({
                    message: 'Product with this name already exists'
                })
            }
            res.status(500).send({
                message: err.message || 'Some error occured'
            })
        }
        else {
            res.status(201).json(res);
        }
    });
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

exports.getOne = (req, res) => {
    Product.findOne(req.params.productId, (req, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured'
            })
        } 
        else res.status(201).send(res);
    })
};

exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: 'Field should not be empty'
        });
    }

    Product.update(req.params.productId, new Product(req.body), (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(403).send({
                    message: 'Data is empty'
                })
            } else res.status(500).send({
                message: `Error updating product with id : ${req.params.productId}`
            });
        } else {
            res.status(201).send(resp);
        }
    })
}

exports.removeOne = (req, res) => {
    Product.delete(req.params.productId, (err, resp) => {
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