import { createLogger } from '@sap-cloud-sdk/util';
import { DestinationServiceCredentials } from './environment-accessor-types';
import { getServiceCredentialsList } from './env';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'environment-accessor'
});

/**
 * Utility function to get destination service credentials, including error handling.
 * @internal
 */
export function getDestinationServiceCredentials(): DestinationServiceCredentials {
  const credentials = getServiceCredentialsList('destination');

  if (!credentials.length) {
    throw Error(
      'Could not find binding to the destination service, that includes credentials.'
    );
  }
  if (credentials.length > 1) {
    logger.warn(
      'Found multiple bindings to the destination service. Using the first one.'
    );
  }

  return credentials[0];
}
