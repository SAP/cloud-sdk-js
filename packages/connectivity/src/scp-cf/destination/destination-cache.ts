import { createLogger } from '@sap-cloud-sdk/util';
import { Cache, IsolationStrategy } from '../cache';
import { tenantId } from '../tenant';
import { userId } from '../user';
import { Destination } from './destination-service-types';
import { DestinationsByType } from './destination-accessor-types';

const logger = createLogger({
  package: 'core',
  messageContext: 'destination-cache'
});

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
  isolationStrategy = IsolationStrategy.Tenant_User
): string | undefined {
  const tenant = tenantId(decodedJwt);
  const user = userId(decodedJwt);
  switch (isolationStrategy) {
    case IsolationStrategy.No_Isolation:
      return `::${destinationName}`;
    case IsolationStrategy.Tenant:
      if (tenant) {
        return `${tenant}::${destinationName}`;
      }
      logger.warn(
        `Cannot get cache key. Isolation strategy ${isolationStrategy} is used, but tenant id is undefined.`
      );
      return;
    case IsolationStrategy.User:
      if (user) {
        return `:${user}:${destinationName}`;
      }
      logger.warn(
        `Cannot get cache key. Isolation strategy ${isolationStrategy} is used, but user id is undefined.`
      );
      return;
    case IsolationStrategy.Tenant_User:
      if (tenant && user) {
        return `${user}:${tenant}:${destinationName}`;
      }
      logger.warn(
        `Cannot get cache key. Isolation strategy ${isolationStrategy} is used, but tenant id or user id is undefined.`
      );
      return;
    default:
      logger.warn(
        `Cannot get cache key. Isolation strategy ${isolationStrategy} is not supported.`
      );
      return;
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
