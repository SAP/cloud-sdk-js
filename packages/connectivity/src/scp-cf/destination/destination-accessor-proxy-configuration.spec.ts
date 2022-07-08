import nock from 'nock';
import { createLogger } from '@sap-cloud-sdk/util';
import { wrapJwtInHeader } from '@sap-cloud-sdk/connectivity/dist/scp-cf';
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
  mockSingleDestinationCallSkipCredentials
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  providerServiceToken,
  providerUserJwt,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  basicSingleResponse,
  destinationName,
  destinationSingleResponse,
  onPremiseNoAuthSingleResponse,
  onPremisePrincipalPropagationSingleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import { Protocol } from '../protocol';
import { getDestination } from './destination-accessor';
import * as ProxyUtil from './proxy-util';
import { alwaysProvider } from './destination-selection-strategies';
import { AuthenticationType, Destination } from './destination-service-types';
import { destinationCache } from './destination-cache';
import { destinationServiceCache } from './destination-service-cache';

describe('proxy configuration', () => {
  afterEach(() => {
    delete process.env['https_proxy'];
  });

  it('should take the environment variable.', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockJwtBearerToken();

    const httpMocks = [
      mockSingleDestinationCallSkipCredentials(
        nock,
        basicSingleResponse,
        destinationName,
        wrapJwtInHeader(subscriberServiceToken)
      )
    ];
    process.env['https_proxy'] = 'some.proxy.com:1234';

    const actual = await getDestination({
      destinationName,
      jwt: subscriberServiceToken,
      cacheVerificationKeys: false,
      iasToXsuaaTokenExchange: false
    });
    expect(actual?.proxyConfiguration).toEqual({
      host: 'some.proxy.com',
      protocol: Protocol.HTTP,
      port: 1234
    });
    httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
  });

  it('should ignore the proxy if the destination is onPrem type.', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockJwtBearerToken();

    const httpMocks = [
      mockSingleDestinationCallSkipCredentials(
        nock,
        onPremisePrincipalPropagationSingleResponse,
        'OnPremise',
        wrapJwtInHeader(subscriberServiceToken)
      )
    ];

    process.env['https_proxy'] = 'some.proxy.com:1234';
    const expected = {
      ...connectivityProxyConfigMock,
      headers: {
        'Proxy-Authorization': `Bearer ${subscriberServiceToken}`,
        'SAP-Connectivity-Authentication': `Bearer ${subscriberServiceToken}`
      }
    };

    const actual = await getDestination({
      destinationName: 'OnPremise',
      jwt: subscriberServiceToken,
      cacheVerificationKeys: false,
      iasToXsuaaTokenExchange: false
    });
    expect(actual?.proxyConfiguration).toEqual(expected);
    httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
  });

  it('returns a destination with a connectivity service proxy configuration when ProxyType equals "OnPremise"', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();

    const httpMocks = [
      mockSingleDestinationCallSkipCredentials(
        nock,
        onPremiseNoAuthSingleResponse,
        'OnPremise',
        wrapJwtInHeader(providerServiceToken)
      )
    ];

    const actual = await getDestination({ destinationName: 'OnPremise' });
    expect(actual).toEqual(
      expect.objectContaining({
        name: 'OnPremise',
        url: 'my.on.premise.system:54321',
        proxyType: 'OnPremise',
        authentication: 'NoAuthentication'
      })
    );
    expect(actual?.proxyConfiguration).toEqual({
      ...connectivityProxyConfigMock,
      headers: {
        'Proxy-Authorization': `Bearer ${providerServiceToken}`
      }
    });
    httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
  });
});

describe('get destination with PrivateLink proxy type', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockJwtBearerToken();
    const singleDestResponse = {
      ...destinationSingleResponse([privateLinkDest]),
      authTokens: []
    };
    mockSingleDestinationCallSkipCredentials(
      nock,
      singleDestResponse,
      privateLinkDest.Name,
      wrapJwtInHeader(subscriberServiceToken)
    );
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
    Authentication: 'NoAuthentication' as AuthenticationType
  };

  const receivePrivateLinkDest: Destination = {
    authTokens: [],
    authentication: 'NoAuthentication',
    certificates: [],
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
      jwt: subscriberUserJwt,
      cacheVerificationKeys: false,
      iasToXsuaaTokenExchange: false
    });
    expect(debugSpy).toBeCalledWith(
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
      jwt: subscriberUserJwt,
      cacheVerificationKeys: false,
      iasToXsuaaTokenExchange: false
    });

    expect(destinationFromFirstCall?.proxyType).toBe('PrivateLink');
    expect(internetConfig).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'PrivateLinkDest' })
    );
  });
});

describe('truststore configuration', () => {
  it('returns a destination with truststore', async () => {
    const destinationWithTrustStore = {
      Name: 'TrustStoreDestination',
      URL: 'some.example',
      TrustStoreLocation: 'my-cert.pem'
    };
    mockCertificateCall(
      nock,
      'my-cert.pem',
      providerServiceToken,
      'subaccount'
    );
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockJwtBearerToken();
    mockSingleDestinationCallSkipCredentials(
      nock,
      destinationSingleResponse([destinationWithTrustStore]),
      destinationWithTrustStore.Name,
      wrapJwtInHeader(providerServiceToken)
    );
    const actual = await getDestination({
      destinationName: 'TrustStoreDestination',
      jwt: providerUserJwt,
      selectionStrategy: alwaysProvider,
      cacheVerificationKeys: false,
      iasToXsuaaTokenExchange: false
    });
    expect(actual?.trustStoreCertificate).toEqual({
      name: 'my-cert.pem',
      content: expect.any(String),
      type: 'CERTIFICATE'
    });
  });
});
