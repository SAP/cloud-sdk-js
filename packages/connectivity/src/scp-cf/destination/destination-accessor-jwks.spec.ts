import nock from 'nock';
import {
  destinationName,
  destinationSingleResponse,
  mockInstanceDestinationsCall,
  mockServiceBindings,
  mockServiceToken,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt,
  oauthMultipleResponse,
  providerServiceTokenPayload,
  signedJwtForVerification,
  subscriberServiceTokenPayload,
  subscriberUserPayload
} from '../../../../../test-resources/test/test-util';
import * as jwt from '../jwt';
import { responseWithPublicKey } from '../jwt.spec';
import { DestinationFetchOptions } from './destination-accessor-types';
import {
  alwaysProvider,
  alwaysSubscriber
} from './destination-selection-strategies';
import { getDestination } from './destination-accessor';
import { DestinationConfiguration } from './destination';

const jku = 'https://my-jku-url.authentication.sap.hana.ondemand.com';

describe('custom jwt via jwks property on destination', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockVerifyJwt();
    mockServiceToken();
  });

  afterEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
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
    mockInstanceDestinationsCall(nock, [], 200, serviceToken);

    mockSubaccountDestinationsCall(nock, [destination], 200, serviceToken);

    mockSingleDestinationCall(
      nock,
      destinationSingleResponse([destination]),
      200,
      destinationName,
      { authorization: `Bearer ${serviceToken}`, 'x-user-token': userJwt },
      { badheaders: [] }
    );
  }

  it('verifies JWT with JKU property', async () => {
    nock(jku).get('/').reply(200, responseWithPublicKey());
    const userJwt = signedJwtForVerification(subscriberUserPayload, jku);
    const serviceJwt = signedJwtForVerification(
      subscriberServiceTokenPayload,
      jku
    );

    mockOneDestination({ ...oauthMultipleResponse[0] }, serviceJwt, userJwt);

    const spy = jest.spyOn(jwt, 'verifyJwt');
    const actual = await getDestination({
      ...destFetchOption,
      jwt: userJwt,
      selectionStrategy: alwaysSubscriber
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(actual).not.toBeNull();
  });

  it('does not verify JWT without JKU property', async () => {
    const userJwt = signedJwtForVerification(subscriberUserPayload, undefined);
    const serviceJwt = signedJwtForVerification(
      providerServiceTokenPayload,
      jku
    );

    mockOneDestination(
      { ...oauthMultipleResponse[0], 'x_user_token.jwks': 'someDummyValue' },
      serviceJwt,
      userJwt
    );

    const spy = jest.spyOn(jwt, 'verifyJwt');
    const actual = await getDestination({
      ...destFetchOption,
      jwt: userJwt,
      selectionStrategy: alwaysProvider
    });
    expect(spy).toHaveBeenCalledTimes(0);
    expect(actual).not.toBeNull();
  });

  it('does not verify JWT if JKU property does not match uaa domain', async () => {
    const userJwt = signedJwtForVerification(
      subscriberUserPayload,
      'http://not-uaa-domain.com'
    );
    const serviceJwt = signedJwtForVerification(
      providerServiceTokenPayload,
      jku
    );

    mockOneDestination(
      { ...oauthMultipleResponse[0], 'x_user_token.jwks': 'someDummyValue' },
      serviceJwt,
      userJwt
    );

    const spy = jest.spyOn(jwt, 'verifyJwt');
    const actual = await getDestination({
      ...destFetchOption,
      jwt: userJwt,
      selectionStrategy: alwaysProvider
    });
    expect(spy).toHaveBeenCalledTimes(0);
    expect(actual).not.toBeNull();
  });

  it('throws an error if jwks properties are not given for JWT without JKU', async () => {
    const userJwt = signedJwtForVerification(subscriberUserPayload, undefined);
    const serviceJwt = signedJwtForVerification(
      providerServiceTokenPayload,
      jku
    );

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

  it('resolves if jwks is present', async () => {
    const userJwt = signedJwtForVerification(subscriberUserPayload, undefined);
    const serviceJwt = signedJwtForVerification(
      providerServiceTokenPayload, // for custom JWT provider account is used
      jku
    );

    mockOneDestination(
      { ...oauthMultipleResponse[0], 'x_user_token.jwks': 'someDummyValue' },
      serviceJwt,
      userJwt
    );

    const actual = await getDestination({
      ...destFetchOption,
      jwt: userJwt,
      selectionStrategy: alwaysProvider
    });
    expect(actual).not.toBeNull();
  });

  it('resolves if jwks_uri is present', async () => {
    const userJwt = signedJwtForVerification(subscriberUserPayload, undefined);
    const serviceJwt = signedJwtForVerification(
      providerServiceTokenPayload, // for custom JWT provider account is used
      jku
    );

    mockOneDestination(
      {
        ...oauthMultipleResponse[0],
        'x_user_token.jwks_uri': 'someDummyValue'
      },
      serviceJwt,
      userJwt
    );

    const actual = await getDestination({
      ...destFetchOption,
      jwt: userJwt,
      selectionStrategy: alwaysProvider
    });
    expect(actual).not.toBeNull();
  });
});
