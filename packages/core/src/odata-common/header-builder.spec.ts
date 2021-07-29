import { mockedConnectivityServiceProxyConfig } from '../../test/test-util/environment-mocks';
import {
  defaultDestination,
  mockHeaderRequest
} from '../../test/test-util/request-mocker';
import {
  createGetAllRequest,
  createUpdateRequest
} from '../../test/test-util/create-requests';
import { Destination } from '../connectivity';
import { buildHeaders } from './header-builder';

describe('Header-Builder', () => {
  it('customHeaders are not overwritten', async () => {
    const authString = 'initial';
    const request = createGetAllRequest(defaultDestination);
    request.config.customHeaders = { authorization: authString };

    const headers = await buildHeaders(request);
    expect(headers.authorization).toBe(authString);
  });

  it('uses authTokens if present on a destination', async () => {
    const destination: Destination = {
      ...defaultDestination,
      authentication: 'OAuth2SAMLBearerAssertion',
      authTokens: [
        {
          type: 'Bearer',
          value: 'some.token',
          expiresIn: '3600',
          error: null,
          http_header: {
            key: 'Authorization',
            value: 'Bearer some.token'
          }
        }
      ]
    };
    const request = createGetAllRequest(destination);
    const headers = await buildHeaders(request);

    expect(headers.authorization).toBe('Bearer some.token');
  });

  describe('update request header with etag', () => {
    it('if-match should not be set when no etag is specified', async () => {
      const request = createUpdateRequest(defaultDestination);

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBeUndefined();
    });

    it('if-match should be set when etag is specified in header-builder', async () => {
      const request = createUpdateRequest(defaultDestination);
      request.config.eTag = 'W//';

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBe('W//');
    });

    it('if-match should be set to * when version identifier is ignored', async () => {
      const request = createUpdateRequest(defaultDestination);
      request.config.eTag = 'W//';
      // Set by ignoreVersionIdentifier()
      request.config.versionIdentifierIgnored = true;

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBe('*');
    });
  });

  it('Adds proxy headers to the headers if there is a proxy configuration in the destination', async () => {
    const proxyHeaders = {
      'Proxy-Authorization': 'Bearer jwt',
      'SAP-Connectivity-Authentication': 'Bearer jwt'
    };

    const destination: Destination = {
      url: 'https://destination.example.com',
      proxyType: 'OnPremise',
      proxyConfiguration: {
        ...mockedConnectivityServiceProxyConfig,
        headers: proxyHeaders
      }
    };

    const request = createGetAllRequest(destination);
    const headers = await request.headers();

    expect(headers['Proxy-Authorization']).toBe('Bearer jwt');
    expect(headers['SAP-Connectivity-Authentication']).toBe('Bearer jwt');
  });

  it('Adds location id headers to the headers if there is a cloudConnectorLocationId in the destination', async () => {
    const destination: Destination = {
      url: 'https://destination.example.com',
      cloudConnectorLocationId: 'Potsdam'
    };

    const request = createGetAllRequest(destination);
    const headers = await request.headers();
    expect(headers['SAP-Connectivity-SCC-Location_ID']).toBe('Potsdam');
  });

  it('Prioritizes custom Authorization headers (upper case A)', async () => {
    const request = createGetAllRequest(defaultDestination);
    request.config.addCustomHeaders({
      Authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await request.headers();
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });

  it('Prioritizes custom Authorization headers (lower case A)', async () => {
    const request = createGetAllRequest(defaultDestination);
    request.config.addCustomHeaders({
      authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await request.headers();
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });
});
