import nock from 'nock';
import { mockServiceBindings } from '../../../../test/test-util/environment-mocks';
import { mockServiceToken } from '../../../../test/test-util/token-accessor-mocks';
import {
  providerServiceToken,
  subscriberServiceToken
} from '../../../../test/test-util/mocked-access-tokens';
import { IsolationStrategy } from '../cache';
import { decodeJwt } from '../jwt';
import {
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../test/test-util/destination-service-mocks';
import {
  fetchDestination,
  fetchSubaccountDestinations
} from './destination-service';
import { Destination, DestinationType } from './destination-service-types';
import { destinationServiceCache } from './destination-service-cache';

const destinationServiceUrl = 'https://myDestination.service.url';
const singleDest = {
  URL: 'https://destination1.example',
  Name: 'destName',
  ProxyType: 'any',
  Authentication: 'NoAuthentification'
};

const subscriberDest = {
  URL: 'https://subscriber.example',
  Name: 'SubscriberDest',
  ProxyType: 'any',
  Authentication: 'NoAuthentification'
};
const subscriberDest2 = {
  URL: 'https://subscriber2.example',
  Name: 'SubscriberDest2',
  ProxyType: 'any',
  Authentication: 'NoAuthentification'
};
const providerDest = {
  URL: 'https://provider.example',
  Name: 'ProviderDest',
  ProxyType: 'any',
  Authentication: 'NoAuthentification'
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
      [providerDest],
      200,
      providerServiceToken,
      destinationServiceUrl
    );
    mockSingleDestinationCall(
      nock,
      singleDest,
      200,
      singleDest.Name,
      subscriberServiceToken,
      destinationServiceUrl
    );
  });
  afterEach(() => {
    destinationServiceCache.clear();
    nock.cleanAll();
  });

  it('should cache single destination with tenant isolation per default.', async () => {
    const directCall = await fetchDestination(
      destinationServiceUrl,
      subscriberServiceToken,
      singleDest.Name,
      { useCache: true }
    );
    expect(directCall.originalProperties).toEqual(singleDest);
    await expect(
      fetchDestination(
        destinationServiceUrl,
        subscriberServiceToken,
        singleDest.Name,
        { useCache: true }
      )
    ).resolves.not.toThrow();

    const cache = getDestinationFromCache(
      subscriberServiceToken,
      singleDest.Name,
      IsolationStrategy.Tenant
    );
    expect(cache).toEqual(directCall);
    const cacheUndefined = getDestinationFromCache(
      subscriberServiceToken,
      singleDest.Name,
      IsolationStrategy.Tenant_User
    );
    expect(cacheUndefined).toBeUndefined();
  });

  it('should cache single destination with tenant_user isolation.', async () => {
    const directCall = await fetchDestination(
      destinationServiceUrl,
      subscriberServiceToken,
      singleDest.Name,
      { useCache: true, isolationStrategy: IsolationStrategy.Tenant_User }
    );

    const cache = getDestinationFromCache(
      subscriberServiceToken,
      singleDest.Name,
      IsolationStrategy.Tenant_User
    );
    expect(cache).toEqual(directCall);
    const cacheUndefined = getDestinationFromCache(
      subscriberServiceToken,
      singleDest.Name,
      IsolationStrategy.Tenant
    );
    expect(cacheUndefined).toBeUndefined();
  });

  it('should cache multiple destinations with tenant isolation per default.', async () => {
    const directCall = await fetchSubaccountDestinations(
      destinationServiceUrl,
      subscriberServiceToken,
      { useCache: true }
    );
    await expect(
      fetchSubaccountDestinations(
        destinationServiceUrl,
        subscriberServiceToken,
        { useCache: true }
      )
    ).resolves.not.toThrow();

    const cache = getDestinationsFromCache(
      subscriberServiceToken,
      IsolationStrategy.Tenant
    );
    expect(cache).toEqual(directCall);
    const cacheUndefined = getDestinationsFromCache(
      subscriberServiceToken,
      IsolationStrategy.Tenant_User
    );
    expect(cacheUndefined).toBeUndefined();
  });

  it('should cache multiple destinations with tenant_user isolation.', async () => {
    const directCall = await fetchSubaccountDestinations(
      destinationServiceUrl,
      subscriberServiceToken,
      { useCache: true, isolationStrategy: IsolationStrategy.Tenant_User }
    );

    const cache = getDestinationsFromCache(
      subscriberServiceToken,
      IsolationStrategy.Tenant_User
    );
    expect(cache).toEqual(directCall);

    const cacheUndefined = getDestinationsFromCache(
      subscriberServiceToken,
      IsolationStrategy.Tenant
    );
    expect(cacheUndefined).toBeUndefined();
  });

  it('should cache always with tenant isolation.', async () => {
    const directCallSubscriber = await fetchSubaccountDestinations(
      destinationServiceUrl,
      subscriberServiceToken,
      { useCache: true, isolationStrategy: IsolationStrategy.No_Isolation }
    );
    const directCallProvider = await fetchSubaccountDestinations(
      destinationServiceUrl,
      providerServiceToken,
      { useCache: true, isolationStrategy: IsolationStrategy.User }
    );

    const cacheSubscriber = getDestinationsFromCache(
      subscriberServiceToken,
      IsolationStrategy.Tenant
    );
    expect(cacheSubscriber).toEqual(directCallSubscriber);
    const cacheProvider = getDestinationsFromCache(
      providerServiceToken,
      IsolationStrategy.Tenant
    );
    expect(cacheProvider).toEqual(directCallProvider);
  });
});

function getDestinationFromCache(
  token: string,
  name: string,
  isolation: IsolationStrategy
): Destination | undefined {
  const result = destinationServiceCache.retrieveDestinationsFromCache(
    `${destinationServiceUrl}/destination-configuration/v1/destinations/${name}`,
    decodeJwt(token),
    isolation
  );
  if (result) {
    return result[0];
  }
}

function getDestinationsFromCache(
  token: string,
  isolation: IsolationStrategy
): Destination[] | undefined {
  return destinationServiceCache.retrieveDestinationsFromCache(
    `${destinationServiceUrl}/destination-configuration/v1/${DestinationType.Subaccount}Destinations`,
    decodeJwt(token),
    isolation
  );
}
