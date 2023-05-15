const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  passwordSalt: String,
  userid: String,
  allowance: { type: Number, default: 0 },
});
module.exports = mongoose.model("User", userSchema);
