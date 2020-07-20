// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();

const news = require("./news.json");
const router = jsonServer.router(news);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Have all URLS prefixed with a /api
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);

server.use(router);
server.listen(4000, () => {
  console.log("JSON Server is running");
});