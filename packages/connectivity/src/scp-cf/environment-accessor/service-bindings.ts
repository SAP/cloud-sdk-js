import { createLogger } from '@sap-cloud-sdk/util';
import * as xsenv from '@sap/xsenv';
import { Service } from './environment-accessor-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'environment-accessor'
});

/**
 * Returns a list of service instances for the given service type by label.
 * If no services are found, it matches by tag instead to support user-provided services.
 * @param service - Service name.
 * @returns List of service bindings of the given type. Returns an empty array if no service binding exists for the given type.
 * @internal
 */
export function getServiceBindings(service: string): Service[] {
  const servicesByLabel = xsenv.filterServices({ label: service });

  if (servicesByLabel.length) {
    return servicesByLabel;
  }

  logger.debug(
    'Found no service bindings for "%s" by label. Trying to match by tag instead.',
    service
  );
  return xsenv.filterServices({ tag: service });
}

/**
 * Returns the first found instance for the given service type by label.
 * If no service is found, it matches by tag instead to support user-provided services.
 * @param service - The service type.
 * @returns The first found service.
 * @internal
 */
export function getServiceBinding(service: string): Service | undefined {
  let services: Service[] = xsenv.filterServices({ label: service });

  if (!services.length) {
    logger.debug(
      'Found no service binding for "%s" by label. Trying to match by tag instead.',
      service
    );
    services = xsenv.filterServices({ tag: service });
  }

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
 * Takes a string that represents the service type and resolves it by calling {@link getServiceBinding}.
 * If the parameter is already an instance of {@link Service}, it is returned directly.
 *
 * Throws an error when no service can be found for the given type.
 * @param service - A string representing the service type or a {@link Service} instance.
 * @returns A {@link Service} instance.
 * @internal
 */
export function resolveServiceBinding(service: string | Service): Service {
  if (typeof service === 'string') {
    const serviceInstance = getServiceBinding(service);

    if (!serviceInstance) {
      throw Error(`Could not find service binding of type '${service}'.`);
    }

    return serviceInstance;
  }
  return service;
}

/**
 * Filters services based on service instance name. Throws an error if no or multiple services exist.
 * @internal
 */
export function getServiceBindingByInstanceName(
  serviceInstanceName: string
): Service {
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
