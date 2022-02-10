const mongoose = require('mongoose')

const groupMessageSchema = new mongoose.Schema({
    from_user:{
        type: String,
        required: true,
        lowercase: true
    },
    room: {
        type: String,
        required: true,
        lowercase: true
    },
    message: {
        type: String,
        required: true
    },
    date_sent:{
        type: Date,
        default: Date.now,
    }
})

const groupMsg = mongoose.model("groupMsg", groupMessageSchema);
module.exports = groupMsg;