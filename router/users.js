const express = require('express');
const router = express.Router();

const user = require('../controller/user.controller');

const verifyToken = require('../jwt/verifyToken');

//Login user
router.post('/', user.login);

// retrive all users
router.get('/', verifyToken, user.findAll);

// Create a new user
router.post('/create', verifyToken, user.create);

// Retrieve  a single customer
router.get('/:userId', verifyToken, user.findOne);

//Update user
router.put('/:userId', verifyToken, user.update);

//Delete a user
router.delete('/:userId', verifyToken, user.delete);

//Delete all users
router.delete('/:userId', verifyToken, user.deleteAll);

module.exports = router;