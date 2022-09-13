import { VerifyJwtOptions } from '../jwt';
import type {
  Destination,
  DestinationRetrievalOptions
} from './destination-service-types';
import type { DestinationSelectionStrategy } from './destination-selection-strategies';

/**
 * Collection of all destinations from the provider and subscriber account.
 * The used {@link DestinationSelectionStrategy} will decide which destination is selected in the end.
 */
export interface AllDestinations {
  /**
   * Collection of all destinations from the subscriber account.
   */
  subscriber: DestinationsByType;
  /**
   * Collection of all destinations from the provider account.
   */
  provider: DestinationsByType;
}

/**
 * Collection of all destinations from an account.
 * For a given account a destination can originate from the destination service instance or subaccount.
 */
export interface DestinationsByType {
  /**
   * Collection of destinations from the destination service instance.
   */
  instance: Destination[];
  /**
   * Collection of destinations from the subaccount.
   */
  subaccount: Destination[];
}

/**
 * Options to configure the behavior of the destination accessor.
 * @see {@link DestinationFetchOptions}
 */
export interface DestinationAccessorOptions {
  /**
   * Method that implements the selection strategy of the retrieved destination. Uses {@link subscriberFirst} per default. Use the selector helper {@link DestinationSelectionStrategies} to select the appropriate selection strategy.
   */
  selectionStrategy?: DestinationSelectionStrategy;

  /**
   * The user token of the current request.
   */
  jwt?: string;

  /**
   * Option to enable/disable the IAS token to XSUAA token exchange.
   */
  iasToXsuaaTokenExchange?: boolean;

  /**
   * This property is only considered in case no userJwt is provided.
   * It is meant for situations where you do not have a token e.g. background processes.
   * The value for iss is the issuer field of a JWT e.g. https://<your-subdomain>.localhost:8080/uaa/oauth/token'.
   *
   * ATTENTION: If this property is used, no validation of the provided subdomain value is done. This is differs from how the `userJwt` is handled.
   * So be careful that the used value is not manipulated and breaks the tenant isolation of your application.
   */
  iss?: string;
}

/**
 * Options used when fetching destinations. Encompasses {@link DestinationAccessorOptions}, {@link DestinationRetrievalOptions} and {@link VerifyJwtOptions}.
 */
export type DestinationOptions = DestinationAccessorOptions &
  DestinationRetrievalOptions &
  VerifyJwtOptions;

/**
 * Declaration of a destination to be retrieved from an environment variable or from the destination service on SAP Business Technology Platform, including all DestinationOptions.
 *
 * Use an object of this interface to specify which destination shall be used when executing a request.
 * The destination will be retrieved via its {@link DestinationFetchOptions.destinationName} according to the following algorithm:
 * 1. If a destination of this {@link DestinationFetchOptions.destinationName} is defined in the environment variable `destinations` (if available), it will be converted into a {@link Destination} and used for the request.
 * 2. Otherwise, the destination service on SAP Business Technology Platform is queried for a destination with the given {@link DestinationFetchOptions.destinationName}, using the access token provided as value of property {@link jwt}.
 * Additionally, you can set {@link DestinationOptions} for objects of this interface.
 * For more information check out our documentation: https://sap.github.io/cloud-sdk/docs/js/features/connectivity/destination.
 */
export interface DestinationFetchOptions extends DestinationOptions {
  /**
   * Name of the destination to retrieve, mandatory.
   */
  destinationName: string;
}

/**
 * Typeguard to find if object is DestinationFetchOptions.
 * @param destination - Destination to be checked
 * @returns boolean
 * @internal
 */
export function isDestinationFetchOptions(
  destination: any
): destination is DestinationFetchOptions {
  return destination.destinationName !== undefined;
}

/**
 * A {@link Destination} which does not contain {@link Destination.authTokens || authTokens}.
 */
export type DestinationWithoutToken = Omit<Destination, 'authTokens'>;

/**
 * Options used to fetch all destinations.
 */
export type AllDestinationOptions = Omit<
  DestinationOptions,
  'selectionStrategy' | 'isolationStrategy'
>;
