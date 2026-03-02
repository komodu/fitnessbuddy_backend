const authService = require("../services/auth.service");

// Controller that will create token through the authService
exports.login = async (req, res) => {
  try {
    const data = await authService.login(req.body.username, req.body.password);
    res.cookie("token", data.token, {
      httpOnly: true, // JS cannot read it (optional, recommended)
      secure: false, // must be false for HTTP
      sameSite: "lax", // strict blocks cross-port localhost requests
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({
      data: data,
      result: "Login successful",
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// Register point
exports.register = async (req, res) => {
  try {
    const { registerUserInfo, token } = await authService.register(
      req.body.username,
      req.body.password,
      req.body.name,
      req.body.email,
      req.body.age,
    );

    // Send JWT Cookie immediately
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 15,
    });

    // Success
    res.json({
      message: "User registered successfully",
      user: registerUserInfo,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.verify = async (req, res) => {
  try {
    const { user, userInfo } = await authService.verify(req.user.id);
    res.status(200).json({ status: "success", user: user, userInfo: userInfo });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
