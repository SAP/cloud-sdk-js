import { createLogger } from '@sap-cloud-sdk/util';
import { getDestinationServiceCredentialsList } from '../environment-accessor';
import { exchangeToken, isTokenExchangeEnabled } from '../identity-service';
import { JwtPair } from '../jwt';
import { DestinationOptions } from './destination-accessor-types';
import {
  DestinationFromServiceRetriever,
  SubscriberToken
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

  const subscriberToken =
    await DestinationFromServiceRetriever.getSubscriberToken(options);

  let providerToken: JwtPair | undefined;
  if (!subscriberToken) {
    providerToken =
      await DestinationFromServiceRetriever.getProviderServiceToken(options);
  }

  const destinationSearchResult = await searchForAllDestinationSFromDestinationService(
    options,
    subscriberToken,
    providerToken
  );

  if (!destinationSearchResult) {
    return null;
  }

  return destinationSearchResult;
}

async function searchForAllDestinationSFromDestinationService(
  options: AllDestinationOptions,
  subscriberToken?: SubscriberToken,
  providerToken?: JwtPair
): Promise<DestinationWithoutToken[] | undefined> {
  let destinationSearchResult: Destination[] | undefined;

  const credentials = getDestinationServiceCredentialsList();
  if (!credentials || credentials.length === 0) {
    throw Error(
      'No binding to a destination service instance found. Please bind a destination service instance to your application.'
    );
  }
  if (credentials.length > 1) {
    logger.warn(
      'Found more than one destination service instance. Using the first one.'
    );
  }

  const destinationServiceUri = credentials[0].uri;

  if (isSubscriberNeeded(subscriberToken)) {
    logger.debug(
      'Retrieving all subscriber destinations from destination service.'
    );
    destinationSearchResult = await getInstanceAndSubaccountDestinations(
      destinationServiceUri,
      options,
      subscriberToken!.serviceJwt!.encoded
    );
  } else {
    logger.debug(
      'Retrieving all provider destinations from destination service.'
    );
    await getInstanceAndSubaccountDestinations(
      destinationServiceUri,
      options,
      providerToken!.encoded
    );
  }

  if (destinationSearchResult) {
    logger.debug(
      'Successfully retrieved all destinations from destination service.'
    );
  }
  if (!destinationSearchResult) {
    logger.debug('Could not retrieve destinations from destination service.');
  }

  return destinationSearchResult;
}

function isSubscriberNeeded(subscriberToken?: SubscriberToken): boolean {
  if (!subscriberToken) {
    return false;
  }

  if (this.subscriberToken.type === 'custom') {
    return false;
  }

  return true;
}

async function getInstanceAndSubaccountDestinations(
  destinationServiceUri: string,
  options: AllDestinationOptions,
  accessToken: string
): Promise<DestinationWithoutToken[]> {
  const [instance, subaccount] = await Promise.all([
    fetchInstanceDestinations(destinationServiceUri, accessToken, options),
    fetchSubaccountDestinations(destinationServiceUri, accessToken, options)
  ]);

  return instance.concat(subaccount);
}
