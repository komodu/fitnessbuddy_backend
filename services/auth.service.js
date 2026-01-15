const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const { signToken } = require("../utils/token")


exports.login = async (username, password) =>{
    const user = await User.findOne({username});
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error("Invalid credentials");

    const token = signToken({ userId: user.id });
   
    return { user: user.username , token };
}

exports.register = async (username, password) =>{
    //Check first if username already exist
    const existing = await User.findOne({ username });
    if (existing) throw new Error("Username already registered");

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Create new user
    const user = await User.create({
        username,
        password: hashedPassword,
    });

    const token = signToken({ userId: user._id });

    return { user, token };
}

