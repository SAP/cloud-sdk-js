import nock from 'nock';
import { mockServiceBindings } from '../../../../../test-resources/test/test-util/environment-mocks';
import { mockServiceToken } from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import {
  providerServiceToken,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import { decodeJwt } from '../jwt';
import { fetchSubaccountDestinations } from './destination-service';
import { Destination, DestinationType } from './destination-service-types';
import { destinationServiceCache } from './destination-service-cache';

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
    mockVerifyJwt();
    mockServiceBindings();
    mockServiceToken();

    mockSubaccountDestinationsCall(
      nock,
      [subscriberDest, subscriberDest2],
      200,
      subscriberServiceToken,
      destinationServiceUrl
    );
    mockSubaccountDestinationsCall(
      nock,
      [subscriberDest, subscriberDest2],
      200,
      subscriberUserJwt,
      destinationServiceUrl
    );
    mockSubaccountDestinationsCall(
      nock,
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
    const directCallProvider = await populateCacheDestinations(
      providerServiceToken
    );
    expect(directCallProvider.length).toEqual(2);

    const cacheSubscriber = getDestinationsFromCache(subscriberServiceToken);
    expect(cacheSubscriber).toEqual(directCallSubscriber);

    const cacheProvider = getDestinationsFromCache(providerServiceToken);
    expect(cacheProvider).toEqual(directCallProvider);
  });
});

function getDestinationsFromCache(token: string): Destination[] | undefined {
  return destinationServiceCache.retrieveDestinationsFromCache(
    `${destinationServiceUrl}/destination-configuration/v1/${DestinationType.Subaccount}Destinations`,
    decodeJwt(token)
  );
}

async function populateCacheDestinations(token): Promise<Destination[]> {
  return fetchSubaccountDestinations(destinationServiceUrl, token, {
    useCache: true
  });
}
