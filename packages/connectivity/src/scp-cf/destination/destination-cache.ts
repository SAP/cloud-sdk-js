import { createLogger, first } from '@sap-cloud-sdk/util';
import { Cache, CacheEntry } from '../cache';
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

/**
 * Interface to implement custom destination caching.
 * To set a custom implementation, call method {@link setDestinationCache} and pass the cache instance.
 */
export interface DestinationCacheInterface {
  hasKey(key: string): Promise<boolean>;
  get(key: string | undefined): Promise<Destination | undefined>;
  set(key: string | undefined, item: CacheEntry<Destination>): Promise<void>;
  clear(): Promise<void>;
}

/**
 * @internal
 * This wrapper class wraps methods of {@link Cache} class as asynchronous methods.
 */
export class DefaultDestinationCache implements DestinationCacheInterface {
  cache: Cache<Destination>;

  constructor(validityTimeInMs?: number) {
    this.cache = new Cache<Destination>(validityTimeInMs);
  }

  /**
   * Specifies whether an entry with a given key is defined in cache.
   * @param key - The entry's key.
   * @returns A boolean value that indicates whether the entry exists in cache.
   */
  async hasKey(key: string): Promise<boolean> {
    return this.cache.hasKey(key);
  }

  /**
   * Getter of cached entries.
   * @param key - The key of the entry to retrieve.
   * @returns The corresponding entry to the provided key if it is still valid, returns `undefined` otherwise.
   */
  async get(key: string | undefined): Promise<Destination | undefined> {
    return this.cache.get(key);
  }

  /**
   * Setter of entries in cache.
   * @param key - The entry's key.
   * @param item - The entry to cache.
   */
  async set(
    key: string | undefined,
    item: CacheEntry<Destination>
  ): Promise<void> {
    return this.cache.set(key, item);
  }

  /**
   * Clear all cached items.
   */
  async clear(): Promise<void> {
    return this.cache.clear();
  }
}

/**
 * @internal
 */
export interface DestinationCacheType {
  /**
   * @internal
   */
  retrieveDestinationFromCache: (
    decodedJwt: Record<string, any>,
    name: string,
    isolation: IsolationStrategy
  ) => Promise<Destination | undefined>;
  /**
   * @internal
   */
  cacheRetrievedDestination: (
    decodedJwt: Record<string, any>,
    destination: Destination,
    isolation: IsolationStrategy
  ) => Promise<void>;
  /**
   * @internal
   */
  cacheRetrievedDestinations: (
    decodedJwt: Record<string, any>,
    retrievedDestinations: DestinationsByType,
    isolation: IsolationStrategy
  ) => Promise<void>;
  /**
   * @internal
   */
  clear: () => Promise<void>;
  /**
   * @internal
   */
  getCacheInstance: () => DestinationCacheInterface;
}

/**
 * DestinationCache constructor.
 * @param cache - Cache object which is used in DestiantionCache
 * @returns A destination cache object.
 * @internal
 */
export const DestinationCache = (
  cache: DestinationCacheInterface = new DefaultDestinationCache(300000)
): DestinationCacheType => ({
  retrieveDestinationFromCache: async (
    decodedJwt: Record<string, any>,
    name: string,
    isolation: IsolationStrategy
  ): Promise<Destination | undefined> =>
    cache.get(getDestinationCacheKey(decodedJwt, name, isolation)),
  cacheRetrievedDestination: async (
    decodedJwt: Record<string, any>,
    destination: Destination,
    isolation: IsolationStrategy
  ): Promise<void> => {
    cacheRetrievedDestination(decodedJwt, destination, isolation, cache);
  },
  cacheRetrievedDestinations: async (
    decodedJwt: Record<string, any>,
    retrievedDestinations: DestinationsByType,
    isolation: IsolationStrategy
  ): Promise<void> => {
    retrievedDestinations.subaccount.forEach(dest =>
      cacheRetrievedDestination(decodedJwt, dest, isolation, cache)
    );
    retrievedDestinations.instance.forEach(dest =>
      cacheRetrievedDestination(decodedJwt, dest, isolation, cache)
    );
  },
  clear: async (): Promise<void> => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

/**
 * Calculates a cache key based on the jwt and destination name for the given isolation strategy.
 * Cache keys for strategies are non-overlapping, i.e. using a cache key for strategy {@link IsolationStrategy.Tenant}
 * will not result in a cache hit for a destination that has been cached with strategy {@link IsolationStrategy.Tenant_User}.
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

async function cacheRetrievedDestination<T extends DestinationCacheInterface>(
  decodedJwt: Record<string, any>,
  destination: Destination,
  isolation: IsolationStrategy,
  cache: T
): Promise<void> {
  if (!destination.name) {
    throw new Error('The destination name is undefined.');
  }

  const key = getDestinationCacheKey(decodedJwt, destination.name, isolation);
  const expiresIn = first(destination.authTokens || [])?.expiresIn;
  const expirationTime = expiresIn
    ? Date.now() + parseInt(expiresIn) * 1000
    : undefined;
  cache.set(key, { entry: destination, expires: expirationTime });
}

/**
 * Sets the custom destination cache instance.
 * Call this method with an instance of {@link DestinationCacheInterface} to override the default cache instance set by the SDK.
 *
 * NOTE: This function should be called at the beginning before any calls to either {@link getDestination} or {@link @sap-cloud-sdk/http-client!executeHttpRequest}.
 * @param cache - An instance of {@link DestinationCacheInterface}.
 */
export function setDestinationCache(cache: DestinationCacheInterface): void {
  destinationCache = DestinationCache(cache);
}

/**
 * @internal
 */
export let destinationCache: DestinationCacheType = DestinationCache();
/**
 * Determin the default Isolation strategy if not given as option.
 * @param jwt - JWT to determine the default isolation strategy
 * @returns The isolation strategy based on the JWT. If no JWT is given it defaults to Tenant isolation
 * @internal
 */
export function getDefaultIsolationStrategy(
  jwt: JwtPayload | undefined
): IsolationStrategy {
  return jwt && userId(jwt)
    ? IsolationStrategy.Tenant_User
    : IsolationStrategy.Tenant;
}
