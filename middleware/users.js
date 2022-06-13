const {v4: uuidv4} = require("uuid");
const moment = require("moment");

const addError = (obj, key, msg) => {
  if (obj[key]) {
    obj[key].push(msg);
  } else {
    obj[key] = [msg];
  }
}

const roles = ['admin', 'user', 'observer'];

const add_user = (req, res, next) => {
  if (req.url === "/users" && req.method === "POST") {
    const required_fields = ["age", "first_name", "last_name", "user_name", "password", "gender", "email", "phone", "address", "latitude", "longitude", "role"];
    const errors = {};

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
    if (!roles.find(role => role === req.body.role)) {
      addError(errors, 'role', `"${req.body.role} in not valid choice for "role" field.`);
    }

    if (Object.keys(errors).length) {
      res.status(400).jsonp({ errors });
    } else {
      req.body.id = uuidv4();
      req.is_active = false;
      req.body.createdAt = moment();
      next();
    }
  }
};

module.exports = [add_user];