const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    firstname: String,
    lastname: String,
    password: String,
    
});

module.exports = mongoose.model("User", userSchema);
