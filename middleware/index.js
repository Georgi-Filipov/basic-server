const users = require("./users");
const orders = require("./orders");
const auth = require("./auth");
const login = require("./login");
const register = require("./register");
// const { router } = require("../config");
//
// const ownersIds = [0, 20, 40, 60, 80];
// const managersIds = [1, 7, 23, 36, 55, 61, 68, 81, 93, 96];
//
// const emp = router.db.get('employees').value().map(({ relatedId, ...el }) => el);
//
// const owners = emp.filter((_, idx) => ownersIds.includes(idx));
// const managers = emp.filter((_, idx) => managersIds.includes(idx)).map((el, idx) => ({
//   ...el,
//   relatedId: emp[ownersIds[Math.floor(Math.random() * ownersIds.length)]].uuid,
// }));
// const employees = emp.filter((_, idx) => ![...ownersIds, ...managersIds].includes(idx)).map((el, idx) => ({
//   ...el,
//   relatedId: emp[managersIds[Math.floor(Math.random() *  managersIds.length)]].uuid,
// }));
//
// router.db.set('employees', [...employees, ...managers, ...owners]).write();

const middlewares = [auth, login, register, ...users, ...orders];

module.exports = middlewares;
