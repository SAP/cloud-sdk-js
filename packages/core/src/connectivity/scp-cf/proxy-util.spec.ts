import { unmockAllTestDestinations } from '@sap-cloud-sdk/test-util';
import { createLogger } from '@sap-cloud-sdk/util';
import { Destination } from './destination';
import {
  addProxyConfigurationInternet,
  parseProxyEnv,
  ProxyStrategy,
  proxyStrategy
} from './proxy-util';
import { Protocol } from './protocol';
import { basicHeader } from './authorization-header';

describe('proxy-util', () => {
  afterEach(() => {
    ['http_proxy', 'https_proxy', 'no_proxy'].forEach(env => {
      delete process.env[env.toLowerCase()];
      delete process.env[env.toUpperCase()];
    });
    unmockAllTestDestinations();
  });

  const onPremDestination: Destination = {
    name: 'onPremDestination',
    url: 'https://my.system.com',
    proxyType: 'OnPremise'
  };

  const httpsDestination = {
    name: 'httpsDestination',
    url: 'https://example.com'
  };

  const httpDestination = {
    name: 'httpDestination',
    url: 'http://example.com'
  };

  it('should use proxy type OnPrem if the destination is onPrem - even if HTTP(S)_PROXY env are present.', () => {
    process.env['https_proxy'] = 'https://some.proxy.com:443';

    expect(proxyStrategy(onPremDestination)).toBe(
      ProxyStrategy.ON_PREMISE_PROXY
    );
    expect(addProxyConfigurationInternet(onPremDestination)).toStrictEqual({
      ...onPremDestination,
      proxyConfiguration: {
        protocol: Protocol.HTTPS,
        host: 'some.proxy.com',
        port: 443
      }
    });
  });

  it('should use no proxy if the destination URL is in the NO_PROXY list.', () => {
    process.env['https_proxy'] = 'https://some.proxy.com:4711';
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.INTERNET_PROXY);
    expect(addProxyConfigurationInternet(httpsDestination)).toStrictEqual({
      ...httpsDestination,
      proxyConfiguration: {
        protocol: Protocol.HTTPS,
        host: 'some.proxy.com',
        port: 4711
      }
    });

    process.env[
      'no_proxy'
    ] = `http://some.otherURL.com,${httpsDestination.url}`;
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.NO_PROXY);
  });

  it('should use internet proxy if an env variable is set.', () => {
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.NO_PROXY);
    expect(proxyStrategy(httpDestination)).toBe(ProxyStrategy.NO_PROXY);

    process.env['https_proxy'] = 'envIsNowSet';
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.INTERNET_PROXY);

    process.env['http_proxy'] = 'envIsNowSet';
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.INTERNET_PROXY);
  });

  it('should use the proxy env with the  protocol indicated by the destination.', () => {
    process.env['https_proxy'] = 'http://some.https.proxy:1234';
    process.env['http_proxy'] = 'some.http.com';

    expect(addProxyConfigurationInternet(httpsDestination)).toStrictEqual({
      ...httpsDestination,
      proxyConfiguration: {
        protocol: Protocol.HTTP,
        host: 'some.https.proxy',
        port: 1234
      }
    });
    expect(addProxyConfigurationInternet(httpDestination)).toStrictEqual({
      ...httpDestination,
      proxyConfiguration: {
        protocol: Protocol.HTTP,
        host: 'some.http.com',
        port: 80
      }
    });
  });

  it('should include user/pwd from proxy to configuration.', () => {
    process.env['https_proxy'] = 'https://user:password@some.proxy.com:443';
    const userPwdEncoded = basicHeader('user', 'password');
    expect(addProxyConfigurationInternet(httpsDestination)).toStrictEqual({
      ...httpsDestination,
      proxyConfiguration: {
        protocol: Protocol.HTTPS,
        host: 'some.proxy.com',
        port: 443,
        headers: { 'Proxy-Authorization': userPwdEncoded }
      }
    });

    process.env['https_proxy'] = 'user:password@some.proxy.com';
    expect(addProxyConfigurationInternet(httpsDestination)).toStrictEqual({
      ...httpsDestination,
      proxyConfiguration: {
        protocol: Protocol.HTTP,
        host: 'some.proxy.com',
        port: 80,
        headers: { 'Proxy-Authorization': userPwdEncoded }
      }
    });
  });

  it('should allow for special characters in the user and password if they are percent encoded.', () => {
    const userPwdEncoded = basicHeader('us@er', 'pass:/word');
    process.env['https_proxy'] = 'https://us@er:pass:/word@some.proxy.com:443';
    expect(
      addProxyConfigurationInternet(httpsDestination).proxyConfiguration
    ).toBe(undefined);

    process.env['https_proxy'] =
      'https://us%40er:pass%3A%2Fword@some.proxy.com:443';
    expect(addProxyConfigurationInternet(httpsDestination)).toStrictEqual({
      ...httpsDestination,
      proxyConfiguration: {
        protocol: Protocol.HTTPS,
        host: 'some.proxy.com',
        port: 443,
        headers: { 'Proxy-Authorization': userPwdEncoded }
      }
    });
  });

  it('should work with lower and upper case env variables', () => {
    process.env['HTTPS_PROXY'] = 'https://some.proxy.com:443';
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.INTERNET_PROXY);
    process.env['NO_PROXY'] = `${httpsDestination.url}`;
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.NO_PROXY);
  });

  it('should ignore undefined and empty environment variables', () => {
    process.env['HTTPS_PROXY'] = 'https://some.proxy.com';
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.INTERNET_PROXY);
    expect(addProxyConfigurationInternet(httpsDestination)).toStrictEqual({
      ...httpsDestination,
      proxyConfiguration: {
        protocol: Protocol.HTTPS,
        host: 'some.proxy.com',
        port: 443
      }
    });

    process.env['HTTPS_PROXY'] = '';
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.NO_PROXY);
    expect(
      addProxyConfigurationInternet(httpsDestination).proxyConfiguration
    ).toBe(undefined);

    delete process.env['HTTPS_PROXY'];
    expect(proxyStrategy(httpsDestination)).toBe(ProxyStrategy.NO_PROXY);
    expect(
      addProxyConfigurationInternet(httpsDestination).proxyConfiguration
    ).toBe(undefined);
  });
});

