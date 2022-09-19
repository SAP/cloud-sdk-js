import { createLogger, first, unique } from '@sap-cloud-sdk/util';
import * as xsenv from '@sap/xsenv';
import { JwtPayload } from './jsonwebtoken-type';
import { audiences, decodeJwt } from './jwt';
import {
  DestinationServiceCredentials,
  Service,
  XsuaaServiceCredentials
} from './environment-accessor-types';
import { getDestinationServiceCredentials } from './destination';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'environment-accessor'
});

/**
 * Basic Credentials Getter from Destination service credentials needed for JWT generator.
 *
 * @returns Basic credentials.
 * @internal
 */
export function getDestinationBasicCredentials(): BasicCredentials {
  const destinationCredentials = getDestinationServiceCredentials();
  if (
    !destinationCredentials.clientid ||
    !destinationCredentials.clientsecret
  ) {
    throw Error(
      "JWT generation failed: Destination service credentials didn't contain ClientID or ClientSecret"
    );
  }

  const basicCredentials: BasicCredentials = {
    clientid: destinationCredentials.clientid,
    clientsecret: destinationCredentials.clientsecret
  };
  return basicCredentials;
}

/**
 * Destination credentials getter.
 *
 * @returns A list of 'credentials' objects in 'destination' service.
 * @internal
 */
export function getDestinationServiceCredentialsList(): DestinationServiceCredentials[] {
  return getServiceList('destination').map(
    s => s.credentials as DestinationServiceCredentials
  );
}

/**
 * Credentials list getter for a given service.
 * @param service - Service name
 * @returns Fetched credentials objects of existing service in 'VCAP_SERVICES'.
 * @internal
 */
export function getServiceCredentialsList(service: string): any[] {
  const credentials: any[] = [];
  getServiceList(service).forEach(entry => {
    if ('credentials' in entry) {
      credentials.push(entry['credentials']);
    } else {
      logger.warn(
        `Skipping a service in ${service}. Object has no 'credentials'.`
      );
    }
  });

  return credentials;
}

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
 * Returns the first found instance for the given service type.
 * @param service - The service type.
 * @returns The first found service.
 * @internal
 */
export function getService(service: string): Service | undefined {
  const services: Service[] = xsenv.filterServices({ label: service });

  if (!services.length) {
    logger.warn(
      `No services of type ${service} found! This might cause errors in other parts of the application.`
    );

    return undefined;
  }
  if (services.length > 1) {
    logger.warn(
      `Found more than one service instance for service type ${service}. Found: ${services
        .map(s => s.name)
        .join(', ')}. Selecting the first one.`
    );
  }

  return services[0];
}

/**
 * Filters services based on service instance name. Throws an error if no or multiple services exist.
 * @internal
 */
export function getServiceByInstanceName(
  serviceInstanceName: string
): Service | undefined {
  const service = xsenv.filterServices(serviceInstanceName);

  if (service.length > 1) {
    throw Error(
      `Multiple services with this name: "${serviceInstanceName}" were found.`
    );
  } else if (!service.length) {
    throw Error(
      `No service with the name: "${serviceInstanceName}" was found.`
    );
  }
  return service[0];
}

/**
 * Get destination service if one is present.
 *
 * @returns Destination service
 * @throws Error in case no destination service is found in the VCAP variables
 * @internal
 */
export function getDestinationService(): Service {
  const destinationService = getService('destination');

  if (!destinationService) {
    throw Error('No binding to a destination service found.');
  }
  return destinationService;
}

/**
 * Destination URI getter
 * NOTICE: If there exist more than one destination/uri, the function
 * returns the first entry.
 *
 * @returns The first existing uri in destination or `null`, if not found.
 * @internal
 */
export function getDestinationServiceUri(): string | null {
  const destinationServiceCredentials = getDestinationServiceCredentialsList();
  const uris: string[] = [];
  for (const credential of destinationServiceCredentials) {
    if ('uri' in credential) {
      uris.push(credential['uri']);
    } else {
      logger.debug(
        "Skipping credentials in 'destination'. 'uri' property not defined"
      );
    }
  }
  return uris[0] || null;
}

/**
 * Takes a decoded JWT and uses the client_id and audience claims to determine the XSUAA service instance
 * that issued the JWT. Returns the credentials if a match is found, otherwise throws an error.
 * If no decoded JWT is specified, then returns the first existing XSUAA credential service plan "application".
 * @param token - Either an encoded or decoded JWT.
 * @returns The credentials for a match, otherwise `null`.
 * @internal
 */
