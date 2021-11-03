import { VerifyJwtOptions } from '../jwt';
import {
  Destination,
  DestinationRetrievalOptions
} from './destination-service-types';
import { DestinationSelectionStrategy } from './destination-selection-strategies';

/**
 * @internal
 */
export interface AllDestinations {
  subscriber: DestinationsByType;
  provider: DestinationsByType;
}

/**
 * @internal
 */
export interface DestinationsByType {
  instance: Destination[];
  subaccount: Destination[];
}

/**
 * @internal
 */
export interface DestinationAccessorOptions {
  /**
   * Method that implements the selection strategy of the retrieved destination. Uses [[subscriberFirst]] per default. Use the selector helper [[DestinationSelectionStrategies]] to select the appropriate selection strategy.
   */
  selectionStrategy?: DestinationSelectionStrategy;

  /**
   * The user token of the current request.
   */
  userJwt?: string;

  /**
   * Option to enable/disable the IAS token to XSUAA token exchange.
   */
  iasToXsuaaTokenExchange?: boolean;

  /**
   * This property is only considered in case no userJwt is provided.
   * It is meant for situations where you do not have a token e.g. background processes.
   * The value for iss is the issuer field of a JWT e.g. https://<your-subdomain>.localhost:8080/uaa/oauth/token'
   *
   * ATTENTION: If this property is used, no validation of the provided subdomain value is done. This is differs from how the `userJwt` is handled.
   * So be careful that the used value is not manipulated and breaks the tenant isolation of your application.
   */
  iss?: string;
}

export type DestinationOptions = DestinationAccessorOptions &
  DestinationRetrievalOptions &
  VerifyJwtOptions;

/**
 * Declaration of a destination to be retrieved from an environment variable or from the destination service on SAP Business Technology Platform, including all DestinationOptions.
 *
 * Use an object of this interface to specify which destination shall be used when executing a request.
 * The destination will be retrieved via its [[DestinationFetchOptions.destinationName]] according to the following algorithm:
 * 1. If a destination of this [[DestinationFetchOptions.destinationName]] is defined in the environment variable `destinations` (if available), it will be converted into a [[Destination]] and used for the request.
 * 2. Otherwise, the destination service on SAP Business Technology Platform is queried for a destination with the given [[DestinationFetchOptions.destinationName]], using the access token provided as value of property [[jwt]].
 * Additionally, you can set [[DestinationOptions]] for objects of this interface.
 */
export interface DestinationFetchOptions extends DestinationOptions {
  /**
   * Name of the destination to retrieve, mandatory.
   */
  destinationName: string;

  /**
   * An access token for the XSUAA service on SAP Business Technology Platform, provided as a JSON Web Token, only mandatory when destination shall be retrieved from destination service on SAP Business Technology Platform.
   */
  jwt?: string;
}

/**
 * Typeguard to find if object is DestinationNameAndJwt.
 * @param destination - Destination to be checked
 * @returns boolean
 * @internal
 */
 export function isDestinationFetchOptions(
  destination: any
): destination is DestinationFetchOptions {
  return destination.destinationName !== undefined;
}
