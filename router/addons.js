const express = require('express');
const router = express.Router();
const addons = require('../controller/addons.controller');
const verifyToken = require('../jwt/verifyToken');

//retrive all addons
router.get('/', verifyToken, addons.findAll);

//create addons
router.post('/create', verifyToken, addons.create);

//update addons
router.put('/:id', verifyToken, addons.update);

//delete one addon
router.delete('/:id', verifyToken, addons.removeOne);

//delete all addons
router.delete('/', verifyToken, addons.removeAll);
