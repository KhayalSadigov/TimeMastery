const projectValidation = require("../Validation/projects.validation");

function projectMiddleware(req, res, next) {
  let { value, error } = projectValidation.validate(req.body);
  if (!error) {
    next();
  }
  else{
    res.send(false)
  }
}

module.exports = projectMiddleware ;