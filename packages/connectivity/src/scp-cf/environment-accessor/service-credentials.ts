import { createLogger } from '@sap-cloud-sdk/util';
import { JwtPayload } from '../jsonwebtoken-type';
import { audiences, decodeJwt } from '../jwt';
import { ServiceCredentials } from './environment-accessor-types';
import { getServiceBindings } from './service-bindings';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'environment-accessor'
});

/**
 * @internal
 * Retrieves a service binding of the given type and tries to match it based on the JWT, if given.
 * If no match was found or no JWT is given, the first binding is returned.
 * Throws an error if there are no bindings of the given type.
 * @param service - The service type.
 * @param token - Either an encoded or decoded JWT.
 * @returns The credentials for a match, otherwise `null`.
 */
export function getServiceCredentials<
  ServiceCredentialsT extends ServiceCredentials
>(service: string, token?: JwtPayload | string): ServiceCredentialsT {
  const credentialsList = getServiceBindingsWithCredentials(service);

  if (!credentialsList.length) {
    throw Error(
      `Could not find binding to service '${service}', that includes credentials.`
    );
  }

  if (token) {
    const credentials = getCredentialsWithJwt(
      service,
      credentialsList,
      typeof token === 'string' ? decodeJwt(token) : token
    );

    if (credentials) {
      return credentials;
    }

    logger.debug(
      'Could not match binding service instance using JWT client id or audience.'
    );
  } else {
    logger.debug(`No JWT given to select binding to service '${service}.`);
  }

  return getCredentialsWithoutJwt(service, credentialsList);
}

/**
 * Credentials list getter for a given service.
 * @param service - Service name.
 * @returns Fetched credentials objects of existing service in 'VCAP_SERVICES'.
 */
function getServiceBindingsWithCredentials(service: string): any[] {
  const services = getServiceBindings(service);
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
 * @internal
 * Takes a JWT and uses the client_id and audience claims to determine the XSUAA service instance
 * that issued the JWT. Returns the credentials if a match is found, otherwise throws an error.
 * If no decoded JWT is specified, then returns the first existing XSUAA credential service plan "application".
 * @param token - Either an encoded or decoded JWT.
 * @returns The credentials for a match, otherwise `null`.
 */
function getCredentialsWithJwt<ServiceCredentialsT extends ServiceCredentials>(
  service: string,
  credentials: ServiceCredentialsT[],
  token: JwtPayload
): ServiceCredentialsT | undefined {
  const eligibleCredentials = credentials.filter(
    c => matchesClientId(c, token) || matchesAudience(c, token)
  );

  logResult(service, eligibleCredentials, true);
  return eligibleCredentials[0];
}

function getCredentialsWithoutJwt<
  ServiceCredentialsT extends ServiceCredentials
>(service: string, credentials: ServiceCredentialsT[]): ServiceCredentialsT {
  logResult(service, credentials, false);
  return credentials[0];
}

function logResult<ServiceCredentialsT extends ServiceCredentials>(
  service: string,
  credentials: ServiceCredentialsT[],
  usedToken: boolean
) {
  if (credentials.length === 1) {
    logger.debug(
      `Found one service binding for service '${service}'${usingJwtText(
        usedToken
      )}. ${appNames(credentials)}`
    );
  } else if (credentials.length > 1) {
    logger.warn(
      `Found multiple bindings for service '${service}'${usingJwtText(
        usedToken
      )}. ${appNames(credentials)}\nChoosing first one ('${
        credentials[0].xsappname
      }').`
    );
  }
}

function usingJwtText(usedToken: boolean) {
  return usedToken ? ' using JWT' : '';
}

function appNames<ServiceCredentialsT extends ServiceCredentials>(
  credentials: ServiceCredentialsT[]
) {
  const names = credentials.map(({ xsappname }) => xsappname);
  if (names.length) {
    return names.length === 1
      ? `App name: ${names[0]}.`
      : `App names:${names.map(name => `\n\t- ${name}`).join('')}`;
  }
  return '';
}

/**
 * @internal
 * Checks whether the client id in the token and in the given credentials match.
 * @param credentials - Credentials to check.
 * @param token - Token to check.
 * @returns Whether client ids match.
 */
function matchesClientId(
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
function matchesAudience(
  credentials: ServiceCredentials,
  token: JwtPayload
): boolean {
  return audiences(token).has(credentials.xsappname);
}
