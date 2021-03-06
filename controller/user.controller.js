const enkrip = require('bcrypt');
const User = require('../models/Users');


//validate request
exports.create = async(req, res) => {
    
    // create a user
    try{
        if(!req.body){
            res.status(400).send({
                message: 'Content can not be empty!'
            })
        }
        const salt = await enkrip.genSalt(10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            nama: req.body.nama,
            password: await enkrip.hash(req.body.password, salt),
            level: req.body.level
        });
        // Save customer
        User.create(user, (err, resp) => {
            if (err) {
                if(err.kind === 'exists'){
                    res.status(403).send({
                        message: 'Username or Email already exists'
                    })
                }
                else {
                    res.status(500).send({
                        message: err.message || 'Some error occured'
                    });
                }
            }
            else
                res.status(201).json(resp);
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Some error occured'
        });
    }

    
}

// Retrive all users
exports.findAll = (req, res) => {
    User.getAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured...!'
            })
        }
        else res.send(resp);
    })
}

// Find one user
exports.findOne = async(req, res) => {
    User.findById(req.params.userId, (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}`
                })
            } else {
                res.status(500).send({
                    message: `Error retrieving user with id ${req.params.userId}`
                })
            }
        } else res.send(resp);
    })
}

// update user
exports.update = async(req, res) => {
    // validate request
    try{
        if(!req.body.email){
            res.status(400).send({
                message: 'Email can not be empty!'
            })
        }
        if(!req.body.password){
            res.status(400).send({
                message: 'Password can not be empty!'
            })
        }
    
        if(!req.body.nama) {
            res.status(400).send({
                message: 'Nama Lengkap can not be empty!'
            })
        }

        const salt = await enkrip.genSalt(10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            nama: req.body.nama,
            password: await enkrip.hash(req.body.password, salt),
            level: req.body.level
        });
    
        User.updateById(req.params.userId, user, (err, resp) => {
            if(err){
                if(err.kind === 'not_found'){
                    res.status(404).send({
                        message: `Not found user with id ${req.params.userId}`
                    })
                } else {
                    res.status(500).send({
                        message: `Error updating user with id ${req.params.userId}`
                    })
                }
            } else res.send(resp)
        })
    }catch(err){
        res.status(500).send({
            message: err.message || 'Something error on mysql query'
        })
    }
}

// Delete one user
exports.delete = async(req, res) => {
    User.remove(req.params.userId, (err, resp) => {
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `Not found user with id ${req.params.userId}`
                })
            } else {
                res.status(500).send({
                    message: `Could not delete user with id ${req.params.userId}`
                })
            }
        } else res.send({
            message: 'User deleted'
        });
    })
}


// Delete all users
exports.deleteAll = async(req, res) => {
    User.removeAll((err, resp) => {
        if(err){
            res.status(500).send({
                message: err.message || 'Some error occured'
            })
        } else res.send({
            message: `All users deleted`
        })
    });
}

exports.login = async(req, res) => {
    try{
        const data = req.body;
        User.login(data, (err, resp) => {
            if (err) {
                if (err.kind === 'not_found') {
                    res.status(404).send({
                        message: 'You have no access!'
                    });
                }

                if(err.kind === 'not_auth'){
                    res.status(404).send({
                        message: 'You are not authorized'
                    })
                }

                else {
                    res.status(500).send({
                        message: err.message || 'Some error occured'
                    });
                }
            } else {
                res.status(201).json(resp);
            }
        });

    }catch(err){
        res.status(500).send({
            message: err.message || 'SQL query errors'
        })
    }
}