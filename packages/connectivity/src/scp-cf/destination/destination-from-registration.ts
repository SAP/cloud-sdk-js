import { createLogger } from '@sap-cloud-sdk/util';
import {
  decodeJwt,
  decodeOrMakeJwt,
  defaultTenantId,
  getTenantId
} from '../jwt';
import { getDefaultIsolationStrategy } from './destination-cache';
import { isHttpDestination } from './destination-service-types';
import {
  addProxyConfigurationInternet,
  proxyStrategy
} from './http-proxy-util';
import { registerDestinationCache } from './register-destination-cache';
import { addForwardedAuthTokenIfNeeded } from './forward-auth-token';
import type { Destination } from './destination-service-types';
import type { IsolationStrategy } from './destination-cache';
import type { DestinationFetchOptions } from './destination-accessor-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'register-destination'
});

/**
 * Represents options to configure how a destination should be registered.
 */
export type RegisterDestinationOptions = Pick<
  DestinationFetchOptions,
  'jwt' | 'isolationStrategy'
> & { inferMtls?: boolean; useMtlsCache?: boolean };

/**
 * Registers a destination in a cache for later usage.
 *
 * If a destination with the same key is already in the cache, it is replaced.
 * The key is built using the `getDestinationCacheKey` method.
 * @param destination - A destination to add to the `destinations` cache.
 * @param options - Options how to cache the destination.
 */
export async function registerDestination(
  destination: DestinationWithName,
  options?: RegisterDestinationOptions
): Promise<void> {
  if (!destination.name) {
    throw Error('Registering destinations requires a destination name.');
  }

  destination.mtls = !!options?.inferMtls;

  if (options?.useMtlsCache) {
    registerDestinationCache.mtls.useMtlsCache = true;
    await registerDestinationCache.mtls.cacheMtlsOptions();
  }

  await registerDestinationCache.destination.cacheRetrievedDestination(
    getJwtForCaching(options),
    destination,
    isolationStrategy(options)
  );
}

function getJwtForCaching(options: RegisterDestinationOptions | undefined) {
  const jwt = decodeOrMakeJwt(options?.jwt);
  if (!getTenantId(jwt)) {
    if (options?.jwt) {
      throw Error(
        'Could not determine tenant from JWT nor XSUAA, identity or destination service binding. Destination is registered without tenant information.'
      );
    } else {
      logger.debug(
        'Could not determine tenant from XSUAA, identity or destination service binding. Destination is registered without tenant information.'
      );
    }
    return { zid: defaultTenantId };
  }
  return jwt;
}

/**
 * Represents a destination with a `name` property.
 */
export type DestinationWithName = Destination & { name: string };

/**
 * @internal
 * @param options - The options for searching the cache
 * @returns Destination - the destination from cache
 */
export async function searchRegisteredDestination(
  options: DestinationFetchOptions
): Promise<Destination | null> {
  let destination =
    await registerDestinationCache.destination.retrieveDestinationFromCache(
      getJwtForCaching(options),
      options.destinationName,
      isolationStrategy(options)
    );

  if (!destination) {
    logger.debug(
      `Could not retrieve '${options.destinationName}' from registered destinations.`
    );
    return null;
  }

  logger.info(
    `Successfully retrieved destination '${options.destinationName}' from registered destinations.`
  );

  destination = addForwardedAuthTokenIfNeeded(destination, options.jwt);

  return isHttpDestination(destination) &&
    ['internet', 'private-link'].includes(proxyStrategy(destination))
    ? addProxyConfigurationInternet(destination)
    : destination;
}

/**
 * If an explicit isolation strategy is given by the user this is used. If not the isolation strategy is determined in the following way:
 * If a JWT is given and it contains a user_id the isolation is 'TenantUser'. If no JWT is given or it does not contain a user the isolation is 'Tenant'.
 * @param options - Options passed to register the destination containing the jwt.
 * @returns The isolation strategy.
 */
function isolationStrategy(
  options?: RegisterDestinationOptions
): IsolationStrategy {
  if (options?.isolationStrategy) {
    return options.isolationStrategy;
  }
  const decoded = options?.jwt ? decodeJwt(options.jwt) : undefined;
  return getDefaultIsolationStrategy(decoded);
}
