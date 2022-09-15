const proxyPort = 3100;
const proxyHost = 'localhost';
const proxyUser = 'user';
const proxyPassword = 'password';
const proxyBearAuth = 'Bear jwt';
const proxyBasicAuth = 'Basic dXNlcjpwYXNzd29yZA==';
const proxyHttpUrl = `http://${proxyUser}:${proxyPassword}@${proxyHost}:${proxyPort}`;
const proxyHttpUrlNoAuth = `http://${proxyHost}:${proxyPort}`;

module.exports = { proxyPort, proxyHost, proxyUser, proxyPassword, proxyBearAuth, proxyBasicAuth, proxyHttpUrl, proxyHttpUrlNoAuth };
