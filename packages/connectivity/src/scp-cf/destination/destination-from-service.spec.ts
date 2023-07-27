import nock from 'nock';
import {
  mockInstanceDestinationsCall,
  mockServiceBindings,
  mockServiceToken,
  mockSubaccountDestinationsCall,
  mockVerifyJwt,
  providerServiceToken
} from '../../../../../test-resources/test/test-util';
import { getDestinationFromDestinationService } from './destination-from-service';

describe('getDestinationFromDestinationService', () => {
  let serviceTokenSpy;
  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceBindings();
    mockVerifyJwt();
    serviceTokenSpy = mockServiceToken();
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
    // Without `forwardAuthToken` this test would require an additional single subaccount destination call
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

    const retrievedDestination = await getDestinationFromDestinationService({
      destinationName: 'FORWARD',
      jwt: providerServiceToken
    });
    expect(retrievedDestination?.forwardAuthToken).toBe(true);
    expect(retrievedDestination?.authTokens?.[0].value).toEqual(
      providerServiceToken
    );
  });
});
