const users = require("./users");
const orders = require("./orders");
const auth = require("./auth");
const login = require("./login");
const register = require("./register");
const errorHandler = require("./errorHandler");

const middlewares = [auth, login, register, ...users, ...orders, errorHandler];

module.exports = middlewares;
