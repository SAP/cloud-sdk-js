import { createLogger } from '@sap-cloud-sdk/util';
import { JwtPayload } from '../jsonwebtoken-type';
import { decodeJwt } from '../jwt';
import { Service } from '../environment-accessor-types';
import { getServiceByInstanceName } from '../environment-accessor';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from './http-proxy-util';
import { Destination } from './destination-service-types';
import type { DestinationFetchOptions } from './destination-accessor-types';
import { destinationCache, IsolationStrategy } from './destination-cache';
import { decodedJwtOrZid } from './destination-from-registration';
import { serviceToDestinationTransformers } from './service-binding-to-destination';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-accessor-vcap'
});

/**
 * Represents partial options to fetch destinations.
 */
export interface PartialDestinationFetchOptions {
  /**
   * The fetched destination will be cached if set to true.
   */
  useCache?: boolean;
  /**
   * The jwt payload used to fetch destinations.
   */
  jwt?: JwtPayload;
}

/**
 * Tries to build a destination from a service binding with the given name.
 * Throws an error if no services are bound at all, no service with the given name can be found, or the service type is not supported.
 * The last error can be circumvent by using the second parameter to provide a custom function that transforms a service binding to a destination.
 * @param serviceInstanceName - The name of the service.
 * @param options - Options to customize the behavior of this function.
 * @returns A destination.
 */
export async function destinationForServiceBinding(
  serviceInstanceName: string,
  options: DestinationForServiceBindingOptions &
    PartialDestinationFetchOptions = {}
): Promise<Destination> {
  if (options.useCache) {
    const fromCache = await destinationCache.retrieveDestinationFromCache(
      options.jwt || decodedJwtOrZid().subaccountid,
      serviceInstanceName,
      IsolationStrategy.Tenant
    );
    if (fromCache) {
      return fromCache;
    }
  }

  const selected = getServiceByInstanceName(serviceInstanceName)!;
  const destination = options.serviceBindingTransformFn
    ? await options.serviceBindingTransformFn(selected, options)
    : await transform(selected, options);

  const destWithProxy =
    destination &&
    (proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY ||
      proxyStrategy(destination) === ProxyStrategy.PRIVATELINK_PROXY)
      ? addProxyConfigurationInternet(destination)
      : destination;

  if (options.useCache) {
    // use the provider tenant if no jwt is given. Since the grant type is clientCredential isolation strategy is tenant.
    await destinationCache.cacheRetrievedDestination(
      options.jwt || decodedJwtOrZid().subaccountid,
      destWithProxy,
      IsolationStrategy.Tenant
    );
  }

  return destWithProxy;
}

/**
 * Options to customize the behavior of {@link destinationForServiceBinding}.
 */
export interface DestinationForServiceBindingOptions {
  /**
   * Custom transformation function to control how a {@link Destination} is built from the given {@link Service}.
   */
  serviceBindingTransformFn?: ServiceBindingTransformFunction;
}

/**
 * Type of the function to transform the service binding.
 */
export type ServiceBindingTransformFunction = (
  service: Service,
  options?: PartialDestinationFetchOptions
) => Promise<Destination>;

async function transform(
  service: Service,
  options?: PartialDestinationFetchOptions
): Promise<Destination> {
  if (!serviceToDestinationTransformers[service.label]) {
    throw serviceTypeNotSupportedError(service);
  }

  return serviceToDestinationTransformers[service.label](service, options);
}

function serviceTypeNotSupportedError(service: Service): Error {
  return Error(`The service "${service.name}" is of type "${service.label}" which is not supported! Consider providing your own transformation function when calling destinationForServiceBinding, like this:
  destinationServiceForBinding(yourServiceName, { serviceBindingToDestination: yourTransformationFunction });`);
}

/**
 * @internal
 */
export async function searchServiceBindingForDestination({
  iss,
  jwt,
  serviceBindingTransformFn,
  destinationName,
  useCache
}: DestinationFetchOptions &
  DestinationForServiceBindingOptions): Promise<Destination | null> {
  logger.debug('Attempting to retrieve destination from service binding.');
  try {
    const jwtFromOptions = iss ? { iss } : jwt ? decodeJwt(jwt) : undefined;
    const useCacheIgnoringUndefined =
      typeof useCache !== 'undefined' ? { useCache } : {};
    const destination = await destinationForServiceBinding(destinationName, {
      serviceBindingTransformFn,
      jwt: jwtFromOptions,
      ...useCacheIgnoringUndefined
    });
    logger.info('Successfully retrieved destination from service binding.');
    return destination;
  } catch (error) {
    logger.debug(
      `Could not retrieve destination from service binding. If you are not using SAP Extension Factory, this information probably does not concern you. ${error.message}`
    );
  }
  return null;
}
