const { createProxyMiddleware } = require("http-proxy-middleware");

const context = ["/api"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
    target: "http://localhost:8081",
    secure: false,
  });

  app.use(appProxy);
};
