const express = require('express');
const router = express.Router();

const product = require('../controller/product.controller');

const verifyToken = require('../jwt/verifyToken');

// retrive all products
router.get('/', verifyToken, product.getAll);

// retrieve product by id
router.get('/:productId', verifyToken, product.getOne);

// create a new product
router.post('/', verifyToken, product.create);

// update product
router.put('/:productId', verifyToken, product.update);

// delete product
router.delete('/:productId', verifyToken, product.removeOne);

// delete all
router.delete('/', verifyToken, product.removeAll);

module.exports = router;