import { createLogger } from '@sap-cloud-sdk/util';
import { JwtPayload } from '../jsonwebtoken-type';
import { decodeJwt, decodeOrMakeJwt } from '../jwt';
import { Service } from '../environment-accessor/environment-accessor-types';
import { getServiceBindingByInstanceName } from '../environment-accessor';
import { CachingOptions } from '../cache';
import {
  addProxyConfigurationInternet,
  proxyStrategy
} from './http-proxy-util';
import { Destination, isHttpDestination } from './destination-service-types';
import type { DestinationFetchOptions } from './destination-accessor-types';
import { destinationCache } from './destination-cache';
import { serviceToDestinationTransformers } from './service-binding-to-destination';
import { setForwardedAuthTokenIfNeeded } from './forward-auth-token';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-accessor-vcap'
});

/**
 * @deprecated Since v3.4.0. Use either `ServiceBindingTransformOptions` or `getDestinationFromServiceBinding`.
 * Represents partial options to fetch destinations.
 */
export type PartialDestinationFetchOptions = {
  /**
   * The JWT used to fetch destinations.
   * The use of `JwtPayload` is deprecated since v3.4.0 and will be removed in the next major version update.
   * Use `string` instead.
   */
  jwt?: JwtPayload;
} & CachingOptions;

/**
 * Tries to build a destination from a service binding with the given name.
 * Throws an error if no services are bound at all, no service with the given name can be found, or the service type is not supported.
 * The last error can be circumvent by using the second parameter to provide a custom function that transforms a service binding to a destination.
 * @param options - Options to customize the behavior of this function.
 * @returns A destination.
 */
export async function getDestinationFromServiceBinding(
  options: Pick<
    DestinationFetchOptions,
    'jwt' | 'iss' | 'useCache' | 'destinationName'
  > &
    DestinationForServiceBindingOptions
): Promise<Destination> {
  const decodedJwt = options.iss
    ? { iss: options.iss }
    : options.jwt
    ? decodeJwt(options.jwt)
    : undefined;

  const retrievalOptions = { ...options, jwt: decodedJwt };
  const destination =
    (await retrieveDestinationFromCache(retrievalOptions)) ||
    (await retrieveDestinationWithoutCache(retrievalOptions));

  const destWithProxy =
    destination &&
    isHttpDestination(destination) &&
    ['internet', 'private-link'].includes(proxyStrategy(destination))
      ? addProxyConfigurationInternet(destination)
      : destination;

  if (options.useCache) {
    // As the grant type is clientCredential, isolation strategy is 'tenant'.
    await destinationCache.cacheRetrievedDestination(
      decodeOrMakeJwt(options.jwt),
      destWithProxy,
      'tenant'
    );
  }

  setForwardedAuthTokenIfNeeded(destWithProxy, options.jwt);

  return destWithProxy;
}

async function retrieveDestinationFromCache(
  options: Pick<DestinationFetchOptions, 'useCache' | 'destinationName'> & {
    jwt?: JwtPayload;
  }
) {
  if (options.useCache) {
    return destinationCache.retrieveDestinationFromCache(
      decodeOrMakeJwt(options.jwt),
      options.destinationName,
      'tenant'
    );
  }
}

async function retrieveDestinationWithoutCache({
  useCache,
  jwt,
  destinationName,
  serviceBindingTransformFn
}: Pick<DestinationFetchOptions, 'useCache' | 'destinationName'> & {
  jwt?: JwtPayload;
} & DestinationForServiceBindingOptions) {
  const selected = getServiceBindingByInstanceName(destinationName);
  return (serviceBindingTransformFn || transform)(selected, {
    useCache,
    jwt
  });
}

/**
 * Tries to build a destination from a service binding with the given name.
 * Throws an error if no services are bound at all, no service with the given name can be found, or the service type is not supported.
 * The last error can be circumvent by using the second parameter to provide a custom function that transforms a service binding to a destination.
 * @param serviceInstanceName - The name of the service.
 * @param options - Options to customize the behavior of this function.
 * @returns A destination.
 * @deprecated Since v3.4.0. Use {@link `getDestinationForServiceBinding`} instead.
 */
export async function destinationForServiceBinding(
  serviceInstanceName: string,
  options: DestinationForServiceBindingOptions &
    PartialDestinationFetchOptions = {}
): Promise<Destination> {
  if (options.useCache) {
    const destinationFromCache =
      await destinationCache.retrieveDestinationFromCache(
        decodeOrMakeJwt(options.jwt),
        serviceInstanceName,
        'tenant'
      );

    if (destinationFromCache) {
      return destinationFromCache;
    }
  }

  const optionsForTransformation = {
    useCache: options.useCache,
    jwt: options.jwt
  };
  const selected = getServiceBindingByInstanceName(serviceInstanceName);
  const transformFn = options.serviceBindingTransformFn || transform;
  const destination = await transformFn(selected, optionsForTransformation);

  const destWithProxy =
    destination &&
    isHttpDestination(destination) &&
    ['internet', 'private-link'].includes(proxyStrategy(destination))
      ? addProxyConfigurationInternet(destination)
      : destination;

  if (options.useCache) {
    // As the grant type is clientCredential, isolation strategy is 'tenant'.
    await destinationCache.cacheRetrievedDestination(
      decodeOrMakeJwt(options.jwt),
      destWithProxy,
      'tenant'
    );
  }

  return destWithProxy;
}

/**
 * Options to customize the behavior of {@link getDestinationFromServiceBinding}.
 */
export interface DestinationForServiceBindingOptions {
  /**
   * Custom transformation function to control how a {@link Destination} is built from the given {@link Service}.
   */
  serviceBindingTransformFn?: ServiceBindingTransformFunction;
}

/**
 * Represents options passed to the service binding transform function.
 */
export type ServiceBindingTransformOptions = {
  /**
   * The JWT payload used to fetch destinations.
   */
  jwt?: JwtPayload;
} & CachingOptions;

/**
 * Type of the function to transform the service binding.
 */
export type ServiceBindingTransformFunction = (
  service: Service,
  options?: ServiceBindingTransformOptions
) => Promise<Destination>;

async function transform(
  service: Service,
  options?: ServiceBindingTransformOptions
): Promise<Destination> {
  if (!serviceToDestinationTransformers[service.label]) {
    throw serviceTypeNotSupportedError(service);
  }

  return serviceToDestinationTransformers[service.label](service, options);
}

function serviceTypeNotSupportedError(service: Service): Error {
  return Error(`The service "${service.name}" is of type "${service.label}" which is not supported! Consider providing your own transformation function when calling \`getDestinationFromServiceBinding()\`, like this:
  destinationServiceForBinding(yourServiceName, { serviceBindingToDestination: yourTransformationFunction });`);
}

/**
 * @internal
 */
export async function searchServiceBindingForDestination(
  options: DestinationFetchOptions & DestinationForServiceBindingOptions
): Promise<Destination | null> {
  logger.debug('Attempting to retrieve destination from service binding.');
  try {
    // TODO: Why did we do this?
    // const useCacheIgnoringUndefined =
    //   typeof useCache !== 'undefined' ? { useCache } : {};
    const destination = await getDestinationFromServiceBinding(options);

    logger.info('Successfully retrieved destination from service binding.');
    return destination;
  } catch (error) {
    logger.debug(
      `Could not retrieve destination from service binding. If you are not using SAP Extension Factory, this information probably does not concern you. ${error.message}`
    );
  }
  return null;
}
