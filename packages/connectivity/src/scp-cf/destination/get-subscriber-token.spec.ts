import {
  customSubscriberUserJwt,
  mockServiceBindings,
  onlyIssuerServiceToken,
  onlyIssuerXsuaaUrl,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../../../test-resources/test/test-util';
import * as tokenAccessor from '../token-accessor';
import * as jwtModule from '../jwt';
import { getJwtPair } from '../jwt';
import { getSubscriberToken } from './get-subscriber-token';

describe('getSubscriberToken()', () => {
  beforeAll(() => {
    mockServiceBindings();
  });

  let verifyJwtSpy;
  beforeEach(() => {
    mockServiceBindings();
    verifyJwtSpy = jest
      .spyOn(jwtModule, 'verifyJwt')
      .mockResolvedValue(undefined as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates user and service token based on user JWT (XSUAA)', async () => {
    jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockResolvedValue(subscriberServiceToken);
    const token = await getSubscriberToken({ jwt: subscriberUserJwt });
    expect(token).toEqual({
      userJwt: getJwtPair(subscriberUserJwt),
      serviceJwt: getJwtPair(subscriberServiceToken)
    });
    expect(verifyJwtSpy).toHaveBeenCalled();
  });

  it('creates only user token based on user JWT (custom)', async () => {
    const token = await getSubscriberToken({ jwt: customSubscriberUserJwt });
    expect(token).toEqual({
      userJwt: getJwtPair(customSubscriberUserJwt)
    });
    expect(verifyJwtSpy).not.toHaveBeenCalled();
  });

  it('creates only service token based on issuer URL', async () => {
    jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockResolvedValue(onlyIssuerServiceToken);
    const token = await getSubscriberToken({ iss: onlyIssuerXsuaaUrl });
    expect(token).toEqual({
      serviceJwt: getJwtPair(onlyIssuerServiceToken)
    });
    expect(verifyJwtSpy).not.toHaveBeenCalled();
  });

  it('creates user token based on JWT and service token based on issuer URL', async () => {
    const serviceTokenSpy = jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockResolvedValue(onlyIssuerServiceToken);
    const token = await getSubscriberToken({
      iss: onlyIssuerXsuaaUrl,
      jwt: subscriberUserJwt
    });
    expect(token).toEqual({
      userJwt: getJwtPair(subscriberUserJwt),
      serviceJwt: getJwtPair(onlyIssuerServiceToken)
    });
    expect(serviceTokenSpy).toHaveBeenCalledWith(
      'destination',
      expect.objectContaining({
        jwt: { iss: onlyIssuerXsuaaUrl }
      })
    );
    expect(verifyJwtSpy).not.toHaveBeenCalled();
  });
});
