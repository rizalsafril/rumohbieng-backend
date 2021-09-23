const express = require('express');
const router = express.Router();
const verifyToken = require('../jwt/verifyToken');
const categories = require('../controller/categories.controller');


// get all categories
router.get('/', verifyToken, categories.findAll);

// get category by id
router.get('/:id', verifyToken, categories.findById);

//change categories
router.put('/:id', verifyToken, categories.findById);

// delete by id
router.delete('/:id', verifyToken, categories.removeOne);

// delete all categories
router.delete('/', verifyToken, categories.removeall);