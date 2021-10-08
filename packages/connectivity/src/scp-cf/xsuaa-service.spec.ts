import { getSubdomainAndZoneId } from './xsuaa-service';
import * as jwt from './jwt';

describe('getSubdomainAndZoneId', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns null subdomain and zoneId for undefined jwt', () => {
    const actual = getSubdomainAndZoneId();
    const expected = { subdomain: null, zoneId: null };
    expect(actual).toEqual(expected);
  });

  it('returns subdomain and zoneId', () => {
    const iss = 'https://sub.example.com';
    const zid = 'zone';
    jest.spyOn(jwt, 'decodeJwt').mockImplementationOnce(() => ({ iss, zid }));

    const actual = getSubdomainAndZoneId('nonNullJWT');
    const expected = { subdomain: 'sub', zoneId: zid };
    expect(actual).toEqual(expected);
  });

  it('returns null zoneId, when the jwt does not contain zid', () => {
    const iss = 'https://sub.example.com';
    jest.spyOn(jwt, 'decodeJwt').mockImplementationOnce(() => ({ iss }));

    const actual = getSubdomainAndZoneId('nonNullJWT');
    const expected = { subdomain: 'sub', zoneId: null };
    expect(actual).toEqual(expected);
  });

  it('returns null subdomain, when the jwt does not contain iss', () => {
    const zid = 'zone';
    jest.spyOn(jwt, 'decodeJwt').mockImplementationOnce(() => ({ zid }));

    const actual = getSubdomainAndZoneId('nonNullJWT');
    const expected = { subdomain: null, zoneId: zid };
    expect(actual).toEqual(expected);
  });
});
