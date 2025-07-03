import {
  mockServiceBindings,
  mockServiceToken,
  mockFetchDestinationCalls,
  providerServiceToken
} from '../../../../../test-resources/test/test-util';
import { getDestinationFromDestinationService } from './destination-from-service';

describe('getDestinationFromDestinationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockServiceBindings();
    mockServiceToken();
  });

  it('adds JWT to destination, when `forwardAuthToken` is set (NoAuthentication)', async () => {
    const destination = {
      URL: 'https://example.com',
      Name: 'FORWARD',
      ProxyType: 'Internet',
      Authentication: 'NoAuthentication' as const,
      forwardAuthToken: 'true'
    };

    mockFetchDestinationCalls(destination, {
      mockWithTokenRetrievalCall: false
    });

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
      Authentication: 'OAuth2ClientCredentials' as const,
      forwardAuthToken: 'true'
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, authFlowCall] = mockFetchDestinationCalls(destination);

    await getDestinationFromDestinationService({
      destinationName: 'FORWARD',
      jwt: providerServiceToken
    });

    // Without `forwardAuthToken` this test would require an additional single subaccount destination call
    expect(authFlowCall.isDone()).toBe(false);
  });
});
