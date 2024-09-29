const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  fullname: String,
  username: String,
  password: String,
  todos : Array,
  projects : Array
});

module.exports = userSchema;
