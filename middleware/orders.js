const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const addError = require("../utils/addError");

const add_order = (req, res, next) => {
  if (req.url === "/orders" && req.method === "POST") {
    console.log('orders');
    const required_fields = ["user_id", "product_name", "price_min", "price_max", "address", "location"];
    const errors = {};

    required_fields.forEach(key => {
      if (!req.body[key]) {
        const error_message = `Field "${key}" is required.`;
        addError(errors, key, error_message);
      }
    });
    if (typeof req.body.price_min !== "number") {
      addError(errors, 'price_min', 'Field "price_min" in not a number.');
    } else {
      if (req.body.price_min < 1 || req.body.price_min > 10000) {
        addError(errors, 'age', 'Field "price_min" must be in range from 1 to 10000.');
      }
    }
    if (typeof req.body.price_max !== "number") {
      addError(errors, 'price_max', 'Field "price_max" in not a number.');
    } else {
      if (req.body.price_max < 1 || req.body.price_max > 10000) {
        addError(errors, 'age', 'Field "price_max" must be in range from 1 to 10000.');
      }
      if (req.body.price_max < req.body.price_min) {
        addError(errors, 'price_max', `Field "price_max" must be larger then "price_min".`);
      }
    }

    if (Object.keys(errors).length) {
      res.status(400).jsonp({ errors });
    } else {
      req.body.id = uuidv4();
      req.status = 'in storage';
      req.body.createdAt = moment();
      req.body.path = [];
      next();
    }
  } else {
    next();
  }
};

module.exports = [add_order];
