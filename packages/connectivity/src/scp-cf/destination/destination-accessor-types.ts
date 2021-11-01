import { Destination } from './destination-service-types';
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
