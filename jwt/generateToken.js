const jwt = require('jsonwebtoken');
let tokenList = {}

const generateAccesToken = (user) => {
    const token =  jwt.sign(user, process.env.TOKEN_KEY, {expiresIn: '2h'});
    const refreshToken = jwt.sign(user, process.env.TOKEN_REFRESH, {expiresIn: '2h'});
    const response = {
        'status': 'loggedin',
        'token': token,
        'refreshToken': refreshToken,
        'username': user.username,
        'level': user.level
    }
    return tokenList[refreshToken] = response;
}

module.exports = generateAccesToken;