const jsonServer = require('json-server');
const index = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const customMiddlewares = require('./middleware');
const port = process.env.PORT || 3001;

index.use(middlewares);
index.use(jsonServer.bodyParser);
index.use(customMiddlewares);
index.use(router);
index.listen(port);
