const { createProxyMiddleware } = require("http-proxy-middleware");

const context = ["/api"];

module.exports = function (app) {
  const appProxy = createProxyMiddleware(context, {
      target: "http://localhost:5292",
    secure: false,
  });

  app.use(appProxy);
};
