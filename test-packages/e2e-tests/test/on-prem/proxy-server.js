const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const {
  proxyBasicAuth,
  proxyBearAuth,
  proxyHost,
  proxyPort
} = require('./proxy-server-config');
const app = express();

const odataBaseUrl = 'http://localhost:4004';
// [define authorization] check the value of the "proxy-authorization" in the headers
app.use((req, res, next) => {
  if (
    req.headers['proxy-authorization'] === proxyBasicAuth ||
    req.headers['proxy-authorization'] === proxyBearAuth
  ) {
    next();
  } else {
    res.sendStatus(403);
  }
});
// [define proxy behaviour] use the "url" value from the original request
app.use(
  '/',
  createProxyMiddleware({
    target: odataBaseUrl,
    changeOrigin: true,
    pathRewrite: (path, req) => {
      return req.url;
    }
  })
);

app.listen(proxyPort, proxyHost, () => {
  console.log(`Starting Proxy at ${proxyHost}:${proxyPort}`);
});
