const userValidation = require("../Validation/users.validation");

function userMiddleware(req, res, next) {
  let { value, error } = userValidation.validate(req.body);
  if (!error) {
    next();
  }
  else{
    res.send(false)
  }
}

module.exports = userMiddleware ;