const users = require("./users");
const orders = require("./orders");

const middlewares = [...users, ...orders];

module.exports = middlewares;
