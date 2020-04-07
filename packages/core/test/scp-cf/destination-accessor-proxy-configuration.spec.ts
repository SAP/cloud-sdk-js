/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  mockedConnectivityServiceProxyConfig,
  mockServiceBindings
} from '../test-util/environment-mocks';
import {
  mockServiceToken,
  mockUserApprovedServiceToken
} from '../test-util/token-accessor-mocks';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../test-util/destination-service-mocks';
import {
  providerServiceToken,
  subscriberServiceToken,
  subscriberUserJwt
} from '../test-util/mocked-access-tokens';
import {
  basicMultipleResponse,
  destinationName,
  onPremiseMultipleResponse
} from '../test-util/example-destination-service-responses';
import { getDestination, parseDestination } from '../../src/scp-cf';
import { Protocol } from '../../src/request-builder';
import { muteLoggers } from '../test-util/mute-logger';

describe('proxy configuration', () => {
  afterEach(() => {
    delete process.env['https_proxy'];
  });

  beforeAll(() => {
    muteLoggers('destination-accessor', 'proxy-util', 'jwt');
  });

  it('should take the enviorment varaible.', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockUserApprovedServiceToken();

    mockInstanceDestinationsCall([], 200, subscriberServiceToken);
    mockInstanceDestinationsCall([], 200, providerServiceToken);
    mockSubaccountDestinationsCall([], 200, providerServiceToken);

    mockSubaccountDestinationsCall(
      basicMultipleResponse,
      200,
      subscriberServiceToken
    );
    mockSingleDestinationCall(
      basicMultipleResponse[0],
      200,
      destinationName,
      subscriberServiceToken
    );
    process.env['https_proxy'] = 'some.proxy.com:1234';

    const actual = await getDestination(destinationName, {
      userJwt: subscriberServiceToken,
      cacheVerificationKeys: false
    });
    expect(actual?.proxyConfiguration).toEqual({
      host: 'some.proxy.com',
      protocol: Protocol.HTTP,
      port: 1234
    });
  });

  it('should ignore the proxy if the destination is onPrem type.', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockUserApprovedServiceToken();

    mockInstanceDestinationsCall(
      onPremiseMultipleResponse,
      200,
      subscriberServiceToken
    );
    mockInstanceDestinationsCall([], 200, providerServiceToken);
    mockSubaccountDestinationsCall([], 200, providerServiceToken);
    mockSubaccountDestinationsCall([], 200, subscriberServiceToken);

    process.env['https_proxy'] = 'some.proxy.com:1234';
    const expected = {
      ...mockedConnectivityServiceProxyConfig,
      headers: {
        'Proxy-Authorization': `Bearer ${subscriberServiceToken}`,
        'SAP-Connectivity-Authentication': `Bearer ${subscriberServiceToken}`
      }
    };

    const actual = await getDestination('OnPremise', {
      userJwt: subscriberServiceToken,
      cacheVerificationKeys: false
    });
    expect(actual?.proxyConfiguration).toEqual(expected);
  });

  it('returns a destination with a connectivity service proxy configuration when ProxyType equals "OnPremise"', async () => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();

    const httpMocks = [
      mockSubaccountDestinationsCall(
        onPremiseMultipleResponse,
        200,
        subscriberServiceToken
      ),
      mockInstanceDestinationsCall([], 200, providerServiceToken),
      mockSubaccountDestinationsCall([], 200, providerServiceToken),
      mockInstanceDestinationsCall([], 200, subscriberServiceToken)
    ];

    const expected = {
      ...parseDestination({
        Name: 'OnPremise',
        URL: 'my.on.premise.system:54321',
        ProxyType: 'OnPremise',
        Authentication: 'NoAuthentication'
      }),
      proxyConfiguration: {
        ...mockedConnectivityServiceProxyConfig,
        headers: {
          'Proxy-Authorization': `Bearer ${subscriberServiceToken}`,
          'SAP-Connectivity-Authentication': `Bearer ${subscriberUserJwt}`
        }
      }
    };
    const actual = await getDestination('OnPremise', {
      userJwt: subscriberUserJwt
    });
    expect(actual).toEqual(expected);
    httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
  });
});
