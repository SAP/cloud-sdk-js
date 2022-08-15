import { createLogger, flatten } from '@sap-cloud-sdk/util';
import { getVcapService } from '../environment-accessor';
import { JwtPayload } from '../jsonwebtoken-type';
import { decodeJwt } from '../jwt';
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
  useCache?: boolean;
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

  const serviceBindings = loadServiceBindings();
  const selected = findServiceByName(serviceBindings, serviceInstanceName);
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
   * Custom transformation function to control how a {@link Destination} is built from the given {@link ServiceBinding}.
   */
  serviceBindingTransformFn?: ServiceBindingTransformFunction;
}

/**
 * Type of the function to transform the service binding.
 */
export type ServiceBindingTransformFunction = (
  serviceBinding: ServiceBinding,
  options?: PartialDestinationFetchOptions
) => Promise<Destination>;

/**
 * Represents the JSON object for a given service binding as obtained from the VCAP_SERVICE environment variable.
 * To see service bindings, run `cf env <app-name>` in the terminal. This will produce output like this:
 * ```
 * {
 * ...
 *   "VCAP_SERVICES": {
 *     "s4-hana-cloud": [
 *       {
 *         "name": "...",
 *         "type": "...".
 *         ...
 *       }
 *     ]
 *   }
 * }
 * ```
 * In this example, the key "s4-hana-cloud" refers to an array of service bindings.
 */
export interface ServiceBinding {
  [key: string]: any;
  name: string;
  type: string;
}

function loadServiceBindings(): ServiceBinding[] {
  const vcapServices = getVcapService();
  if (!vcapServices) {
    throw noVcapServicesError();
  }
  return transformServiceBindings(vcapServices) as ServiceBinding[];
}

const transformServiceBindings = (vcapService: Record<string, any>) => {
  const serviceTypes = inlineServiceTypes(vcapService);
  const flattened = flattenServiceBindings(serviceTypes);
  return flattened;
};

function flattenServiceBindings(
  vcapServices: Record<string, any>
): Record<string, any>[] {
  return flatten(Object.values(vcapServices));
}

function inlineServiceTypes(
  vcapServices: Record<string, any>
): Record<string, any> {
  return Object.entries(vcapServices).reduce(
    (vcap, [serviceType, bindings]) => ({
      ...vcap,
      [serviceType]: bindings.map(b => ({ ...b, type: serviceType }))
    }),
    {}
  );
}

function findServiceByName(
  serviceBindings: ServiceBinding[],
  serviceInstanceName: string
): ServiceBinding {
  const found = serviceBindings.find(s => s.name === serviceInstanceName);
  if (!found) {
    throw noServiceBindingFoundError(serviceBindings, serviceInstanceName);
  }
  return found;
}

async function transform(
  serviceBinding: ServiceBinding,
  options?: PartialDestinationFetchOptions
): Promise<Destination> {
  if (!serviceToDestinationTransformers[serviceBinding.type]) {
    throw serviceTypeNotSupportedError(serviceBinding.type);
  }

  return serviceToDestinationTransformers[serviceBinding.type](
    serviceBinding,
    options
  );
}

function noVcapServicesError(): Error {
  return Error(
    'No services are bound to the application (environment variable VCAP_SERVICES is not defined)!'
  );
}

function serviceTypeNotSupportedError(serviceType: string): Error {
  return Error(`Service of type ${serviceType} is not supported! Consider providing your own transformation function when calling destinationForServiceBinding, like this:
  destinationServiceForBinding(yourServiceName, { serviceBindingToDestination: yourTransformationFunction });`);
}

function noServiceBindingFoundError(
  serviceBindings: Record<string, any>[],
  serviceInstanceName: string
): Error {
  return Error(
    `Unable to find a service binding for given name "${serviceInstanceName}"! Found the following bindings: ${serviceBindings
      .map(s => s.name)
      .join(', ')}.
      `
  );
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
