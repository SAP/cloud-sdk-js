/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { decodeJwt } from '../../src';
import * as tokenAccessor from '../../src/scp-cf/token-accessor';
import { TestTenants } from './environment-mocks';
import {
  providerServiceToken,
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
      } else {
        const userJwt =
          typeof options.userJwt === 'string'
            ? decodeJwt(options.userJwt)
            : options.userJwt;

        if (userJwt.zid === TestTenants.PROVIDER) {
          return Promise.resolve(providerServiceToken);
        }

        return Promise.resolve(subscriberServiceToken);
      }
    });
}

export function mockUserApprovedServiceToken() {
  return jest
    .spyOn(tokenAccessor, 'userApprovedServiceToken')
    .mockImplementation((userJwt, service, options) => {
      if (decodeJwt(userJwt).zid === TestTenants.SUBSCRIBER) {
        return Promise.resolve(userApprovedSubscriberServiceToken);
      }
      return Promise.resolve(userApprovedProviderServiceToken);
    });
}
