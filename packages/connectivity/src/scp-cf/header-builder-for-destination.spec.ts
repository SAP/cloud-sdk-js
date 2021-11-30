import { buildHeadersForDestination } from './header-builder-for-destination';
import { Destination } from './destination';

describe('header builder for destination', () => {
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
