const mongoose = require('mongoose');

const privateMessageSchema = new mongoose.Schema({
  from_user: {
    type: String,
    required: true,
    lowercase: true
  },
  to_user: {
    type: String,
    required: true.valueOf,
    lowercase: true
  },
  message: {
    type: String,
    required: true
  },
  date_sent:{
    type: Date,
    default: Date.now
  }
});
const privateMsg = mongoose.model("privateMsg", privateMessageSchema);
module.exports = privateMsg;