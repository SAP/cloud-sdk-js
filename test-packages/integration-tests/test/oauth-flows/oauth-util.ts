import { resolve } from 'path';
import { existsSync, readFileSync } from 'fs';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('oauth-util');

export function loadLocalVcap(fileName = 'vcap-services.json') {
  const fileContent = readFile(fileName);

  process.env.VCAP_SERVICES = JSON.stringify(
    JSON.parse(fileContent).VCAP_SERVICES
  );
  logger.info(`VCAP_SERVICES: ${process.env.VCAP_SERVICES}`);
}

function readFile(fileName: string): string {
  const path = resolve(__dirname, fileName);
  if (existsSync(path)) {
    const fileContent = readFileSync(path, { encoding: 'utf8' });
    return fileContent;
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
    subscriberBasic: string;
  };
  workflow: {
    providerClientCert: string;
    providerUserExchange: string;
  };
}
