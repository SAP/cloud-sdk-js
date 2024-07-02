import nock from 'nock';
import * as tokenAccessor from '@sap-cloud-sdk/connectivity/src/scp-cf/token-accessor';
import { decodeJwt } from '@sap-cloud-sdk/connectivity';
import { isXsuaaToken } from '@sap-cloud-sdk/connectivity/internal';
import { onlyIssuerXsuaaUrl, testTenants } from './environment-mocks';
import {
  onlyIssuerServiceToken,
  providerServiceToken,
  providerUserToken,
  subscriberServiceToken,
  subscriberUserToken
} from './mocked-access-tokens';

export function expectAllMocksUsed(scopes: nock.Scope[]) {
  scopes.forEach(scope => {
    expect(scope.isDone()).toBe(true);
  });
}

export function mockServiceToken() {
  return jest
    .spyOn(tokenAccessor, 'serviceToken')
    .mockImplementation((_, options) => {
      if (!options || typeof options.jwt === 'undefined') {
        return Promise.resolve(providerServiceToken);
      }
      const userJwt =
        typeof options.jwt === 'string' ? decodeJwt(options.jwt) : options.jwt;

      if (
        userJwt.ext_attr.zdn === testTenants.subscriberOnlyIss ||
        (isXsuaaToken(userJwt) && userJwt.iss === onlyIssuerXsuaaUrl)
      ) {
        return Promise.resolve(onlyIssuerServiceToken);
      }

      if (userJwt.zid === testTenants.provider) {
        return Promise.resolve(providerServiceToken);
      }

      return Promise.resolve(subscriberServiceToken);
    });
}

export function mockJwtBearerToken() {
  return jest
    .spyOn(tokenAccessor, 'jwtBearerToken')
    .mockImplementation(async userJwt =>
      decodeJwt(userJwt).zid === testTenants.subscriber
        ? subscriberUserToken
        : providerUserToken
    );
}
