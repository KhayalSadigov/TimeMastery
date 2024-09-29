const express = require("express");
const endpoints = require("./../Constants/endpoints");
const projectController = require("../Controllers/projects.controller");
const projectMiddleware = require("../Middlewares/projects.middlewares");

const projectRouter = express.Router();

projectRouter.get(endpoints.projects.getAll, projectController.getAll);
projectRouter.get(endpoints.projects.getOne, projectController.getOne);
projectRouter.delete(endpoints.projects.delete, projectController.delete);
projectRouter.post(endpoints.projects.post, projectMiddleware, projectController.post);
projectRouter.patch(endpoints.projects.update, projectController.update);

module.exports = projectRouter;
