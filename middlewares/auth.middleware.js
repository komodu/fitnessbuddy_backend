

const jwt = require("jsonwebtoken")
const jwtConfig = require("../config/jwt")

// Verifies the token and jwt Secret
module.exports = (req, res, next) =>{
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.user = decoded;
        next();
    } catch {
        res.sendStatus(403);
    }
}