import nock from 'nock';
import {
  mockInstanceDestinationsCall,
  mockServiceBindings,
  mockServiceToken,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt,
  providerServiceToken
} from '../../../../../test-resources/test/test-util';
import { getDestinationFromDestinationService } from './destination-from-service';

describe('getDestinationFromDestinationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
    mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
  });

  it('adds JWT to destination, when `forwardAuthToken` is set (NoAuthentication)', async () => {
    const destination = {
      URL: 'https://example.com',
      Name: 'FORWARD',
      ProxyType: 'Internet',
      Authentication: 'NoAuthentication',
      forwardAuthToken: 'true'
    };
    mockSubaccountDestinationsCall(
      nock,
      [destination],
      200,
      providerServiceToken
    );

    const retrievedDestination = await getDestinationFromDestinationService({
      destinationName: 'FORWARD',
      jwt: providerServiceToken
    });
    expect(retrievedDestination?.forwardAuthToken).toBe(true);
    expect(retrievedDestination?.authTokens?.[0].value).toEqual(
      providerServiceToken
    );
  });

  it('does not execute additional auth flows, if `forwardAuthToken` is set (e.g. OAuth2ClientCredentials)', async () => {
    const destination = {
      URL: 'https://example.com',
      Name: 'FORWARD',
      ProxyType: 'Internet',
      Authentication: 'OAuth2ClientCredentials',
      forwardAuthToken: 'true'
    };
    mockSubaccountDestinationsCall(
      nock,
      [destination],
      200,
      providerServiceToken
    );

    const singleDestinationScope = mockSingleDestinationCall(
      nock,
      destination,
      200,
      'FORWARD',
      {},
      { badheaders: [] }
    );

    await getDestinationFromDestinationService({
      destinationName: 'FORWARD',
      jwt: providerServiceToken
    });

    // Without `forwardAuthToken` this test would require an additional single subaccount destination call
    expect(singleDestinationScope.isDone()).toBe(false);
  });
});
