const users = require("./users");
const orders = require("./orders");
const auth = require("./auth");
const login = require("./login");
const register = require("./register");

const middlewares = [auth, login, register, ...users, ...orders];

module.exports = middlewares;
