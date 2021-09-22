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