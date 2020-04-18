/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MapType } from '@sap-cloud-sdk/util';
import { buildHeadersForDestination, Destination } from '../../../src';
import { muteLoggers } from '../../test-util/mute-logger';
import { buildAuthorizationHeader } from '../../../src/request-builder/header-builder/auth-headers';

describe('Authorization header builder', () => {
  beforeAll(() => {
    muteLoggers('auth-headers');
  });

  it('does not throw on NoAuthentication', async () => {
    await expect(
      buildAuthorizationHeader({
        url: 'https://example.com',
        authentication: 'NoAuthentication'
      })
    ).resolves.not.toThrow();
  });

  it('does not throw on ClientCertificateAuthentication', async () => {
    await expect(
      buildAuthorizationHeader({
        url: 'https://example.com',
        authentication: 'ClientCertificateAuthentication'
      })
    ).resolves.not.toThrow();
  });

  it('defaults to NoAuthentication', async () => {
    await expect(
      buildAuthorizationHeader({ url: 'https://example.com' })
    ).resolves.not.toThrow();
  });

  it('does not throw on Principal Propagation', async () => {
    const destination = {
      authentication: 'PrincipalPropagation',
      proxyType: 'OnPremise',
      proxyConfiguration: {
        headers: {
          'SAP-Connectivity-Authentication': 'someValue',
          'Proxy-Authorization': 'someProxyValue'
        }
      }
    } as Destination;

    const headers = await buildAuthorizationHeader(destination);
    checkHeaders(headers);

    delete destination!.proxyConfiguration!.headers![
      'SAP-Connectivity-Authentication'
    ];
    await expect(
      buildAuthorizationHeader(destination)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should still add header if the old 'NoAuthorization' workaround is used.", async () => {
    const destination = {
      authentication: 'NoAuthentication',
      proxyType: 'OnPremise',
      proxyConfiguration: {
        headers: {
          'SAP-Connectivity-Authentication': 'someValue',
          'Proxy-Authorization': 'someProxyValue'
        }
      }
    } as Destination;

    const headers = await buildHeadersForDestination(destination);
    checkHeaders(headers);
  });

  function checkHeaders(headers: MapType<any>) {
    expect(headers['SAP-Connectivity-Authentication']).toBe('someValue');
    expect(headers['Proxy-Authorization']).toBe('someProxyValue');
  }
});
