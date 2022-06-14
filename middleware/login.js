const jwt = require("jsonwebtoken");
const { router, JST_SECRET } = require("../config");
const moment = require("moment");

const login = (req, res, next) => {
  if (req.url === '/login' && req.method === "POST") {
    const users = router.db.get('users').value();

    const user = users.find(u => u.user_name === req.body.login || u.email === req.body.login);
    if (!user) {
      res.status(400).jsonp({ message:  'No user with such "User name" or "Email".' });
      return;
    } else if (user.password !== req.body.password) {
      res.status(400).jsonp({ message:  'Wrong password.' });
      return;
    }

    const token = jwt.sign({
      id: user.id,
      email: user.email,
      user_name: user.user_name,
      password: user.password,
      exp: +moment().add(2, 'hours'),
      iat: +moment(),
    }, JST_SECRET);

    res.status(400).jsonp({ token });
  } else {
    next();
  }
}

module.exports = login;