export function getXsuaaServiceCredentials(
  token?: JwtPayload | string
): XsuaaServiceCredentials {
  return typeof token === 'string'
    ? selectXsuaaInstance(decodeJwt(token))
    : selectXsuaaInstance(token);
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
      throw Error(
        `Unable to get access token for "${service}" service. No service instance of type "${service}" found.`
      );
    }

    return serviceInstance;
  }
  return service;
}

function selectXsuaaInstance(token?: JwtPayload): XsuaaServiceCredentials {
  const xsuaaCredentials: XsuaaServiceCredentials[] = getServiceList(
    'xsuaa'
  ).map(service => service.credentials as XsuaaServiceCredentials);

  if (!arrayHasAtLeastOneElement(xsuaaCredentials)) {
    throw Error(
      'No binding to an XSUAA service instance found. Please make sure to bind an instance of the XSUAA service to your application.'
    );
  }

  return token
    ? selectXsuaaInstanceWithJwt(xsuaaCredentials, token)
    : selectXsuaaInstanceWithoutJwt(xsuaaCredentials);
}

function handleOneXsuuaInstance(
  xsuaaCredentials: [XsuaaServiceCredentials]
): XsuaaServiceCredentials {
  logger.debug(
    `Only one XSUAA instance bound. This one is used: ${xsuaaCredentials[0].xsappname}`
  );
  return xsuaaCredentials[0];
}

function arrayHasAtLeastOneElement<T>(
  array: T[] | [T, ...T[]]
): array is [T, ...T[]] {
  return !!array.length && array.length > 0;
}

function arrayHasExactlyOneElement<T>(array: T[] | [T]): array is [T] {
  return array.length === 1;
}

function selectXsuaaInstanceWithoutJwt(
  xsuaaCredentials: [XsuaaServiceCredentials, ...XsuaaServiceCredentials[]]
): XsuaaServiceCredentials {
  if (!arrayHasExactlyOneElement(xsuaaCredentials)) {
    logger.warn(
      `The following XSUAA instances are bound: ${xsuaaCredentials.map(
        x => `\n\t- ${x.xsappname}`
      )}
      No JWT given to select XSUAA instance. ${choseFirstOneText(
        xsuaaCredentials
      )}`
    );
    return xsuaaCredentials[0];
  }
  return handleOneXsuuaInstance(xsuaaCredentials);
}

function selectXsuaaInstanceWithJwt(
  xsuaaCredentials: [XsuaaServiceCredentials, ...XsuaaServiceCredentials[]],
  jwt: JwtPayload
): XsuaaServiceCredentials {
  const selectedAll = [
    ...matchingClientId(xsuaaCredentials, jwt),
    ...matchingAudience(xsuaaCredentials, jwt)
  ];

  const selectedUnique = unique(selectedAll.map(x => x.clientid)).map(
    id => selectedAll.find(y => y.clientid === id)!
  );

  if (selectedUnique.length === 1) {
    logger.debug(
      `One XSUAA instance found using JWT in service binding. Used service name is: ${xsuaaCredentials[0].xsappname}`
    );
    return xsuaaCredentials[0];
  }

  if (selectedUnique.length > 1) {
    logger.warn(
      `Multiple XSUAA instances could be matched to the given JWT: ${xsuaaCredentials.map(
        x => `\n\t- ${x.xsappname}`
      )}
      ${choseFirstOneText(xsuaaCredentials)}`
    );
    return selectedUnique[0];
  }

  if (!arrayHasExactlyOneElement(xsuaaCredentials)) {
    logger.warn(
      `Multiple XSUAA instances found: ${xsuaaCredentials.map(
        x => `\n\t- ${x.xsappname}`
      )}
      None of those match either client id or audience from the given JWT. ${choseFirstOneText(
        xsuaaCredentials
      )}`
    );
    return xsuaaCredentials[0];
  }
  return handleOneXsuuaInstance(xsuaaCredentials);
}

function choseFirstOneText(
  xsuaaCredentials: XsuaaServiceCredentials[]
): string {
  return `Choosing the first one (xsappname: "${
    first(xsuaaCredentials)!.xsappname
  }").`;
}

function matchingClientId(
  xsuaaCredentials: XsuaaServiceCredentials[],
  token: JwtPayload
): XsuaaServiceCredentials[] {
  return xsuaaCredentials.filter(
    credentials => credentials.clientid === token.client_id
  );
}

function matchingAudience(
  xsuaaCredentials: XsuaaServiceCredentials[],
  token: JwtPayload
): XsuaaServiceCredentials[] {
  return xsuaaCredentials.filter(credentials =>
    audiences(token).has(credentials.xsappname)
  );
}

interface BasicCredentials {
  clientid: string;
  clientsecret: string;
}
