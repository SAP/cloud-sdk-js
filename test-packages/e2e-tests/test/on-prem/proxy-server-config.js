const proxyPort = 3100;
const proxyHost = 'localhost';
const proxyUser = 'user';
const proxyPassword = 'password';
const proxyBearAuth = 'Bear jwt';
const proxyBasicAuth = 'Basic dXNlcjpwYXNzd29yZA==';
const proxyHttpsUrl = `https://${proxyUser}:${proxyPassword}@${proxyHost}:${proxyPort}`;

module.exports = { proxyPort, proxyHost, proxyUser, proxyPassword, proxyBearAuth, proxyBasicAuth, proxyHttpsUrl };
