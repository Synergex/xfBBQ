var fs = require("fs"),
  https = require("https"),
  jsonServer = require("json-server"),
  server = jsonServer.create(),
  router = jsonServer.router("db.json"),
  middlewares = jsonServer.defaults();

// To generate self-signed certificate and private key:
// openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 120 -nodes
var options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem")
};

server.use(middlewares);
// Simulate delay on all requests
server.use(function(req, res, next) {
  setTimeout(next, 1000);
});
server.use(router);

https.createServer(options, server).listen(3002, function() {
  console.log("json-server started on port " + 3002);
});
