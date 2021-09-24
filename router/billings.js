const express = require('express');
const router = express.Router();
const verifyToken = require('../jwt/verifyToken');
const billings = require('../controller/billings.controller');

// get all billings
router.get('/', verifyToken, billings.findAll);

// post a billings
router.post('/', verifyToken, billings.create);

//get spesific billings
router.get('/:id', verifyToken, billings.findOne);

// delete by id
router.delete('/:id', verifyToken, billings.removeOne);

//delete all
router.delete('/', verifyToken, billings.removeAll);


module.exports = router;