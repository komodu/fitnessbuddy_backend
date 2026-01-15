// routes/auth.js
const auth = require("../middlewares/auth.middleware")

require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth.controller");
const authenticateToken = require("../middlewares/auth.middleware")
const authRouter = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "YOUR_DEFAULT_SECRET";

// Login route
authRouter.post("/login", authController.login);

// Register route
authRouter.post("/register", authController.register);

// Profile route
authRouter.get("/profile", auth, authController.profile)


authRouter.post("/logout",(req , res) =>{
  res.clearCookie("token",{
    httpOnly: true,
    sameSite: "lax",
    secure: false

  })
  res.json({message: "Logout successful"})
})

authRouter.get("/me", authenticateToken, (req, res) => {
  res.status(200).json({
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

module.exports = authRouter;
