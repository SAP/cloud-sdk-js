import type { Xor } from '@sap-cloud-sdk/util';
import type { AuthenticationType } from './destination-service-types';

/**
 * The application resource for which the token is requested for App-to-App communication.
 * The token will only be usable to call the requested application.
 * Either provide the app name (common case) or the provider client ID
 * and tenant ID (optional).
 */
export type IasResource = Xor<
  {
    /**
     * The name of the application resource.
     */
    name: string;
  },
  {
    /**
     * The client ID of the application resource.
     */
    providerClientId: string;
    /**
     * The tenant ID of the application resource (Optional).
     */
    providerTenantId?: string;
  }
>;

/**
 * Base options shared by all IAS authentication modes.
 */
interface IasOptionsBase {
  /**
   * The target URL of the destination that the IAS token is requested for.
   * It is recommended to provide this for App-to-App communication (when resource parameter is used),
   * otherwise the destination will point to the identity service URL from the service binding.
   * @default The (identity service) URL from the service binding.
   */
  targetUrl?: string;
  /**
   * The application resource(s) for which the token is requested.
   * The token will only be usable to call the requested application(s).
   * Either provide the app name (common case) or the provider client ID
   * and tenant ID (optional).
   *
   * It is recommended to also provide the targetUrl parameter, otherwise
   * the destination will point to the identity service URL from the service binding,
   * instead of the actual target application.
   */
  resource?: IasResource;
  /**
   * The consumer (BTP) tenant ID of the application.
   * May be required for multi-tenant communication.
   */
  appTid?: string;
  /**
   * Additional parameters to be sent along with the token request.
   */
  extraParams?: Record<string, string>;
}

/**
 * IAS options for technical user authentication (client credentials).
 */
type IasOptionsTechnical = IasOptionsBase & {
  /**
   * Authentication type. Use 'OAuth2ClientCredentials' for technical user (default).
   */
  authenticationType?: Extract<AuthenticationType, 'OAuth2ClientCredentials'>;
  /**
   * Assertion not used for technical user authentication.
   */
  assertion?: never;
};

/**
 * IAS options for business user authentication (JWT bearer).
 */
type IasOptionsBusinessUser = IasOptionsBase & {
  /**
   * Authentication type. Use 'OAuth2JWTBearer' for business user authentication.
   */
  authenticationType: Extract<AuthenticationType, 'OAuth2JWTBearer'>;
  /**
   * The JWT assertion string to use for business user authentication (required).
   */
  assertion: string;
};

/**
 * Options for IAS token retrieval with type-safe authenticationType/assertion relationship.
 */
export type IasOptions = IasOptionsTechnical | IasOptionsBusinessUser;
