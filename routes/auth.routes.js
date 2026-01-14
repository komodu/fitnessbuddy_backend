// routes/auth.js
require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth.controller");

const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "YOUR_DEFAULT_SECRET";

// Login route
authRouter.post("/login", authController.login);

// Register route
authRouter.post("/register", authController.register);

// Verify token route
authRouter.get("/verify-token", (req, res) => {
  const token = req.cookies.token; // make sure cookie-parser is enabled
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Authenticated", userId: decoded.userId });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = authRouter;
