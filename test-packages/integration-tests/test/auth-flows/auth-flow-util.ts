import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('oauth-util');

export function loadLocalVcap(fileName = 'vcap-services.json') {
  const json = readJson(fileName);

  process.env.VCAP_SERVICES = JSON.stringify(json.VCAP_SERVICES);
  logger.info(`VCAP_SERVICES: ${process.env.VCAP_SERVICES}`);
}

export function readUserAccessToken(
  fileName = 'user-access-token.json'
): UserAccessTokens {
  return readJson(fileName);
}

export function readSystems(fileName = 'systems.json'): Systems {
  return readJson(fileName);
}

function readJson(fileName: string) {
  const path = resolve(__dirname, fileName);
  if (existsSync(path)) {
    const fileContent = readFileSync(path, { encoding: 'utf8' });
    return JSON.parse(fileContent);
  }
  throw Error(`${path} not found`);
}

export interface UserAccessTokens {
  provider: string;
  subscriber: string;
}

export interface Systems {
  s4: {
    providerBasic: string;
    providerClientCert: string;
    providerOAuth2SAMLBearerAssertion: string;
    subscriberBasic: string;
  };
  workflow: {
    providerOAuth2ClientCredentials: string;
    providerOAuth2UserTokenExchange: string;
    providerOauth2JWTBearer: string;
  };
  destination: {
    subscriberOAuth2UserTokenExchange: string;
  };
}
