const express = require('express');
const router = express.Router();
const verifyToken = require('../jwt/verifyToken');
const customer = require('../controller/customer.controller');

// show all customers
router.get('/', verifyToken, customer.findAll);

// show by id
router.get('/:id', verifyToken, customer.findOne);

//update
router.put('/:id', verifyToken, customer.change);

//delete
router.delete('/:id', verifyToken, customer.removeOne);

// delete all
router.delete('/', verifyToken, customer.removeAll);

module.exports = router;