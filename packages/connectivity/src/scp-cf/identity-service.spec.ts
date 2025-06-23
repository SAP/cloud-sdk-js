import { signedJwt } from '../../../../test-resources/test/test-util';
import { shouldExchangeToken, exchangeToken } from './identity-service';
import * as tokenAccessor from './token-accessor';

describe('shouldExchangeToken', () => {
  it('should not exchange token from XSUAA', async () => {
    expect(
      shouldExchangeToken({
        jwt: signedJwt({ ext_attr: { enhancer: 'XSUAA' } })
      })
    ).toBe(false);
  });

  it('should exchange non-XSUAA token', async () => {
    expect(
      shouldExchangeToken({ iasToXsuaaTokenExchange: true, jwt: signedJwt({}) })
    ).toBe(true);
  });

  it('should not exchange token, if there is no JWT given', async () => {
    expect(shouldExchangeToken({ iasToXsuaaTokenExchange: true })).toBe(false);
  });

  it('should not exchange token, if `iasToXsuaaTokenExchange` is disabled', async () => {
    expect(
      shouldExchangeToken({
        iasToXsuaaTokenExchange: false,
        jwt: signedJwt({})
      })
    ).toBe(false);
  });

  it('should not exchange token, if `iasToXsuaaTokenExchange` is undefined', async () => {
    expect(
      shouldExchangeToken({
        jwt: signedJwt({})
      })
    ).toBe(false);
  });
});

describe('exchangeToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call jwtBearerToken with destination service', async () => {
    const testJwt = 'test.jwt.token';
    const expectedResult = 'exchanged.token';

    jest
      .spyOn(tokenAccessor, 'jwtBearerToken')
      .mockResolvedValue(expectedResult);

    const result = await exchangeToken(testJwt);

    expect(tokenAccessor.jwtBearerToken).toHaveBeenCalledWith(
      testJwt,
      'destination'
    );
    expect(result).toBe(expectedResult);
  });

  it('should handle jwtBearerToken errors', async () => {
    const testJwt = 'test.jwt.token';
    const errorMessage = 'Token exchange failed';

    jest
      .spyOn(tokenAccessor, 'jwtBearerToken')
      .mockRejectedValue(new Error(errorMessage));

    await expect(exchangeToken(testJwt)).rejects.toThrow(
      errorMessage
    );
    expect(tokenAccessor.jwtBearerToken).toHaveBeenCalledWith(
      testJwt,
      'destination'
    );
  });
});
