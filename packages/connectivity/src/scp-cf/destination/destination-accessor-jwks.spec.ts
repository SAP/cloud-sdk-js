import nock from 'nock';
import {
  customSubscriberUserToken,
  mockFetchDestinationCalls,
  mockServiceBindings,
  mockServiceToken,
  oauthMultipleResponse,
  providerServiceToken
} from '../../../../../test-resources/test/test-util';
import { alwaysProvider } from './destination-selection-strategies';
import { getDestination } from './destination-accessor';
import type { DestinationFetchOptions } from './destination-accessor-types';
import type { DestinationConfiguration } from './destination';

describe('custom JWTs', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockServiceToken();
  });

  afterEach(() => {
    nock.cleanAll();
    jest.resetAllMocks();
  });

  const destFetchOption: DestinationFetchOptions = {
    destinationName: 'FINAL-DESTINATION',
    iasToXsuaaTokenExchange: false
  };

  function mockOneDestination(
    destination: DestinationConfiguration,
    serviceToken: string,
    userJwt: string
  ) {
    mockFetchDestinationCalls(destination, {
      serviceToken,
      mockWithTokenRetrievalCall: {
        headers: { 'x-user-token': userJwt }
      }
    });
  }

  it('throws an error if jwks properties are not given in the destination', async () => {
    const userJwt = customSubscriberUserToken;
    const serviceJwt = providerServiceToken; // for custom JWT provider account is used

    mockOneDestination(oauthMultipleResponse[0], serviceJwt, userJwt);

    await expect(
      getDestination({
        ...destFetchOption,
        jwt: userJwt,
        selectionStrategy: alwaysProvider
      })
    ).rejects.toThrowError(
      'Failed to verify the JWT with no JKU! Destination must have `x_user_token.jwks` or `x_user_token.jwks_uri` property.'
    );
  });

  it('returns a destination if jwks is present in the destination', async () => {
    const userJwt = customSubscriberUserToken;
    const serviceJwt = providerServiceToken; // for custom JWT provider account is used

    mockOneDestination(
      { ...oauthMultipleResponse[0], 'x_user_token.jwks': 'someDummyValue' },
      serviceJwt,
      userJwt
    );

    expect(
      await getDestination({
        ...destFetchOption,
        jwt: userJwt,
        selectionStrategy: alwaysProvider
      })
    ).not.toBeNull();
  });

  it('resolves if jwks_uri is present', async () => {
    const userJwt = customSubscriberUserToken;
    const serviceJwt = providerServiceToken; // for custom JWT provider account is used

    mockOneDestination(
      {
        ...oauthMultipleResponse[0],
        'x_user_token.jwks_uri': 'someDummyValue'
      },
      serviceJwt,
      userJwt
    );

    expect(
      await getDestination({
        ...destFetchOption,
        jwt: userJwt,
        selectionStrategy: alwaysProvider
      })
    ).not.toBeNull();
  });
});
