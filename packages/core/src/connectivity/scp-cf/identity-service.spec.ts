import { isTokenExchangeEnabled } from './identity-service';

describe('identity service', () => {
  it('it should make token exchange when jwt is provided', async () => {
    const actual = isTokenExchangeEnabled({ userJwt: 'jwt' });
    expect(actual).toBeTruthy();
  });

  it('it should not make token exchange when jwt is not provided', async () => {
    const actual = isTokenExchangeEnabled({});
    expect(actual).toBeFalsy();
  });

  it('it should not make token exchange when the option is set to false', async () => {
    const actual = isTokenExchangeEnabled({
      iasToXsuaaTokenExchange: false,
      userJwt: 'jwt'
    });
    expect(actual).toBeFalsy();
  });
});
