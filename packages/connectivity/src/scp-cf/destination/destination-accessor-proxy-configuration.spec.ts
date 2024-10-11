import nock from 'nock';
import { createLogger } from '@sap-cloud-sdk/util';
import axios from 'axios';
import {
  connectivityProxyConfigMock,
  mockServiceBindings
} from '../../../../../test-resources/test/test-util/environment-mocks';
import {
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import {
  mockCertificateCall,
  mockVerifyJwt,
  mockFetchDestinationCalls
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  providerServiceToken,
  providerUserToken,
  subscriberServiceToken,
  subscriberUserToken
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  basicMultipleResponse,
  onPremisePrincipalPropagationMultipleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import { getDestination } from './destination-accessor';
import * as ProxyUtil from './http-proxy-util';
import { alwaysProvider } from './destination-selection-strategies';
import { destinationCache } from './destination-cache';
import { destinationServiceCache } from './destination-service-cache';
import type { Destination } from './destination-service-types';

describe('proxy configuration', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
  });

  afterEach(() => {
    delete process.env['https_proxy'];
    jest.restoreAllMocks();
  });

  it('should take the environment variable', async () => {
    jest
      .spyOn(axios, 'request')
      .mockImplementation(mockDestinationCalls(basicMultipleResponse[0]));

    process.env['https_proxy'] = 'some.proxy.com:1234';

    const destination = await getDestination({
      destinationName: 'FINAL-DESTINATION'
    });

    expect(destination?.proxyConfiguration).toEqual({
      host: 'some.proxy.com',
      protocol: 'http',
      port: 1234
    });
  });

  it('should ignore the proxy if the destination has proxy type "OnPremise"', async () => {
    jest
      .spyOn(axios, 'request')
      .mockImplementation(
        mockDestinationCalls(onPremisePrincipalPropagationMultipleResponse[0])
      );

    process.env['https_proxy'] = 'some.proxy.com:1234';

    const destination = await getDestination({
      destinationName: 'OnPremise',
      jwt: subscriberUserToken
    });

    expect(destination?.proxyConfiguration).toEqual({
      ...connectivityProxyConfigMock,
      headers: {
        'Proxy-Authorization': `Bearer ${subscriberServiceToken}`,
        'SAP-Connectivity-Authentication': `Bearer ${subscriberUserToken}`
      }
    });
  });
});

describe('get destination with PrivateLink proxy type', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockJwtBearerToken();

    mockFetchDestinationCalls(privateLinkDest, {
      serviceToken: subscriberServiceToken,
      mockWithTokenRetrievalCall: false
    });
  });

  afterEach(() => {
    destinationCache.clear();
    destinationServiceCache.clear();
    nock.cleanAll();
  });

  const privateLinkDest = {
    URL: 'https://subscriber.example',
    Name: 'PrivateLinkDest',
    ProxyType: 'PrivateLink',
    Authentication: 'NoAuthentication' as const
  };

  const receivePrivateLinkDest: Destination = {
    authTokens: [],
    authentication: 'NoAuthentication',
    certificates: [],
    forwardAuthToken: false,
    isTrustingAllCertificates: false,
    name: 'PrivateLinkDest',
    originalProperties: {
      Authentication: 'NoAuthentication',
      Name: 'PrivateLinkDest',
      ProxyType: 'PrivateLink',
      URL: 'https://subscriber.example'
    },
    proxyType: 'PrivateLink',
    url: 'https://subscriber.example'
  };

  it('should log that PrivateLink proxy type is used.', async () => {
    const logger = createLogger({
      package: 'connectivity',
      messageContext: 'proxy-util'
    });
    const debugSpy = jest.spyOn(logger, 'debug');

    await getDestination({
      destinationName: 'PrivateLinkDest',
      jwt: subscriberUserToken,
      cacheVerificationKeys: false
    });
    expect(debugSpy).toHaveBeenCalledWith(
      'PrivateLink destination proxy settings will be used. This is not supported in local/CI/CD environments.'
    );
  });

  it('should behave like internet proxy, so call addProxyConfigurationInternet but still use proxy type PrivateLink', async () => {
    const internetConfig = jest.spyOn(
      ProxyUtil,
      'addProxyConfigurationInternet'
    );

    const destinationFromFirstCall = await getDestination({
      destinationName: 'PrivateLinkDest',
      jwt: subscriberUserToken,
      cacheVerificationKeys: false
    });

    expect(destinationFromFirstCall?.proxyType).toBe('PrivateLink');
    expect(internetConfig).toHaveBeenCalledWith(receivePrivateLinkDest);
  });
});

describe('truststore configuration', () => {
  it('returns a destination with truststore', async () => {
    const destinationWithTrustStore = {
      Name: 'TrustStoreDestination',
      URL: 'some.example',
      TrustStoreLocation: 'my-cert.pem'
    };
    mockCertificateCall('my-cert.pem', providerServiceToken, 'subaccount');
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockJwtBearerToken();

    mockFetchDestinationCalls(destinationWithTrustStore, {
      mockWithTokenRetrievalCall: false
    });

    const actual = await getDestination({
      destinationName: 'TrustStoreDestination',
      jwt: providerUserToken,
      selectionStrategy: alwaysProvider,
      cacheVerificationKeys: false
    });
    expect(actual?.trustStoreCertificate).toEqual({
      name: 'my-cert.pem',
      content: expect.any(String),
      type: 'CERTIFICATE'
    });
  });
});

function mockDestinationCalls(
  destination: Destination
): (config: any) => Promise<any> {
  return async () => ({
    data: {
      owner: { SubaccountId: 'subaccount', InstanceId: null },
      destinationConfiguration: destination,
      authTokens: [
        {
          type: 'Bearer',
          value: 'token',
          expires_in: '3600',
          http_header: {
            key: 'Authorization',
            value: 'Bearer token'
          }
        }
      ]
    }
  });
}
