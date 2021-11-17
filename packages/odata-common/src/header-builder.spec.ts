import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  defaultDestination,
  mockHeaderRequest
} from '../../../test-resources/test-util/request-mocker';
import { connectivityProxyConfigMock } from '../../../test-resources/test-util/test-util/environment-mocks';
import { CommonEntity } from '../test/common-entity';
import {
  getAllRequestConfig,
  updateRequestConfig
} from '../test/common-request-config';
import { ODataRequest } from './request/odata-request';
import { buildHeaders } from './header-builder';

describe('Header-Builder', () => {
  it('customHeaders are not overwritten', async () => {
    const authString = 'initial';
    const request = new ODataRequest(getAllRequestConfig(), defaultDestination);
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
    const request = new ODataRequest(getAllRequestConfig(), destination);
    const headers = await buildHeaders(request);

    expect(headers.authorization).toBe('Bearer some.token');
  });

  const commonEntity = CommonEntity.builder().build();
  describe('update request header with ETag', () => {
    it('if-match should not be set when no ETag is specified', async () => {
      const request = new ODataRequest(
          updateRequestConfig({ payload: commonEntity }),
          defaultDestination
      );

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBeUndefined();
    });

    it('if-match should be set when ETag is specified in header-builder', async () => {
      const request = new ODataRequest(
          updateRequestConfig({ payload: commonEntity }),
          defaultDestination
      );
      request.config.eTag = 'W//';

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBe('W//');
    });

    it('if-match should be set to * when version identifier is ignored', async () => {
      const request = new ODataRequest(
          updateRequestConfig({ payload: commonEntity }),
          defaultDestination
      );
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
        ...connectivityProxyConfigMock,
        headers: proxyHeaders
      }
    };

    const request = new ODataRequest(getAllRequestConfig(), destination);
    const headers = await request.headers();

    expect(headers['Proxy-Authorization']).toBe('Bearer jwt');
    expect(headers['SAP-Connectivity-Authentication']).toBe('Bearer jwt');
  });

  it('Adds location id headers to the headers if there is a cloudConnectorLocationId in the destination', async () => {
    const destination: Destination = {
      url: 'https://destination.example.com',
      cloudConnectorLocationId: 'Potsdam'
    };

    const request = new ODataRequest(getAllRequestConfig(), destination);
    const headers = await request.headers();
    expect(headers['SAP-Connectivity-SCC-Location_ID']).toBe('Potsdam');
  });

  it('Prioritizes custom Authorization headers (upper case A)', async () => {
    const request = new ODataRequest(getAllRequestConfig(), defaultDestination);
    request.config.addCustomHeaders({
      Authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await request.headers();
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });

  it('Prioritizes custom Authorization headers (lower case A)', async () => {
    const request = new ODataRequest(getAllRequestConfig(), defaultDestination);
    request.config.addCustomHeaders({
      authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await request.headers();
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });
});
