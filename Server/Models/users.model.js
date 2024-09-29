const mongoose = require('mongoose');
const userSchema = require('../Schemas/users.schema');

const Users = mongoose.model("Users" , userSchema)

module.exports = Users