const User = require("../models/userModel");
const UserInfo = require("../models/userInfoModel");
const bcrypt = require("bcryptjs");
const { signToken } = require("../utils/token");

exports.login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const userInfo = await UserInfo.findOne({ user: user._id });
  if (!userInfo) throw new Error("User info not found");
  const token = signToken({ id: user._id, username: user.username });

  return {
    userInfo: userInfo,
    userid: user.id,
    username: user.username,
    token,
  };
};

exports.register = async (username, password, name, email, age) => {
  //Check first if username already exist
  const existAccount = await User.findOne({ username });
  if (existAccount) throw new Error("Username already registered");
  console.log("service register");
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  //Create new user
  const user = await User.create({
    username,
    password: hashedPassword,
  });

  // Link it to a new UserInformation
  console.log("user.id: ", user._id);
  const registerUserInfo = await UserInfo.create({
    user: user._id,
    name: name,
    email: email,
    age: age,
  });

  // Generate Token
  const token = signToken({ id: user._id, username: user.username });

  return { registerUserInfo, token };
};

exports.verify = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    const userInfo = await UserInfo.findOne({ user: user._id });
    if (!userInfo) throw new Error("User info not found");
    return { user: user, userInfo: userInfo };
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
