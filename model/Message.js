//Linking Node module
const mongoose = require("mongoose");

//Structuring messages with Mongoose
const MsgSchema = new mongoose.Schema({
  text: String,
  timestamp: { type: Date, default: Date.now }
});

//Creating reusable model with Mongoose
module.exports = mongoose.model("Message", MsgSchema);
