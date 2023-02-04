//^ Importing the jwt so that we can use it to generate signin token to autenitcate other requests
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign( {id},process.env.JWT_SECRET,{ expiresIn: '30D'})
}

module.exports =generateToken