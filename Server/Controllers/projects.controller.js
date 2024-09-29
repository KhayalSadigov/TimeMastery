const Projects = require("../Models/projects.model");

const projectController = {
  getAll: async (req, res) => {
    try {
      let data = await Projects.find({});
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  getOne: async (req, res) => {
    try {
      let { id } = req.params;
      let data = await Projects.findById(id);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  post: async (req, res) => {
    try {
      let newData = new Projects(req.body);
      newData.save(); 
    } catch (error) {
      res.send(error);
    }
  },
  delete: async (req, res) => {
    try {
      let data = await Projects.findByIdAndDelete(req.params.id);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
  update: async (req, res) => {
    try {
      let data = await Projects.findByIdAndUpdate(req.params.id, req.body);
      res.send(data);
    } catch (error) {
      res.send(error);
    }
  },
};

module.exports = projectController;
