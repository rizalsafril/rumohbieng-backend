const jwt = require('jsonwebtoken');

const generateAccesToken = (username) => {
    return jwt.sign(username, process.env.TOKEN_KEY, {expiresIn: '2h'});
}

module.exports = generateAccesToken;