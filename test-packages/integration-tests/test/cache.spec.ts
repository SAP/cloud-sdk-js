import { alwaysProvider, clientCredentialsTokenCache, destinationCache, getDestination, IsolationStrategy } from '@sap-cloud-sdk/core';
import jwt from 'jsonwebtoken';
import nock from 'nock';
import { mockInstanceDestinationsCall, mockSubaccountDestinationsCall } from '../../../packages/core/test/test-util/destination-service-mocks';
import { mockDestinationServiceBinding, mockServiceBindings, providerXsuaaUrl } from '../../../packages/core/test/test-util/environment-mocks';
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
        zid: 'provider_token'
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
    mockInstanceDestinationsCall([destination], 200, providerToken);
    mockSubaccountDestinationsCall([], 200, providerToken);
  });

  afterEach(() => {
    nock.cleanAll();
    destinationCache.clear();
    clientCredentialsTokenCache.clear();
    delete process.env['VCAP_SERVICES'];
  });

  it('getting the same destination twice should produce a cache hit', async () => {
    await getDestination('FINAL-DESTINATION', { useCache: true, selectionStrategy: alwaysProvider });
    await getDestination('FINAL-DESTINATION', { useCache: true, selectionStrategy: alwaysProvider });
  });

  it('changing the isolation should produce a cache miss', async () => {
    await getDestination('FINAL-DESTINATION', { useCache: true });
    const destinationRequest = getDestination('FINAL-DESTINATION', { useCache: true, isolationStrategy: IsolationStrategy.User });
    await expect(destinationRequest).rejects.toThrowErrorMatchingSnapshot();
  });
});
