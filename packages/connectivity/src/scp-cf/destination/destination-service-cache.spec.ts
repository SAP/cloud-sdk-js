import nock from 'nock';
import { mockServiceBindings } from '@sap-cloud-sdk/test-util-internal/environment-mocks';
import { mockServiceToken } from '@sap-cloud-sdk/test-util-internal/token-accessor-mocks';
import {
  providerServiceToken,
  subscriberServiceToken,
  subscriberUserToken
} from '@sap-cloud-sdk/test-util-internal/mocked-access-tokens';
import { mockSubaccountDestinationsCall } from '@sap-cloud-sdk/test-util-internal/destination-service-mocks';
import { decodeJwt } from '../jwt';
import { destinationServiceCache } from './destination-service-cache';
import { fetchDestinations } from './destination-service';
import type { Destination } from './destination-service-types';

const destinationServiceUrl = 'https://myDestination.service.url';

const subscriberDest = {
  URL: 'https://subscriber.example',
  Name: 'SubscriberDest',
  ProxyType: 'any',
  Authentication: 'NoAuthentication'
};
const subscriberDest2 = {
  URL: 'https://subscriber2.example',
  Name: 'SubscriberDest2',
  ProxyType: 'any',
  Authentication: 'NoAuthentication'
};
const providerDest = {
  URL: 'https://provider.example',
  Name: 'ProviderDest',
  ProxyType: 'any',
  Authentication: 'NoAuthentication'
};

describe('DestinationServiceCache', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockServiceToken();

    mockSubaccountDestinationsCall(
      [subscriberDest, subscriberDest2],
      200,
      subscriberServiceToken,
      destinationServiceUrl
    );
    mockSubaccountDestinationsCall(
      [subscriberDest, subscriberDest2],
      200,
      subscriberUserToken,
      destinationServiceUrl
    );
    mockSubaccountDestinationsCall(
      [providerDest],
      200,
      providerServiceToken,
      destinationServiceUrl
    );
  });
  afterEach(() => {
    destinationServiceCache.clear();
    nock.cleanAll();
  });

  it('should cache destinations per tenant.', async () => {
    const directCallSubscriber = await populateCacheDestinations(
      subscriberServiceToken
    );
    expect(directCallSubscriber.length).toEqual(2);

    const directCallProvider =
      await populateCacheDestinations(providerServiceToken);

    const cacheSubscriber = getDestinationsFromCache(subscriberServiceToken);
    expect(cacheSubscriber).toEqual(directCallSubscriber);

    const cacheProvider = getDestinationsFromCache(providerServiceToken);
    expect(cacheProvider).toEqual(directCallProvider);
  });
});

function getDestinationsFromCache(token: string): Destination[] | undefined {
  return destinationServiceCache.retrieveDestinationsFromCache(
    `${destinationServiceUrl}/destination-configuration/v1/subaccountDestinations`,
    decodeJwt(token)
  );
}

async function populateCacheDestinations(token): Promise<Destination[]> {
  return fetchDestinations(destinationServiceUrl, token, 'subaccount', {
    useCache: true
  });
}
