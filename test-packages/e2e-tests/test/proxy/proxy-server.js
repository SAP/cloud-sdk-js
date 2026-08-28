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
// [define proxy behaviour] use the path from the original request URL
app.use(
  '/',
  createProxyMiddleware({
    target: odataBaseUrl,
    changeOrigin: true,
    pathRewrite: (path) => {
      // http-proxy-middleware v4 (httpxy) passes the full absolute URL as path for proxy requests;
      // extract just the path+query portion so the target doesn't receive a double URL.
      try {
        const { pathname, search } = new URL(path);
        return pathname + search;
      } catch {
        return path;
      }
    }
  })
);

app.listen(proxyPort, proxyHost, () => {
  console.log(`Starting Proxy at ${proxyHost}:${proxyPort}`);
});
