import { createLogger, first } from '@sap-cloud-sdk/util';
import { getTenantId, userId } from '../jwt';
import { AsyncCache } from '../async-cache';
import type { JwtPayload } from '../jsonwebtoken-type';
import type { AsyncCacheInterface } from '../async-cache';
import type { Destination } from './destination-service-types';
import type { DestinationsByType } from './destination-accessor-types';
import type { SubscriberToken } from './get-subscriber-token';

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
 * Type to implement custom destination caching.
 * To use a custom cache, call {@link setDestinationCache} and pass a cache instance that implements this interface.
 */
export type DestinationCacheInterface = AsyncCacheInterface<Destination>;

/**
 * @internal
 * This wrapper class wraps methods of {@link Cache} class as asynchronous methods.
 */
export class DefaultDestinationCache
  extends AsyncCache<Destination>
  implements DestinationCacheInterface
{
  constructor(defaultValidityTime = 0) {
    super(defaultValidityTime);
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
    token: Required<SubscriberToken> | JwtPayload | undefined,
    name: string,
    isolation: IsolationStrategy
  ) => Promise<Destination | undefined>;
  /**
   * @internal
   */
  cacheRetrievedDestination: (
    token: Required<SubscriberToken> | JwtPayload | undefined,
    destination: Destination,
    isolation: IsolationStrategy
  ) => Promise<void>;
  /**
   * @internal
   */
  cacheRetrievedDestinations: (
    token: Required<SubscriberToken> | JwtPayload | undefined,
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
    token: Required<SubscriberToken> | JwtPayload | undefined,
    name: string,
    isolation: IsolationStrategy
  ): Promise<Destination | undefined> =>
    cache.get(getDestinationCacheKey(token, name, isolation)),
  cacheRetrievedDestination: async (
    token: Required<SubscriberToken> | JwtPayload | undefined,
    destination: Destination,
    isolation: IsolationStrategy
  ): Promise<void> => {
    cacheRetrievedDestination(token, destination, isolation, cache);
  },
  cacheRetrievedDestinations: async (
    token: Required<SubscriberToken> | JwtPayload | undefined,
    retrievedDestinations: DestinationsByType,
    isolation: IsolationStrategy
  ): Promise<void> => {
    retrievedDestinations.subaccount.forEach(dest =>
      cacheRetrievedDestination(token, dest, isolation, cache)
    );
    retrievedDestinations.instance.forEach(dest =>
      cacheRetrievedDestination(token, dest, isolation, cache)
    );
  },
  clear: async (): Promise<void> => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

/**
 * Retrieve the token to use for tenant identification.
 *
 * For subscriber:
 * If `iss` or XSUAA user JWT was passed, this is the `serviceJwt`.
 * If a custom user JWT was passed, this is used.
 *
 * For provider: always use the token as passed.
 * @param token - Either the subscriber JWTs or one provider JWT.
 * @returns The decoded JWT to use for tenant identification.
 */
function getJwtForTenant(
  token: Required<SubscriberToken> | JwtPayload | undefined
): JwtPayload {
  return token?.serviceJwt?.decoded || token;
}

/**
 * Retrieve the token to use for user identification.
 *
 * For subscriber:
 * If a user token was passed, this is used.
 * If only `iss` was passed try to get the user from the service token.
 *
 * For provider: always use the token as passed.
 * @param token - Either the subscriber JWTs or one provider JWT.
 * @returns The decoded JWT to use for user identification.
 */
function getJwtForUser(
  token: Required<SubscriberToken> | JwtPayload | undefined
): JwtPayload {
  return token?.userJwt?.decoded || token;
}

/**
 * Calculates a cache key based on the JWT and destination name for the given isolation strategy.
 * Cache keys for strategies are non-overlapping, i.e. using a cache key for strategy {@link 'tenant'}
 * will not result in a cache hit for a destination that has been cached with strategy {@link 'tenant-user'}.
 * @param decodedJwt - The decoded JWT of the current request.
 * @param destinationName - The name of the destination.
 * @param isolationStrategy - The strategy used to isolate cache entries.
 * @returns The cache key.
 * @internal
 */
export function getDestinationCacheKey(
  token: SubscriberToken | JwtPayload | undefined,
  destinationName: string,
  isolationStrategy: IsolationStrategy = 'tenant-user'
): string | undefined {
  if (isolationStrategy === 'tenant') {
    return getTenantCacheKey(
      destinationName,
      getTenantId(getJwtForTenant(token))
    );
  }
  if (isolationStrategy === 'tenant-user') {
    return getTenantUserCacheKey(
      destinationName,
      getTenantId(getJwtForTenant(token)),
      userId(getJwtForUser(token))
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
    "Could not build destination cache key. Isolation strategy 'tenant' is used, but tenant ID is undefined in JWT."
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
  token: Required<SubscriberToken> | JwtPayload | undefined,
  destination: Destination,
  isolation: IsolationStrategy,
  cache: T
): Promise<void> {
  if (!destination.name) {
    throw new Error('The destination name is undefined.');
  }

  const key = getDestinationCacheKey(token, destination.name, isolation);
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
 * Determine the default isolation strategy if not given as option.
 * @param jwt - JWT to determine the default isolation strategy
 * @returns The isolation strategy based on the JWT. If no JWT is given it defaults to tenant isolation.
 * @internal
 */
export function getDefaultIsolationStrategy(
  jwt: JwtPayload | undefined
): IsolationStrategy {
  return jwt && userId(jwt) ? 'tenant-user' : 'tenant';
}
