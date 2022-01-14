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

  it('includes destination headers', async () => {
    const destination = {
      url: 'url',
      sapClient: 'destinationProperty',
      headers: {
        'some-header': 'some header',
        'SAP-client': 'destinationHeader'
      }
    } as Destination;

    const headers = await buildHeadersForDestination(destination);
    expect(headers).toEqual({
      'some-header': 'some header',
      'SAP-client': 'destinationHeader'
    });
  });
});
