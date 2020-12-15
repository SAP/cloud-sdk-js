import nock from 'nock';
import { mockedConnectivityServiceProxyConfig } from '../../test/test-util/environment-mocks';
import {
  defaultDestination,
  mockHeaderRequest
} from '../../test/test-util/request-mocker';
import {
  createGetAllRequest,
  createUpdateRequest,
  createCreateRequest
} from '../../test/test-util/create-requests';
import { Destination } from '../connectivity';
import * as csrfHeaders from '../connectivity/scp-cf/csrf-token-header';
import { buildHeaders } from './header-builder';

describe('Header-Builder', () => {
  it('customHeaders are not overwritten.', async () => {
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

  it('Adds location id headers to the fetch csrf token request if there is a cloudConnectorLocationId in the destination', async () => {
    const destination: Destination = {
      url: 'https://destination.example.com',
      cloudConnectorLocationId: 'Potsdam'
    };

    const mockedHeaders = {
      'x-csrf-token': 'mocked-x-csrf-token',
      'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
    };

    nock('https://destination.example.com', {
      reqheaders: {
        'sap-connectivity-scc-location_id': 'Potsdam',
        'x-csrf-token': 'Fetch'
      }
    })
      .get('/sap/opu/odata/sap/API_TEST_SRV')
      .reply(200, undefined, mockedHeaders);

    const request = createCreateRequest(destination);
    const headers = await request.headers();

    expect(headers['SAP-Connectivity-SCC-Location_ID']).toBe('Potsdam');
    expect(headers['x-csrf-token']).toBe('mocked-x-csrf-token');
  });

  it('Fetching CSRF tokens works even if the endpoint responds with a non-200 HTTP code', async () => {
    const request = createCreateRequest(defaultDestination);

    mockHeaderRequest({ request });

    const headers = await request.headers();
    expect(headers['x-csrf-token']).toBe('mocked-x-csrf-token');
  });

  it('Skips csrf token retrieval for existing csrf header', async () => {
    spyOn(csrfHeaders, 'buildCsrfHeaders');
    const request = createCreateRequest(defaultDestination);
    request.config.customHeaders = { 'x-csrf-token': 'defined' };

    mockHeaderRequest({ request });

    await request.headers();
    expect(csrfHeaders.buildCsrfHeaders).not.toHaveBeenCalled();
  });

  it('Skips csrf token retrieval for GET request', async () => {
    spyOn(csrfHeaders, 'buildCsrfHeaders');
    const request = createGetAllRequest(defaultDestination);

    mockHeaderRequest({ request });

    await request.headers();
    expect(csrfHeaders.buildCsrfHeaders).not.toHaveBeenCalled();
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
