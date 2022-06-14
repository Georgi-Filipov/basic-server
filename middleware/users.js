const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const addError = require("../utils/addError");
const ROLES = require("../constants/user");

const add_user = (req, res, next) => {
  if (req.url === "/users/" && req.method === "POST") {
    const required_fields = ["age", "first_name", "last_name", "user_name", "password", "gender", "email", "phone", "address", "latitude", "longitude", "role"];
    const not_fields = ["image"];
    const errors = {};

    Object.keys(req.body).map(key => {
      if (![...required_fields, ...not_fields].includes(key))
        addError(errors, key, `Field "${key}" in not valid for this request.`);
    });

    required_fields.forEach(key => {
      if (!req.body[key]) {
        const error_message = `Field "${key}" is required.`;
        addError(errors, key, error_message);
      }
    });
    if (typeof req.body.age !== "number") {
      addError(errors, 'age', 'Field "age" in not a number.');
    } else {
      if (req.body.age < 16 || req.body.age > 99) {
        addError(errors, 'age', 'Field "age" must be in range from 16 to 99.');
      }
    }
    if (!ROLES.find(role => role === req.body.role)) {
      addError(errors, 'role', `"${req.body.role} in not valid choice for "role" field.`);
    }

    if (Object.keys(errors).length) {
      res.status(400).jsonp({ errors });
    } else {
      req.body.id = uuidv4();
      req.is_active = false;
      req.body.created_at = moment();
      next();
    }
  } else {
    next();
  }
};

module.exports = [add_user];
