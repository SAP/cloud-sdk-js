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
 * Represents the isolation strategy in the destination cache.
 * The available strategies are isolation by tenant or isolation by tenant and user.
 */
export type IsolationStrategy = 'tenant' | 'tenant-user';

/**
 * Interface to implement custom destination caching.
 * To use a custom cache, call {@link setDestinationCache} and pass a cache instance that implements this interface.
 */
export interface DestinationCacheInterface {
  /**
   * This is called when an entry is added to the cache.
   * @param key - The cache key to store the item under.
   * @param item - The destination alongside an expiration time to store in the cache.
   */
  set(key: string | undefined, item: CacheEntry<Destination>): Promise<void>;
  /**
   * This is called when an entry shall be retrieved from the cache.
   * @param key - The cache key the item is stored under.
   */
  get(key: string | undefined): Promise<Destination | undefined>;
  /**
   * This is called when checking if a given key occurs in the cache.
   * @param key - The cache key the item should be stored under, if available.
   */
  hasKey(key: string): Promise<boolean>;
  /**
   * This can be called to remove all existing entries from the cache.
   */
  clear(): Promise<void>;
}

/**
 * @internal
 * This wrapper class wraps methods of {@link Cache} class as asynchronous methods.
 */
export class DefaultDestinationCache implements DestinationCacheInterface {
  cache: Cache<Destination>;

  constructor(validityTimeInMs = 300000) {
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
 * @param cache - Cache object which is used in DestinationCache
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
 * Cache keys for strategies are non-overlapping, i.e. using a cache key for strategy {@link 'tenant'}
 * will not result in a cache hit for a destination that has been cached with strategy {@link 'tenant-user'}.
 * @param decodedJwt - The decoded JWT of the current request.
 * @param destinationName - The name of the destination.
 * @param isolationStrategy - The strategy used to isolate cache entries.
 * @returns The cache key.
 * @internal
 */
export function getDestinationCacheKey(
  decodedJwt: Record<string, any>,
  destinationName: string,
  isolationStrategy: IsolationStrategy = 'tenant-user'
): string | undefined {
  if (isolationStrategy === 'tenant') {
    return getTenantCacheKey(destinationName, tenantId(decodedJwt));
  }
  if (isolationStrategy === 'tenant-user') {
    return getTenantUserCacheKey(
      destinationName,
      tenantId(decodedJwt),
      userId(decodedJwt)
    );
  }
  logger.warn(
    `Could not build destination cache key. Isolation strategy '${isolationStrategy}' is not supported.`
  );
}

function getTenantCacheKey(
  destinationName: string,
  tenant: string | undefined
): string | undefined {
  if (tenant) {
    return `${tenant}::${destinationName}`;
  }
  logger.warn(
    "Could not build destination cache key. Isolation strategy 'tenant' is used, but tenant id is undefined in JWT."
  );
}

function getTenantUserCacheKey(
  destinationName: string,
  tenant: string | undefined,
  user: string | undefined
): string | undefined {
  if (tenant && user) {
    return `${user}:${tenant}:${destinationName}`;
  }
  logger.warn(
    "Could not build destination cache key. Isolation strategy 'tenant-user' is used, but tenant id or user id is undefined in JWT."
  );
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
 * Determine the default Isolation strategy if not given as option.
 * @param jwt - JWT to determine the default isolation strategy
 * @returns The isolation strategy based on the JWT. If no JWT is given it defaults to Tenant isolation
 * @internal
 */
export function getDefaultIsolationStrategy(
  jwt: JwtPayload | undefined
): IsolationStrategy {
  return jwt && userId(jwt) ? 'tenant-user' : 'tenant';
}
