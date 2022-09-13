import { createLogger } from '@sap-cloud-sdk/util';
import { exchangeToken, isTokenExchangeEnabled } from '../identity-service';
import { getDestinationServiceCredentials } from './destination-accessor';
import { DestinationOptions } from './destination-accessor-types';
import {
  DestinationFromServiceRetriever
} from './destination-from-service';
import {
  fetchInstanceDestinations,
  fetchSubaccountDestinations
} from './destination-service';
import { Destination } from './destination-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-accessor-service'
});

/**
 * Some docs.
 */
export type DestinationWithoutToken = Omit<Destination, 'authTokens'>;

/**
 * Some docs.
 */
export type AllDestinationOptions = Omit<
  DestinationOptions,
  'selectionStrategy' | 'isolationStrategy'
>;

/**
 * Some docs.
 * @param options - Some docs.
 * @returns Something.
 */
export async function getAllDestinationsFromDestinationService(
  options: AllDestinationOptions
): Promise<DestinationWithoutToken[] | null> {
  logger.debug(
    'Attempting to retrieve all destinations from destination service.'
  );
  if (isTokenExchangeEnabled(options)) {
    options.jwt = await exchangeToken(options);
  }

  const token = (await DestinationFromServiceRetriever.getSubscriberToken(options))?.serviceJwt || (await DestinationFromServiceRetriever.getProviderServiceToken(options));

  const destinationServiceUri = getDestinationServiceCredentials().uri;
  logger.debug(`Retrieving all destinations for account: "${new URL(token.decoded.iss!).hostname}" from destination service.`);

  const [instance, subaccount] = await Promise.all([
    fetchInstanceDestinations(destinationServiceUri, token.encoded, options),
    fetchSubaccountDestinations(destinationServiceUri, token.encoded, options)
  ]);

  let loggerMessage = '';
  instance.map(destination => loggerMessage += `Retrieving instance destination: ${destination.name}.\n`);
  subaccount.map(destination => loggerMessage += `Retrieving subaccount destination: ${destination.name}.\n`);
  logger.debug(loggerMessage);

  const allDestinations = instance.concat(subaccount);

  if (allDestinations) {
    logger.debug(
      `Successfully retrieved all destinations for account: "${new URL(token.decoded.iss!).hostname}" from destination service.`
    );
  }
  if (!allDestinations) {
    logger.debug('Could not retrieve destinations from destination service.');
  }

  if (!allDestinations) {
    return null;
  }

  return allDestinations;
}
