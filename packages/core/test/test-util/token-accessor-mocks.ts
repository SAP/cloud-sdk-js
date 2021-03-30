import * as tokenAccessor from '../../src/connectivity/scp-cf/token-accessor';
import { decodeJwt } from '../../src/connectivity/scp-cf';
import { TestTenants } from './environment-mocks';
import {
  providerJwtBearerToken,
  providerServiceToken,
  subscriberJwtBearerToken,
  subscriberServiceToken,
  userApprovedProviderServiceToken,
  userApprovedSubscriberServiceToken
} from './mocked-access-tokens';

export function mockServiceToken() {
  return jest
    .spyOn(tokenAccessor, 'serviceToken')
    .mockImplementation((service, options) => {
      if (!options || typeof options.userJwt === 'undefined') {
        return Promise.resolve(providerServiceToken);
      }
      const userJwt =
        typeof options.userJwt === 'string'
          ? decodeJwt(options.userJwt)
          : options.userJwt;

      if (userJwt.zid === TestTenants.PROVIDER) {
        return Promise.resolve(providerServiceToken);
      }

      return Promise.resolve(subscriberServiceToken);
    });
}

export function mockUserApprovedServiceToken() {
  return jest
    .spyOn(tokenAccessor, 'userApprovedServiceToken')
    .mockImplementation(userJwt => {
      if (decodeJwt(userJwt).zid === TestTenants.SUBSCRIBER) {
        return Promise.resolve(userApprovedSubscriberServiceToken);
      }
      return Promise.resolve(userApprovedProviderServiceToken);
    });
}

export function mockJwtBearerToken() {
  return jest
    .spyOn(tokenAccessor, 'jwtBearerToken')
    .mockImplementation(userJwt => {
      if (decodeJwt(userJwt).zid === TestTenants.SUBSCRIBER) {
        return Promise.resolve(subscriberJwtBearerToken);
      }
      return Promise.resolve(providerJwtBearerToken);
    });
}
