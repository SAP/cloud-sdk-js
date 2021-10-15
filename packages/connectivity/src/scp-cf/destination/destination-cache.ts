import { Cache, IsolationStrategy } from '../cache';
import { tenantId } from '../tenant';
import { userId } from '../user';
import { Destination } from './destination-service-types';
import { DestinationsByType } from './destination-accessor-types';

const DestinationCache = (cache: Cache<Destination>) => ({
  retrieveDestinationFromCache: (
    decodedJwt: Record<string, any>,
    name: string,
    isolation: IsolationStrategy
  ): Destination | undefined =>
    cache.get(getDestinationCacheKey(decodedJwt, name, isolation)),
  cacheRetrievedDestination: (
    decodedJwt: Record<string, any>,
    destination: Destination,
    isolation: IsolationStrategy
  ): void => {
    cacheRetrievedDestination(decodedJwt, destination, isolation, cache);
  },
  cacheRetrievedDestinations: (
    decodedJwt: Record<string, any>,
    retrievedDestinations: DestinationsByType,
    isolation: IsolationStrategy
  ): void => {
    retrievedDestinations.subaccount.forEach(dest =>
      cacheRetrievedDestination(decodedJwt, dest, isolation, cache)
    );
    retrievedDestinations.instance.forEach(dest =>
      cacheRetrievedDestination(decodedJwt, dest, isolation, cache)
    );
  },
  clear: () => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

/**
 * Calculates a cache key based on the jwt and destination name for the given isolation strategy.
 * Cache keys for strategies are non-overlapping, i.e. using a cache key for strategy [[IsolationStrategy.Tenant]]
 * will not result in a cache hit for a destination that has been cached with strategy [[IsolationStrategy.Tenant_User]].
 * @param decodedJwt - The decoded JWT of the current request.
 * @param destinationName - The name of the destination.
 * @param isolationStrategy - The strategy used to isolate cache entries.
 * @returns The cache key.
 * @internal
 */
export function getDestinationCacheKey(
  decodedJwt: Record<string, any>,
  destinationName: string,
  isolationStrategy: IsolationStrategy
): string {
  switch (isolationStrategy) {
    case IsolationStrategy.No_Isolation:
      return `::${destinationName}`;
    case IsolationStrategy.Tenant_User:
      return `${tenantId(decodedJwt)}:${userId(decodedJwt)}:${destinationName}`;
    case IsolationStrategy.User:
      return `:${userId(decodedJwt)}:${destinationName}`;
    default:
      return `${tenantId(decodedJwt)}::${destinationName}`;
  }
}

function cacheRetrievedDestination(
  decodedJwt: Record<string, any>,
  destination: Destination,
  isolation: IsolationStrategy,
  cache: Cache<Destination>
): void {
  if (!destination.name) {
    throw new Error('The destination name is undefined.');
  }

  const key = getDestinationCacheKey(decodedJwt, destination.name, isolation);
  cache.set(key, destination);
}

/**
 * @internal
 */
export const destinationCache = DestinationCache(
  new Cache<Destination>({ hours: 0, minutes: 5, seconds: 0 })
);
