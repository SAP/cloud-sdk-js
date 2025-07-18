import {
  customSubscriberUserToken,
  mockServiceBindings,
  onlyIssuerServiceToken,
  onlyIssuerXsuaaUrl,
  subscriberServiceToken,
  subscriberUserToken
} from '../../../../../test-resources/test/test-util';
import * as tokenAccessor from '../token-accessor';
import { getJwtPair } from '../jwt';
import { getSubscriberToken } from './get-subscriber-token';

describe('getSubscriberToken()', () => {
  beforeEach(() => {
    mockServiceBindings();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('creates user and service token based on user JWT (XSUAA)', async () => {
    jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockResolvedValue(subscriberServiceToken);
    const token = await getSubscriberToken({ jwt: subscriberUserToken });
    expect(token).toEqual({
      userJwt: getJwtPair(subscriberUserToken),
      serviceJwt: getJwtPair(subscriberServiceToken)
    });
  });

  it('creates only user token based on user JWT (custom)', async () => {
    const token = await getSubscriberToken({ jwt: customSubscriberUserToken });
    expect(token).toEqual({
      userJwt: getJwtPair(customSubscriberUserToken)
    });
  });

  it('creates only service token based on issuer URL', async () => {
    jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockResolvedValue(onlyIssuerServiceToken);
    const token = await getSubscriberToken({ iss: onlyIssuerXsuaaUrl });
    expect(token).toEqual({
      serviceJwt: getJwtPair(onlyIssuerServiceToken)
    });
  });

  it('creates user token based on JWT and service token based on issuer URL', async () => {
    const serviceTokenSpy = jest
      .spyOn(tokenAccessor, 'serviceToken')
      .mockResolvedValue(onlyIssuerServiceToken);
    const token = await getSubscriberToken({
      iss: onlyIssuerXsuaaUrl,
      jwt: subscriberUserToken
    });
    expect(token).toEqual({
      userJwt: getJwtPair(subscriberUserToken),
      serviceJwt: getJwtPair(onlyIssuerServiceToken)
    });
    expect(serviceTokenSpy).toHaveBeenCalledWith(
      'destination',
      expect.objectContaining({
        jwt: { ext_attr: { zdn: 'subscriber-only-iss' } }
      })
    );
  });
});
