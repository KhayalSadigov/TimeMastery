const mongoose = require('mongoose');
const projectSchema = require('../Schemas/projects.schema');

const Projects = mongoose.model("Projects" , projectSchema)

module.exports = Projects