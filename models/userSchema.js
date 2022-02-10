const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, "Username must be not null"],
        lowercase: true
    },
    firstname:{
        type: String,
        required: [true, "Firstname must be not null"],
        lowercase: true,
    },
    lastname:{
        type: String,
        required: [true, "Lastname must be not null"],
        lowercase: true,
    },
    password:{
        type: String,
        required: [true, "Password must be in proper format"],
        lowercase: true,
        minlength:6
    },
    createdon:{
        type: Date,
        default: Date.now,
    }
})

const user = mongoose.model('user', userSchema);
module.exports = user;