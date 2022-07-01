import { createLogger, flatten } from '@sap-cloud-sdk/util';
import { getVcapService } from '../environment-accessor';
import { JwtPayload } from '../jsonwebtoken-type';
import { serviceToken } from '../token-accessor';
import { Service } from '../environment-accessor-types';
import { decodeJwt } from '../jwt';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from './proxy-util';
import { Destination } from './destination-service-types';
import { DestinationFetchOptions } from './destination-accessor-types';
import { destinationCache, IsolationStrategy } from './destination-cache';
import { decodedJwtOrZid } from './destination-from-registration';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-accessor-vcap'
});

/**
 * Tries to build a destination from a service binding with the given name.
 * Throws an error if no services are bound at all, no service with the given name can be found, or the service type is not supported.
 * The last error can be circumvent by using the second parameter to provide a custom function that transforms a service binding to a destination.
 * @param serviceInstanceName - The name of the service.
 * @param options - Options to customize the behavior of this function.
 * @returns A destination.
 * @internal
 */
export async function destinationForServiceBinding(
  serviceInstanceName: string,
  options: DestinationForServiceBindingsOptions & {
    jwt?: JwtPayload;
    useCache?: boolean;
  } = {}
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
    ? await options.serviceBindingTransformFn(selected, options.jwt)
    : await transform(selected, options.jwt);

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
 * Options to customize the behavior of [[destinationForServiceBinding]].
 * @internal
 */
export interface DestinationForServiceBindingsOptions {
  /**
   * Custom transformation function to control how a [[Destination]] is built from the given [[ServiceBinding]].
   */
  serviceBindingTransformFn?: ServiceBindingTransformFunction;
}

/**
 * Type of the function to transform the service binding.
 */
export type ServiceBindingTransformFunction = (
  serviceBinding: ServiceBinding,
  jwt?: JwtPayload
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
 * @internal
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

const serviceToDestinationTransformers: Record<
  string,
  ServiceBindingTransformFunction
> = {
  'business-logging': businessLoggingBindingToDestination,
  's4-hana-cloud': xfS4hanaCloudBindingToDestination,
  destination: destinationBindingToDestination,
  'saas-registry': saasRegistryBindingToDestination,
  workflow: workflowBindingToDestination
};

async function transform(
  serviceBinding: ServiceBinding,
  jwt?: JwtPayload
): Promise<Destination> {
  if (!serviceToDestinationTransformers[serviceBinding.type]) {
    throw serviceTypeNotSupportedError(serviceBinding.type);
  }

  return serviceToDestinationTransformers[serviceBinding.type](
    serviceBinding,
    jwt
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

async function destinationBindingToDestination(
  serviceBinding: ServiceBinding,
  jwt?: JwtPayload
): Promise<Destination> {
  const service: Service = {
    ...serviceBinding,
    tags: serviceBinding.tags,
    label: 'destination',
    credentials: { ...serviceBinding.credentials }
  };
  const token = await serviceToken(service, { jwt });
  return buildClientCredentialsDesntiona(
    token,
    serviceBinding.credentials.uri,
    serviceBinding.name
  );
}

async function saasRegistryBindingToDestination(
  serviceBinding: ServiceBinding,
  jwt?: JwtPayload
) {
  const service: Service = {
    ...serviceBinding,
    tags: serviceBinding.tags,
    label: 'saas-registry',
    credentials: { ...serviceBinding.credentials }
  };
  const token = await serviceToken(service, { jwt });
  return buildClientCredentialsDesntiona(
    token,
    serviceBinding.credentials['saas_registry_url'],
    serviceBinding.name
  );
}

async function businessLoggingBindingToDestination(
  serviceBinding: ServiceBinding,
  jwt?: JwtPayload
): Promise<Destination> {
  const service: Service = {
    ...serviceBinding,
    tags: serviceBinding.tags,
    label: 'business-logging',
    credentials: { ...serviceBinding.credentials.uaa }
  };
  const token = await serviceToken(service, { jwt });
  return buildClientCredentialsDesntiona(
    token,
    serviceBinding.credentials.writeUrl,
    serviceBinding.name
  );
}

async function workflowBindingToDestination(
  serviceBinding: ServiceBinding,
  jwt: JwtPayload
) {
  const service: Service = {
    ...serviceBinding,
    tags: serviceBinding.tags,
    label: 'workflow',
    credentials: { ...serviceBinding.credentials.uaa }
  };
  const token = await serviceToken(service, { jwt });
  return buildClientCredentialsDesntiona(
    token,
    serviceBinding.credentials.endpoints.workflow_odata_url,
    serviceBinding.name
  );
}

function buildClientCredentialsDesntiona(
  token: string,
  url: string,
  name
): Destination {
  const expiresIn = Math.floor(
    (decodeJwt(token).exp! * 1000 - Date.now()) / 1000
  ).toString(10);
  return {
    url,
    name,
    authentication: 'OAuth2ClientCredentials',
    authTokens: [
      {
        value: token,
        type: 'bearer',
        expiresIn,
        http_header: { key: 'Authorization', value: `Bearer ${token}` },
        error: null
      }
    ]
  };
}

async function xfS4hanaCloudBindingToDestination(
  serviceBinding: ServiceBinding
): Promise<Destination> {
  return {
    url: serviceBinding.credentials.URL,
    authentication: 'BasicAuthentication',
    username: serviceBinding.credentials.User,
    password: serviceBinding.credentials.Password
  };
}

/**
 * @internal
 */
export async function searchServiceBindingForDestination(
  options: DestinationFetchOptions & DestinationForServiceBindingsOptions
): Promise<Destination | null> {
  logger.debug('Attempting to retrieve destination from service binding.');
  try {
    const jwt = options.iss
      ? { iss: options.iss }
      : options.jwt
      ? decodeJwt(options.jwt)
      : undefined;
    const destination = await destinationForServiceBinding(
      options.destinationName,
      {
        serviceBindingTransformFn: options.serviceBindingTransformFn,
        jwt,
        useCache: options.useCache
      }
    );
    logger.info('Successfully retrieved destination from service binding.');
    return destination;
  } catch (error) {
    logger.debug(
      `Could not retrieve destination from service binding. If you are not using SAP Extension Factory, this information probably does not concern you. ${error.message}`
    );
  }
  return null;
}
