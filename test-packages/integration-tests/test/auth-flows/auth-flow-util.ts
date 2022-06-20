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
  iasProvider: string;
  iasSubscriber: string;
}

export interface Systems {
  s4onPrem: {
    providerBasic: string;
    providerPrincipalPropagation: string;
  };
  s4: {
    providerBasic: string;
    providerClientCert: string;
    providerOAuth2SAMLBearerAssertion: string;
    subscriberBasic: string;
    providerSamlAssertion: string;
  };
  workflow: {
    providerOAuth2ClientCredentials: string;
    providerOAuth2UserTokenExchange: string;
    providerOauth2JWTBearer: string;
  };
  destination: {
    subscriberOauth2UserTokenExchange: string;
    providerOauth2Password: string;
    providerOauth2ClientCredentials: string;
    providerOauth2ClientCredentialsCommonTokenURL: string;
    providerOauth2JWTBearer: string;
    providerOauth2JWTBearerCommonTokenURL: string;
    providerOauth2UserTokenExchange: string;
    providerOauth2UserTokenExchangeCommonTokenURL: string;
    providerBasicPrivateLink: string;
    providerTrustStore: string;
    providerOauth2ClientCredentialsWithoutJKU: string;
  };
  email: {
    providerCloudBasic: string;
    providerOnPremBasic: string;
  };
}
