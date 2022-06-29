const { jsonServer, server, router } = require('./config');
const middlewares = jsonServer.defaults();
const customMiddlewares = require('./middleware');
const port = process.env.PORT || 4000;

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(customMiddlewares);
server.use(router);
server.listen(port, () => {
  console.clear();
  console.log('started')
});

