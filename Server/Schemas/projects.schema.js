const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  members: Array,
  tasks : Array
});

module.exports = projectSchema;
    