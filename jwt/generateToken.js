const jwt = require('jsonwebtoken');
let tokenList = {}


module.exports = {
    generateAccesToken: (user) => {
        const token =  jwt.sign(user, process.env.TOKEN_KEY, {expiresIn: '2m'});
        const refreshToken =  jwt.sign(user, process.env.TOKEN_KEY, {expiresIn: '2h'});
        const response = {
            'token': token,
            'refreshToken': refreshToken,
            'username': user.username,
            'level': user.level
        }
        return tokenList = response;
    }
}
