const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/jwt");

exports.signToken = (payload) =>{
    return jwt.sign(payload, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn
    })
}