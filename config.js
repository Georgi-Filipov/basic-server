const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');

const JST_SECRET = 'jwt-secret-key-code-area-api';

module.exports = { jsonServer, server, router, JST_SECRET };
