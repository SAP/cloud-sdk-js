import { JwtPayload } from 'jsonwebtoken';
import { Cache, IsolationStrategy } from '../cache';
import { Destination } from './destination-service-types';
import { getDestinationCacheKey } from './destination-cache';

const DestinationServiceCache = (cache: Cache<Destination[]>) => ({
  retrieveDestinationsFromCache: (
    targetUrl: string,
    decodedJwt: JwtPayload,
    isolationStrategy?: IsolationStrategy
  ): Destination[] | undefined =>
    cache.get(
      getDestinationCacheKeyService(targetUrl, decodedJwt, isolationStrategy)
    ),
  cacheRetrievedDestinations: (
    destinationServiceUri: string,
    decodedJwt: JwtPayload,
    destinations: Destination[],
    isolationStrategy?: IsolationStrategy
  ): void => {
    const key = getDestinationCacheKeyService(
      destinationServiceUri,
      decodedJwt,
      isolationStrategy
    );
    cache.set(key, destinations);
  },
  clear: () => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

// The destination service URI contains the destination name (single request) or the instance/subaccount information for get all requests.
// The used isolation strategy is either `Tenant` or `Tenant_User` because we want to get results for subaccount and provider tenants which rules out no-isolation or user isolation.
function getDestinationCacheKeyService(
  destinationServiceUri: string,
  decodedJwt: JwtPayload,
  isolationStrategy?: IsolationStrategy
): string {
  const usedIsolationStrategy =
    isolationStrategy === IsolationStrategy.Tenant ||
    isolationStrategy === IsolationStrategy.Tenant_User
      ? isolationStrategy
      : IsolationStrategy.Tenant;

  return getDestinationCacheKey(
    decodedJwt,
    destinationServiceUri,
    usedIsolationStrategy
  );
}

export const destinationServiceCache = DestinationServiceCache(
  new Cache<Destination[]>({ hours: 0, minutes: 5, seconds: 0 })
);
