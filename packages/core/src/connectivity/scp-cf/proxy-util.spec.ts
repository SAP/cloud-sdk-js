import { unmockAllTestDestinations } from '@sap-cloud-sdk/test-util';
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

  it('should ignore undefined and empty environment varialbes', () => {
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

  describe('regex testing', () => {
    it('should parse the protocol with defaults', () => {
      expect(parseProxyEnv('use.Fallback.Protocol')?.protocol).toBe('http');
      expect(parseProxyEnv('://use.Fallback.Protocol')?.protocol).toBe('http');

      expect(parseProxyEnv('https://some.https.proxy')?.protocol).toBe('https');
      expect(
        parseProxyEnv('https://some.https.proxy.with.port:1234')?.protocol
      ).toBe('https');
      expect(parseProxyEnv('http://some.http.proxy')?.protocol).toBe('http');

      expect(
        parseProxyEnv('http://user:pwd@some.http.proxy.with.password:4711')
          ?.protocol
      ).toBe('http');
      expect(parseProxyEnv('rfc://unsupported.protocol.No.Proxy')).toBe(
        undefined
      );
    });

    it('should parse port with default', () => {
      expect(parseProxyEnv('use.Fallback.Port')?.port).toBe(80);
      expect(parseProxyEnv('://use.Fallback.Port')?.port).toBe(80);
      expect(parseProxyEnv('http://use.Fallback.Port')?.port).toBe(80);
      expect(
        parseProxyEnv('http://user:pwd@some.http.proxy.with.password')?.port
      ).toBe(80);
      expect(
        parseProxyEnv('https://user:pwd@some.http.proxy.with.password')?.port
      ).toBe(443);

      expect(parseProxyEnv('use.Fallback.Port:1234')?.port).toBe(1234);
      expect(parseProxyEnv('://use.Fallback.Port:1234')?.port).toBe(1234);
      expect(parseProxyEnv('http://use.Fallback.Port:1234')?.port).toBe(1234);
      expect(
        parseProxyEnv('http://user:pwd@some.http.proxy.with.password:1234')
          ?.port
      ).toBe(1234);

      expect(parseProxyEnv('no.Integer.port.No.Proxy:12X34')).toBe(undefined);
    });

    it('should parse host if environment value is ok', () => {
      expect(parseProxyEnv('some.host')?.host).toBe('some.host');
      expect(parseProxyEnv('http://some.host')?.host).toBe('some.host');
      expect(parseProxyEnv('http://some.host:1234')?.host).toBe('some.host');
      expect(parseProxyEnv('http://user:password@some.host:1234')?.host).toBe(
        'some.host'
      );
      expect(parseProxyEnv('user:password@some.host:1234')?.host).toBe(
        'some.host'
      );
      expect(parseProxyEnv('user:password@some.host')?.host).toBe('some.host');

      expect(parseProxyEnv('some-host')?.host).toBe('some-host');
      expect(parseProxyEnv('us-er:pass-word@some-host')?.host).toBe(
        'some-host'
      );

      expect(parseProxyEnv('so@me.host:1234')).toBe(undefined);
      expect(parseProxyEnv('user:password@so@me.host:1234')).toBe(undefined);
      expect(parseProxyEnv('://user:password@some.host:1234')).toBe(undefined);
    });

    it('should parse user and password', () => {
      const userPwdEncoded = basicHeader('user', 'password');
      expect(
        parseProxyEnv('user:password@some.proxy.com')!.headers![
          'Proxy-Authorization'
        ]
      ).toBe(userPwdEncoded);
      expect(
        parseProxyEnv('https://user:password@some.proxy.com')!.headers![
          'Proxy-Authorization'
        ]
      ).toBe(userPwdEncoded);
      expect(
        parseProxyEnv('user:password@some.proxy.com:443')!.headers![
          'Proxy-Authorization'
        ]
      ).toBe(userPwdEncoded);
      expect(
        parseProxyEnv('https://user:password@some.proxy.com:443')!.headers![
          'Proxy-Authorization'
        ]
      ).toBe(userPwdEncoded);

      expect(parseProxyEnv('password@some.proxy.com')).toBe(undefined);
      expect(parseProxyEnv('u@ser:password@some.proxy.com:443')).toBe(
        undefined
      );
    });
  });
});
