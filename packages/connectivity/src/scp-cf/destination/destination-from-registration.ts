import { createLogger } from '@sap-cloud-sdk/util';
import { decodeJwt } from '../jwt';
import { getXsuaaServiceCredentials } from '../environment-accessor';
import { Destination, DestinationAuthToken } from './destination-service-types';
import { DestinationFetchOptions } from './destination-accessor-types';
import {
  DefaultDestinationCache,
  DestinationCache,
  getDefaultIsolationStrategy,
  IsolationStrategy
} from './destination-cache';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from './http-proxy-util';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'register-destination'
});

/**
 * @internal
 */
export const registerDestinationCache = DestinationCache(
  new DefaultDestinationCache(undefined)
);

/**
 * Represents options to configure how a destination should be registered.
 */
export type RegisterDestinationOptions = Pick<
  DestinationFetchOptions,
  'jwt' | 'isolationStrategy'
>;

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
  if (!destination.name || !destination.url) {
    throw Error(
      'Registering destinations requires a destination name and url.'
    );
  }

  await registerDestinationCache.cacheRetrievedDestination(
    decodedJwtOrZid(options),
    destination,
    isolationStrategy(options)
  );
}

/**
 * Represents a destination with a `name` property.
 */
export type DestinationWithName = Destination & { name: string };

/**
 * @internal
 * @param options - The options for searching the cahce
 * @returns Destination - the destination from cache
 */
export async function searchRegisteredDestination(
  options: DestinationFetchOptions
): Promise<Destination | null> {
  let decodedJwt: Record<string, any>;
  // An error will be thrown if no jwt and no xsuaa service exist.
  try {
    decodedJwt = decodedJwtOrZid(options);
  } catch (e) {
    logger.debug(
      'Failed to retrieve registered destination, because it was neither possible to decode jwt nor create a dummy jwt with `zid` property.'
    );
    logger.debug(e);
    return null;
  }

  const destination =
    (await registerDestinationCache.retrieveDestinationFromCache(
      decodedJwt,
      options.destinationName,
      isolationStrategy(options)
    )) || null;

  if (destination?.forwardAuthToken) {
    destination.authTokens = destinationAuthToken(options.jwt);
  }

  if (destination) {
    logger.info(
      `Successfully retrieved destination '${options.destinationName}' from registered destinations.`
    );
  } else {
    logger.debug(
      `Could not retrieve '${options.destinationName}' from registered destinations.`
    );
  }

  return destination &&
    (proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY ||
      proxyStrategy(destination) === ProxyStrategy.PRIVATELINK_PROXY)
    ? addProxyConfigurationInternet(destination)
    : destination;
}

/**
 * If a explicit isolation strategy is given by the user this is used. If not the isolation strategy is determined in the following way:
 * If a JWT is given and it contains a user_id the isolation is 'TenantUser'. If no JWT is given or it does not contian a user the isolation is 'Tenant'.
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

/**
 * This method either decodes the given JWT. If the JWT is not given it will use the subdomain if the XSUAA and create a Object with zid this subdomain.
 * This is then passed on to build the cache key.
 * @param options - Options passed to register the destination containing the jwt.
 * @returns The decoded JWT or a dummy JWT containing the tenant identifier (zid).
 * @internal
 */
export function decodedJwtOrZid(
  options?: RegisterDestinationOptions
): Record<string, any> {
  if (options?.jwt) {
    return decodeJwt(options.jwt);
  }

  const providerTenantId = getXsuaaServiceCredentials(
    options?.jwt
  ).subaccountid;

  return { zid: providerTenantId };
}

function destinationAuthToken(
  token?: string
): [DestinationAuthToken] | undefined {
  if (token) {
    const decoded = decodeJwt(token);
    logger.debug(
      "Option 'forwardAuthToken' enabled on destination. Using the initial token for the destination."
    );
    return [
      {
        value: token,
        expiresIn: decoded.exp!.toString(),
        error: null,
        http_header: { key: 'Authorization', value: `Bearer ${token}` },
        type: 'Bearer'
      }
    ];
  }
  logger.warn(
    "Option 'forwardAuthToken' was set on destination but no token was provided to forward. This is most likely unintended and will lead to a authorization error on request execution."
  );
}
