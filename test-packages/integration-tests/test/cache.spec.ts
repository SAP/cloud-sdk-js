import {
  alwaysProvider,
  clientCredentialsTokenCache,
  destinationServiceCache,
  destinationCache,
  getDestination,
  IsolationStrategy
} from '@sap-cloud-sdk/core';
import jwt from 'jsonwebtoken';
import nock from 'nock';
import {
  mockInstanceDestinationsCall,
  mockSubaccountDestinationsCall
} from '../../../packages/core/test/test-util/destination-service-mocks';
import {
  mockDestinationServiceBinding,
  mockServiceBindings,
  providerXsuaaUrl
} from '../../../packages/core/test/test-util/environment-mocks';
import { privateKey } from '../../../packages/core/test/test-util/keys';
import { mockClientCredentialsGrantCall } from '../../../packages/core/test/test-util/xsuaa-service-mocks';

describe('CacheDestination & CacheClientCredentialToken', () => {
  beforeEach(() => {
    mockServiceBindings();
    const destination = {
      Name: 'FINAL-DESTINATION',
      Authentication: 'BasicAuthentication',
      Password: 'password',
      User: 'username',
      ProxyType: 'Internet',
      sapclient: null,
      URL: 'https://example.com',
      authTokens: []
    };
    const providerToken = jwt.sign(
      {
        zid: 'provider_token',
        user_id: 'user_id'
      },
      privateKey(),
      {
        algorithm: 'RS512'
      }
    );

    mockClientCredentialsGrantCall(
      providerXsuaaUrl,
      { access_token: providerToken },
      200,
      mockDestinationServiceBinding.credentials.clientid,
      mockDestinationServiceBinding.credentials.clientsecret
    );
    mockInstanceDestinationsCall(nock, [destination], 200, providerToken);
    mockSubaccountDestinationsCall(nock, [], 200, providerToken);
  });

  afterEach(() => {
    nock.cleanAll();
    destinationCache.clear();
    destinationServiceCache.clear();
    clientCredentialsTokenCache.clear();
    delete process.env['VCAP_SERVICES'];
  });

  it('getting the same destination twice should produce a cache hit', async () => {
    await getDestination('FINAL-DESTINATION', {
      useCache: true,
      selectionStrategy: alwaysProvider,
      isolationStrategy: IsolationStrategy.Tenant
    });
    await getDestination('FINAL-DESTINATION', {
      useCache: true,
      selectionStrategy: alwaysProvider,
      isolationStrategy: IsolationStrategy.Tenant
    });
  });

  it('changing the isolation should produce a cache miss', async () => {
    // The destination-service has an own cahce where only isolation strategy Tenant and Tenant_User are used.
    // In order to also miss the cache there the two allowed strategies must be used.
    await getDestination('FINAL-DESTINATION', {
      useCache: true,
      isolationStrategy: IsolationStrategy.Tenant
    });
    const destinationRequest = getDestination('FINAL-DESTINATION', {
      useCache: true,
      isolationStrategy: IsolationStrategy.Tenant_User
    });
    await expect(destinationRequest).rejects.toThrowErrorMatchingSnapshot();
  });
});