describe('parseProxyEnv', () => {
  it('parses URL with "https:" protocol and hostname', () => {
    const logger = createLogger('proxy-util');
    const logSpy = spyOn(logger, 'info');
    expect(parseProxyEnv('https://some.proxy')).toEqual({
      protocol: 'https',
      host: 'some.proxy',
      port: 443
    });
    expect(logSpy).toHaveBeenCalledWith(
      'Using protocol "https:" to connect to a proxy. This is unusual but possible.'
    );
  });

  it('parses URL with "http:" protocol and hostname', () => {
    expect(parseProxyEnv('http://some.proxy')).toEqual({
      protocol: 'http',
      host: 'some.proxy',
      port: 80
    });
  });

  it('parses URL with only hostname', () => {
    const logger = createLogger('proxy-util');
    const logSpy = spyOn(logger, 'debug');
    expect(parseProxyEnv('some.proxy')).toEqual({
      protocol: 'http',
      host: 'some.proxy',
      port: 80
    });
    expect(logSpy).toHaveBeenCalledWith(
      'No protocol specified, using "http:".'
    );
  });

  it('parses URL with dashes in hostname', () => {
    expect(parseProxyEnv('some-proxy')).toEqual({
      protocol: 'http',
      host: 'some-proxy',
      port: 80
    });
  });

  it('returns undefined for unknown protocol and logs warning', () => {
    const logger = createLogger('proxy-util');
    const logSpy = spyOn(logger, 'warn');
    expect(parseProxyEnv('rtc://some.proxy:1234')).toBeUndefined();
    expect(logSpy).toHaveBeenCalledWith(
      'Could not parse proxy configuration from environment variable. Reason: Unsupported protocol "rtc:".'
    );
  });

  it('parses URL with hostname and port', () => {
    expect(parseProxyEnv('some.proxy:1234')).toEqual({
      protocol: 'http',
      host: 'some.proxy',
      port: 1234
    });
  });

  it('parses URL with protocol, hostname and port', () => {
    expect(parseProxyEnv('https://some.proxy:1234')).toEqual({
      protocol: 'https',
      host: 'some.proxy',
      port: 1234
    });
  });

  it('returns undefined for incorrect port', () => {
    expect(parseProxyEnv('some.proxy:12X34')).toBeUndefined();
  });

  it('parses URL with protocol, username, password, hostname and port', () => {
    expect(parseProxyEnv('https://user:password@some.proxy:1234')).toEqual({
      protocol: 'https',
      host: 'some.proxy',
      port: 1234,
      headers: { 'Proxy-Authorization': basicHeader('user', 'password') }
    });
  });

  it('parses URL with username, password, hostname and port', () => {
    expect(parseProxyEnv('user:password@some.proxy:1234')).toEqual({
      protocol: 'http',
      host: 'some.proxy',
      port: 1234,
      headers: { 'Proxy-Authorization': basicHeader('user', 'password') }
    });
  });

  it('parses URL with username, password, hostname', () => {
    expect(parseProxyEnv('user:password@some.proxy')).toEqual({
      protocol: 'http',
      host: 'some.proxy',
      port: 80,
      headers: { 'Proxy-Authorization': basicHeader('user', 'password') }
    });
  });

  it('parses URL with "@" in username and password', () => {
    expect(parseProxyEnv('us@er:pass@word@some.proxy')).toEqual({
      protocol: 'http',
      host: 'some.proxy',
      port: 80,
      headers: { 'Proxy-Authorization': basicHeader('us@er', 'pass@word') }
    });
  });

  it('parses URL with "-" in username and password', () => {
    expect(parseProxyEnv('us-er:pass-word@some.proxy:1234')).toEqual({
      protocol: 'http',
      host: 'some.proxy',
      port: 1234,
      headers: { 'Proxy-Authorization': basicHeader('us-er', 'pass-word') }
    });
  });

  it('recognizes password after first ":"', () => {
    expect(parseProxyEnv('us:er:pass:word@some.proxy')).toEqual({
      protocol: 'http',
      host: 'some.proxy',
      port: 80,
      headers: { 'Proxy-Authorization': basicHeader('us', 'er:pass:word') }
    });
  });

  it('accepts ":" in username when encoded', () => {
    expect(parseProxyEnv('us%3Aer:pass:word@some.proxy')).toEqual({
      protocol: 'http',
      host: 'some.proxy',
      port: 80,
      headers: { 'Proxy-Authorization': basicHeader('us:er', 'pass:word') }
    });
  });

  it('returns undefined if no password is given', () => {
    const logger = createLogger('proxy-util');
    const logSpy = spyOn(logger, 'warn');
    expect(parseProxyEnv('user@some.proxy')).toBeUndefined();
    expect(logSpy).toHaveBeenCalledWith(
      'Could not parse proxy configuration from environment variable. Reason: Password missing.'
    );
  });

  it('returns undefined for incorrect URL', () => {
    expect(parseProxyEnv('://some.proxy')).toBeUndefined();
  });

  it('parses IP', () => {
    expect(parseProxyEnv('127.0.0.0:8080')).toEqual({
      protocol: 'http',
      host: '127.0.0.0',
      port: 8080
    });
  });
});
