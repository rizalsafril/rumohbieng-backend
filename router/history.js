const express = require('express');
const router = express.Router();
const verifyToken = require('../jwt/verifyToken');
const history = require('../controller/history.controller');

// get all histories
router.get('/', verifyToken, history.findAll);

// get one history
router.get('/:id', verifyToken, history.findOne);

// update history
router.put('/:id', verifyToken, history.change);

//delete one history
router.delete('/:id', verifyToken, history.removeOne);

//delete all history
router.delete('/', verifyToken, history.removeAll);