import { createLogger } from '@sap-cloud-sdk/util';
import { JwtPayload } from '../jsonwebtoken-type';
import { decodeJwt } from '../jwt';
import { XsuaaServiceCredentials } from './environment-accessor-types';
import {
  getServiceCredentialsList,
  matchesAudience,
  matchesClientId
} from './env';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'environment-accessor'
});

/**
 * @internal
 * Takes a decoded JWT and uses the client_id and audience claims to determine the XSUAA service instance
 * that issued the JWT. Returns the credentials if a match is found, otherwise throws an error.
 * If no decoded JWT is specified, then returns the first existing XSUAA credential service plan "application".
 * @param token - Either an encoded or decoded JWT.
 * @returns The credentials for a match, otherwise `null`.
 */
export function getXsuaaServiceCredentials(
  token?: JwtPayload | string
): XsuaaServiceCredentials {
  const xsuaaCredentials = getServiceCredentialsList('xsuaa');

  if (!xsuaaCredentials.length) {
    throw Error(
      'Could not find binding to the XSUAA service, that includes credentials.'
    );
  }

  if (token) {
    return getCredentialsWithJwt(
      xsuaaCredentials,
      typeof token === 'string' ? decodeJwt(token) : token
    );
  }
  logger.debug('No JWT given to select XSUAA instance.');

  return getCredentialsWithoutJwt(xsuaaCredentials);
}

function getCredentialsWithJwt(
  xsuaaCredentials: XsuaaServiceCredentials[],
  token: JwtPayload
): XsuaaServiceCredentials {
  const eligibleCredentials = xsuaaCredentials.filter(
    credentials =>
      matchesClientId(credentials, token) || matchesAudience(credentials, token)
  );

  logResult(eligibleCredentials, true);

  if (eligibleCredentials.length) {
    return eligibleCredentials[0];
  }

  logger.debug(
    'Could not match XSUAA service instance using JWT client id or audience.'
  );

  return getCredentialsWithoutJwt(xsuaaCredentials);
}

function getCredentialsWithoutJwt(
  xsuaaCredentials: XsuaaServiceCredentials[]
): XsuaaServiceCredentials {
  logResult(xsuaaCredentials, false);
  return xsuaaCredentials[0];
}

function logResult(credentials: XsuaaServiceCredentials[], usedToken: boolean) {
  if (credentials.length === 1) {
    logger.debug(
      `Found one XSUAA service instance${usingJwtText(usedToken)}. ${appNames(
        credentials
      )}`
    );
  } else if (credentials.length > 1) {
    logger.warn(
      `Found multiple XSUAA service instances${usingJwtText(
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

function appNames(credentials: XsuaaServiceCredentials[]) {
  const names = credentials.map(({ xsappname }) => xsappname);
  return names.length === 1
    ? `App name: ${names[0]}.`
    : `App names: ${names.map(name => `\n\t- ${name}`)}`;
}
