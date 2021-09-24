const jwt = require('jsonwebtoken');
require('dotenv/config');

function authenticateToken (req, res, next) {
    const token = req.headers.authorization;
    // const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(403).send({'message':'Token required'});

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if(err) {
            res.status(401).send({message: 'Token expired'})
            return;
        }
        req.user = decoded;
        next();
    });

}

module.exports = authenticateToken;
