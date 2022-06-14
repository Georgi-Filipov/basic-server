const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { router } = require("../config");
const addError = require("../utils/addError");

const register = (req, res, next) => {
  if (req.url === '/register' && req.method === "POST") {

    const users = router.db.get('users').value();
    const user = req.body;

    const errors = {};
    const required_fields = ["first_name", "last_name", "user_name", "password", "email"];

    required_fields.forEach(key => {
      if (!user[key]) {
        const error_message = `Field "${key}" is required.`;
        addError(errors, key, error_message);
      }
    });

    Object.keys(user).map(key => {
      if (!required_fields.includes(key))
        addError(errors, key, `Field "${key}" in not valid for this request.`);
    });

    if (users.find(u => u.user_name === user.user_name)) {
      addError(errors, 'user_name', `Field "user_name" should be unique.`);
    }
    if (users.find(u => u.email === user.email)) {
      addError(errors, 'email', `Field "email" should be unique.`);
    }

    if (Object.keys(errors).length) {
      res.status(400).jsonp({ errors });
      return;
    } else {
      user.id = uuidv4();
      user.is_active = false;
      user.created_at = moment();
      user.image = null;
      user.age = null;
      user.gender = null;
      user.phone = null;
      user.latitude = 0;
      user.longitude = 0;
      user.role = "user";
    }

    router.db.set('users', [...users, user]).write();

    res.status(201).jsonp(user);

  } else {
    next();
  }
}

module.exports = register;