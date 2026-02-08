// routes/auth.js
const auth = require("../middlewares/auth.middleware");

require("dotenv").config();
const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const profileController = require("../controllers/profile.controller");
// const JWT_SECRET = process.env.JWT_SECRET || "YOUR_DEFAULT_SECRET";

// Login route
authRouter.post("/login", authController.login);

// Register route
authRouter.post("/register", authController.register);

// Verify route
authRouter.get("/me", auth, authController.verify);

// Profile route
authRouter.get("/profile", auth, profileController.getProfileInfo);
authRouter.patch("/:id", auth, profileController.updateProfileInfo);

// Logout route
authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });
  res.json({ message: "Logout successful" });
});

module.exports = authRouter;
