// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = async () => {
  delete process.env['http_proxy'];
  delete process.env['https_proxy'];
  delete process.env['HTTP_PROXY'];
  delete process.env['HTTPS_PROXY'];
};
