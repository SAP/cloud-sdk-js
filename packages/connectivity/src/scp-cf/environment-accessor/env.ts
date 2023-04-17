import { createLogger } from '@sap-cloud-sdk/util';
import * as xsenv from '@sap/xsenv';
import { JwtPayload } from '../jsonwebtoken-type';
import { audiences } from '../jwt';
import { Service, ServiceCredentials } from './environment-accessor-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'environment-accessor'
});

/**
 * Services getter for a given service.
 * @param service - Service name.
 * @returns List of service bindings of the given type. Returns an empty array if no service binding exists for the given type.
 * @internal
 */
export function getServiceList(service: string): Service[] {
  return xsenv.filterServices({ label: service });
}

/**
 * Credentials list getter for a given service.
 * @param service - Service name
 * @returns Fetched credentials objects of existing service in 'VCAP_SERVICES'.
 * @internal
 */
export function getServiceCredentialsList(service: string): any[] {
  const services = getServiceList(service);
  const serviceCredentials = services
    .map(({ credentials }) => credentials)
    .filter(credentials => credentials);

  if (serviceCredentials.length < services.length) {
    const difference = services.length - serviceCredentials.length;
    logger.warn(
      `Ignoring ${difference} service binding${
        difference > 1 ? 's' : ''
      } of service type '${service}' because of missing credentials.`
    );
  }

  return serviceCredentials;
}

/**
 * Returns the first found instance for the given service type.
 * @param service - The service type.
 * @returns The first found service.
 * @internal
 */
export function getService(service: string): Service | undefined {
  const services: Service[] = xsenv.filterServices({ label: service });

  if (!services.length) {
    logger.warn(
      `Could not find service binding of type '${service}'. This might cause errors in other parts of the application.`
    );
  } else if (services.length > 1) {
    logger.warn(
      `Found more than one service binding for service type '${service}':${services
        .map(({ name }) => `\n\t- ${name}`)
        .join('')}\nSelecting the first one.`
    );
  }

  return services[0];
}

/**
 * Takes a string that represents the service type and resolves it by calling {@link getService}.
 * If the parameter is already an instance of {@link Service}, it is returned directly.
 *
 * Throws an error when no service can be found for the given type.
 * @param service - A string representing the service type or a {@link Service} instance.
 * @returns A {@link Service} instance.
 * @internal
 */
export function resolveService(service: string | Service): Service {
  if (typeof service === 'string') {
    const serviceInstance = getService(service);

    if (!serviceInstance) {
      throw Error(`Could not find service binding for type '${service}'.`);
    }

    return serviceInstance;
  }
  return service;
}

/**
 * Filters services based on service instance name. Throws an error if no or multiple services exist.
 * @internal
 */
export function getServiceByInstanceName(
  serviceInstanceName: string
): Service | undefined {
  const service = xsenv.filterServices(serviceInstanceName);

  if (!service.length) {
    throw Error(`Could not find service with name: '${serviceInstanceName}'.`);
  }
  // This never happens as xsenv always takes the last matching binding
  if (service.length > 1) {
    throw Error(`Found multiple services with name: '${serviceInstanceName}'.`);
  }
  return service[0];
}

/**
 * @internal
 * Checks whether the client id in the token and in the given credentials match.
 * @param credentials - Credentials to check.
 * @param token - Token to check.
 * @returns Whether client ids match.
 */
export function matchesClientId(
  credentials: ServiceCredentials,
  token: JwtPayload
): boolean {
  return credentials.clientid === token.client_id;
}

/**
 * @internal
 * Checks whether the audiences in the token and in the given credentials match.
 * @param credentials - Credentials to check.
 * @param token - Token to check.
 * @returns Whether audiences match.
 */
export function matchesAudience(
  credentials: ServiceCredentials,
  token: JwtPayload
): boolean {
  return audiences(token).has(credentials.xsappname);
}
