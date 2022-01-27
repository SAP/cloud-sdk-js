import nock from 'nock';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  connectivityProxyConfigMock,
  mockServiceBindings
} from '../../../../../test-resources/test/test-util/environment-mocks';
import {
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import {
  mockInstanceDestinationsCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  providerServiceToken,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  basicMultipleResponse,
  destinationName,
  onPremiseMultipleResponse,
  onPremisePrincipalPropagationMultipleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import { Protocol } from '../protocol';
import { getDestination } from './destination-accessor';
import { parseDestination } from './destination';
import * as ProxyUtil from './proxy-util';
import { Destination, destinationCache, destinationServiceCache } from '.';

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
      mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
      mockSubaccountDestinationsCall(
        nock,
        basicMultipleResponse,
        200,
        subscriberServiceToken
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
      mockInstanceDestinationsCall(
        nock,
        onPremisePrincipalPropagationMultipleResponse,
        200,
        subscriberServiceToken
      ),
      mockSubaccountDestinationsCall(nock, [], 200, subscriberServiceToken)
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
      mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
      mockSubaccountDestinationsCall(
        nock,
        onPremiseMultipleResponse,
        200,
        providerServiceToken
      )
    ];

    const expected = {
      ...parseDestination({
        Name: 'OnPremise',
        URL: 'my.on.premise.system:54321',
        ProxyType: 'OnPremise',
        Authentication: 'NoAuthentication'
      }),
      proxyConfiguration: {
        ...connectivityProxyConfigMock,
        headers: {
          'Proxy-Authorization': `Bearer ${providerServiceToken}`
        }
      }
    };
    const actual = await getDestination({ destinationName: 'OnPremise' });
    expect(actual).toEqual(expected);
    httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
  });
});

describe('get destination with PrivateLink proxy type', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockJwtBearerToken();

    mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken);
    mockSubaccountDestinationsCall(
      nock,
      [privateLinkDest],
      200,
      subscriberServiceToken
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
    Authentication: 'NoAuthentication'
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
    const info = jest.spyOn(logger, 'info');

    await getDestination({
      destinationName: 'PrivateLinkDest',
      jwt: subscriberUserJwt,
      cacheVerificationKeys: false,
      iasToXsuaaTokenExchange: false
    });
    expect(info).toBeCalledWith(
      'PrivateLink destination proxy settings will be used.'
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
    expect(internetConfig).toHaveBeenCalledWith(receivePrivateLinkDest);
  });
});
