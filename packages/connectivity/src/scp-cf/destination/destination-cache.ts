import { createLogger, first } from '@sap-cloud-sdk/util';
import { Cache } from '../cache';
import { tenantId } from '../tenant';
import { userId } from '../user';
import { JwtPayload } from '../jsonwebtoken-type';
import { Destination } from './destination-service-types';
import { DestinationsByType } from './destination-accessor-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-cache'
});

/**
 * Enumerator that selects the isolation type of destination in cache.
 * The used isolation strategy is either `Tenant` or `Tenant_User` because we want to get results for subaccount and provider tenants which rules out no-isolation or user isolation.
 */
export enum IsolationStrategy {
  Tenant = 'Tenant',
  Tenant_User = 'TenantUser'
}

export interface DestinationCacheType {
  retrieveDestinationFromCache: (
      decodedJwt: Record<string, any>,
      name: string,
      isolation: IsolationStrategy
  ) => Destination | undefined;
  cacheRetrievedDestination: (
      decodedJwt: Record<string, any>,
      destination: Destination,
      isolation: IsolationStrategy
  ) => void;
  cacheRetrievedDestinations: (
      decodedJwt: Record<string, any>,
      retrievedDestinations: DestinationsByType,
      isolation: IsolationStrategy
  ) => void;
  clear: () => void;
  getCacheInstance: () => Cache<Destination>;
}

export const DestinationCache = (
  cache: Cache<Destination>
): DestinationCacheType => ({
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
  clear: (): void => {
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
    case IsolationStrategy.Tenant:
      if (tenant) {
        return `${tenant}::${destinationName}`;
      }
      logger.warn(
        `Cannot get cache key. Isolation strategy ${isolationStrategy} is used, but tenant id is undefined.`
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
  const expiresIn = first(destination.authTokens || [])?.expiresIn;
  const expirationTime = expiresIn
    ? Date.now() + parseInt(expiresIn) * 1000
    : undefined;
  cache.set(key, destination, expirationTime);
}

/**
 * @internal
 */
export const destinationCache = DestinationCache(
  new Cache<Destination>({ hours: 0, minutes: 5, seconds: 0 })
);

export function getIsolationStrategy(
  jwt: JwtPayload | undefined
): IsolationStrategy {
  if (jwt && userId(jwt)) {
    return IsolationStrategy.Tenant_User;
  }

  return IsolationStrategy.Tenant;
}
