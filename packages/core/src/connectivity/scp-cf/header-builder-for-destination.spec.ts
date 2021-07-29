import { createLogger } from '@sap-cloud-sdk/util';
import { Destination } from './destination';
import { buildHeadersForDestination } from './header-builder-for-destination';
import { checkHeaders } from './authorization-header.spec';

describe('header builder for destination', () => {
  it('warns if the destination and request config contains authorization information', () => {
    const destination: Destination = {
      url: '',
      authentication: 'BasicAuthentication',
      username: 'SomeUser',
      password: 'SomePassword'
    };

    const logger = createLogger({
      package: 'core',
      messageContext: 'authorization-header'
    });
    const warnSpy = jest.spyOn(logger, 'warn');
    buildHeadersForDestination(destination, { authorization: 'SomeThing' });
    expect(warnSpy).toBeCalledWith(
      'Found custom authorization headers. The given destination also provides authorization headers. This might be unintended. The custom headers from the request config will be used.'
    );
  });

  it("should still add header if the old 'NoAuthorization' workaround is used", async () => {
    const destination = {
      url: '',
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

  it('adds location id headers if there is a cloudConnectorLocationId in the destination', async () => {
    const destination = {
      url: 'url',
      cloudConnectorLocationId: 'locationId'
    } as Destination;

    const headers = await buildHeadersForDestination(destination);
    expect(headers['SAP-Connectivity-SCC-Location_ID']).toEqual('locationId');
  });

  it('custom SAP headers take precedence over SDK built headers', async () => {
    const destination = {
      url: 'url',
      sapClient: 'destinationProperty'
    } as Destination;

    const headers = await buildHeadersForDestination(destination, {
      'sap-client': 'customHeader'
    });
    expect(headers['sap-client']).toEqual('customHeader');
  });

  it('destination SAP headers take precedence over SDK built headers', async () => {
    const destination = {
      url: 'url',
      sapClient: 'destinationProperty',
      headers: {
        'sap-client': 'destinationHeader'
      }
    } as Destination;

    const headers = await buildHeadersForDestination(destination);
    expect(headers['sap-client']).toEqual('destinationHeader');
  });

  it('custom SAP headers take precedence over destination headers', async () => {
    const destination = {
      url: 'url',
      sapClient: 'destinationProperty',
      headers: {
        'sap-client': 'destinationHeader'
      }
    } as Destination;

    const headers = await buildHeadersForDestination(destination, {
      'sap-client': 'customHeader'
    });
    expect(headers['sap-client']).toEqual('customHeader');
  });

  it('includes destination headers', async () => {
    const destination = {
      url: 'url',
      sapClient: 'destinationProperty',
      headers: {
        'some-header': 'some header',
        'header-to-overwrite': 'destinationHeader',
        'SAP-client': 'destinationHeader'
      }
    } as Destination;

    const headers = await buildHeadersForDestination(destination, {
      'sap-CLIENT': 'customHeader',
      'HEADER-to-overwrite': 'customHeader'
    });
    expect(headers).toEqual({
      'some-header': 'some header',
      'sap-CLIENT': 'customHeader',
      'HEADER-to-overwrite': 'customHeader'
    });
  });
});
