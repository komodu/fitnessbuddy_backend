const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, jwtConfig.secret);
    req.user = decoded;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

module.exports = authenticateToken;
