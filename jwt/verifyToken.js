const jwt = require('jsonwebtoken');
require('dotenv/config');

function authenticateToken (req, res, next) {
    const token = req.headers.authorization;
    // const token = authHeader && authHeader.split(' ')[1];

    if(token === null) return res.status(403).send({'message':'Token required'});

    try{
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded
        
    }catch(err){
        return res.status(401).send({'message': 'Invalid token'});
    }
    
    next();


}

module.exports = authenticateToken;
