const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    // country: {
    //     type: String,
    // }
    phone: {
        type: String,
    },
    weight: {
        type: String,
    },
    height: {
        type: String,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true});

module.exports = mongoose.model('UserInfo', userInfoSchema)