/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import {
  Destination,
  getAgentConfig,
  getProtocolOrDefault,
  getUrlProtocol,
  Protocol
} from '../../src';
import { proxyAgent } from '../../src/util/proxy-util';
import {
  mockedConnectivityServiceProxyConfig,
  mockedConnectivityServiceProxyURL
} from '../test-util/environment-mocks';

describe('createAgent', () => {
  const baseDestination: Destination = {
    url: 'https://destination.example.com',
    authentication: 'NoAuthentication'
  };

  const proxyDestination: Destination = {
    ...baseDestination,
    proxyConfiguration: {
      ...mockedConnectivityServiceProxyConfig,
      headers: {
        'Proxy-Authorization': 'Bearer jwt'
      }
    }
  };

  const trustAllDestination: Destination = {
    ...baseDestination,
    isTrustingAllCertificates: true
  };

  it('returns the default agent if neither a proxy configuration is present nor TrustAll is set', () => {
    const actual = getAgentConfig(baseDestination)['httpsAgent'];
    expect(actual.options.rejectUnauthorized).toBe(true);
  });

  it('returns a proxy agent if there is a proxy setting on the destination', () => {
    expect(getAgentConfig(proxyDestination)['httpsAgent']).toEqual(
      new HttpsProxyAgent(mockedConnectivityServiceProxyURL)
    );
  });

  it('returns a trustAll agent if TrustAll is configured', () => {
    const actual = getAgentConfig(trustAllDestination)['httpsAgent'];
    expect(actual.options.rejectUnauthorized).toBeFalsy();
  });

  it('returns a HTTP agent if a destination with http protocol URL is provided', () => {
    const destHttp = { url: 'http://localhost' };
    expect(getAgentConfig(destHttp)['httpAgent']).toHaveProperty(
      'protocol',
      'http:'
    );
  });

  it('returns a HTTP agent when passing HTTP destination with isTrustAll', () => {
    const destHttp = {
      url: 'http://localhost',
      isTrustingAllCertificates: true
    };
    expect(getAgentConfig(destHttp)['httpAgent']).toHaveProperty(
      'protocol',
      'http:'
    );
  });

  it('returns a proxy agent if a proxy setting and TrustAll are BOTH configured', () => {
    expect(
      getAgentConfig({ ...proxyDestination, ...trustAllDestination })[
        'httpsAgent'
      ]
    ).toEqual(new HttpsProxyAgent(mockedConnectivityServiceProxyURL));
  });

  it('should return the http protocol', () => {
    expect(getUrlProtocol({ url: 'http://test.com' })).toBe(Protocol.HTTP);
    expect(getUrlProtocol({ url: 'https://test.com' })).toBe(Protocol.HTTPS);
    expect(getUrlProtocol({ url: 'noProtocol.com' })).toBe(undefined);
    expect(getUrlProtocol({ url: 'rfc://unsupportedProtocol.com' })).toBe(
      'rfc'
    );
    expect(getUrlProtocol({ url: '://missingProtocol.com' })).toBe('');

    expect(getProtocolOrDefault({ url: 'http://test.com' })).toBe(
      Protocol.HTTP
    );
    expect(getProtocolOrDefault({ url: 'https://test.com' })).toBe(
      Protocol.HTTPS
    );
    expect(getProtocolOrDefault({ url: 'default.com' })).toBe(Protocol.HTTPS);

    expect(() => getProtocolOrDefault({ url: '://test.com' })).toThrowError(
      new Error(
        'Protocol of the provided destination (://test.com) is not supported! Currently only HTTP and HTTPS are supported.'
      )
    );
    expect(() => getProtocolOrDefault({ url: 'rfc://test.com' })).toThrowError(
      new Error(
        'Protocol of the provided destination (rfc://test.com) is not supported! Currently only HTTP and HTTPS are supported.'
      )
    );
  });

  it('should return a proxy-agent with the same protocol as the destination.', () => {
    const destHttpWithProxy: Destination = {
      url: 'http://example.com',
      proxyConfiguration: {
        host: 'some.host.com',
        port: 4711,
        protocol: Protocol.HTTPS,
        headers: undefined
      }
    };
    expect(proxyAgent(destHttpWithProxy)['httpAgent']).toStrictEqual(
      new HttpProxyAgent('https://some.host.com:4711')
    );

    const destHttpsWithProxy: Destination = {
      url: 'https://example.com',
      proxyConfiguration: {
        host: 'some.host.com',
        port: 4711,
        protocol: Protocol.HTTP,
        headers: undefined
      }
    };
    expect(proxyAgent(destHttpsWithProxy)['httpsAgent']).toStrictEqual(
      new HttpsProxyAgent('http://some.host.com:4711')
    );
  });

  it('returns an agent with certificate and passphrase set for a destination with authentication type ClientCertificateAuthentication', () => {
    const destination: Destination = {
      url: 'https://destination.example.com',
      authentication: 'ClientCertificateAuthentication',
      keyStoreName: 'cert.p12',
      keyStorePassword: 'password',
      certificates: [
        {
          name: 'cert.p12',
          content: 'base64string',
          type: 'CERTIFICATE'
        }
      ]
    };

    const expectedOptions = {
      rejectUnauthorized: true,
      passphrase: 'password',
      pfx: Buffer.from('base64string', 'base64')
    };

    expect(getAgentConfig(destination)['httpsAgent']['options']).toMatchObject(
      expectedOptions
    );
  });

  it('throws an error if the format is not supported', () => {
    const destination: Destination = {
      url: 'https://destination.example.com',
      authentication: 'ClientCertificateAuthentication',
      keyStoreName: 'cert.jks',
      keyStorePassword: 'password',
      certificates: [
        {
          name: 'cert.jks',
          content: 'base64string',
          type: 'CERTIFICATE'
        }
      ]
    };

    expect(() => getAgentConfig(destination)).toThrowError(
      "The format of the provided certificate cert.jks is not supported. Supported formats are: p12, pfx. You can convert Java Keystores (.jks, .keystore) into PKCS#12 keystores using the JVM's keytool CLI: keytool -importkeystore -srckeystore your-keystore.jks -destkeystore your-keystore.p12 -deststoretype pkcs12"
    );
  });

  it('throws an error if no certificate with the given name can be found', () => {
    const destination: Destination = {
      url: 'https://destination.example.com',
      authentication: 'ClientCertificateAuthentication',
      keyStoreName: 'cert.pfx',
      keyStorePassword: 'password',
      certificates: [
        {
          name: 'nope',
          content: 'base64string',
          type: 'CERTIFICATE'
        }
      ]
    };

    expect(() => getAgentConfig(destination)).toThrowError(
      'No certificate with name cert.pfx could be found on the destination!'
    );
  });

  // Check coverage
});

describe('getAgentConfig', () => {
  it('returns an object with key "httpsAgent" for destinations with protocol HTTPS', () => {
    const destination: Destination = {
      url: 'https://example.com'
    };

    expect(getAgentConfig(destination)['httpsAgent']).toBeDefined();
  });

  it('returns an object with key "httpAgent" for destinations with protocol HTTP', () => {
    const destination: Destination = {
      url: 'http://example.com'
    };

    expect(getAgentConfig(destination)['httpAgent']).toBeDefined();
  });

  it('returns an object with key "httpsAgent" for destinations without protocol', () => {
    const destination: Destination = {
      url: 'example.com'
    };

    expect(getAgentConfig(destination)['httpsAgent']).toBeDefined();
  });

  it('throws an error for unsupported protocols', () => {
    const destination: Destination = {
      url: 'rpc://example.com'
    };

    expect(() => getAgentConfig(destination)).toThrow();
  });
});
