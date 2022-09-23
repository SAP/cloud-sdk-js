import type { CachingOptions } from '../cache';
import type { ProxyConfiguration } from '../connectivity-service-types';
import type { ResilienceOptions } from '../resilience-options';
import type { IsolationStrategy } from './destination-cache';

/**
 * A resolved destination containing information needed to execute requests, such as the system URL.
 *
 * You can create a destination as a local object when supplying all necessary information, or it could be retrieved from the destination service on SAP Business Technology Platform (via {@link DestinationFetchOptions}).
 * When creating a local object representing a destination, you need to supply at least the {@link url} and, if required by the target system, valid credentials with {@link username} and {@link password}.
 */
export interface Destination {
  /**
   * Name of the destination retrieved from SAP Business Technology Platform.
   */
  name?: string | null;

  /**
   * Base URL for calls to this destination.
   * The URL has to define the protocol, like `http://` or `https://`, and a host.
   * The path for requests against this destination will be appended to the path defined in the URL as a new path segment.
   */
  url: string;

  /**
   * Type of authentication to use.
   *
   * Defaults to `NoAuthentication`, unless {@link username} and {@link password} are provided, in which case the default is `BasicAuthentication`.
   */
  authentication?: AuthenticationType;

  /**
   * Proxy type to specify whether the target resides on-premise (not used).
   */
  proxyType?: DestinationProxyType;

  /**
   * Client to target in an SAP system, will be added as HTTP header `sap-client` if set.
   */
  sapClient?: string | undefined | null;

  /**
   * Username to use for basic authentication, optional if other means of authentication shall be used.
   */
  username?: string | null;

  /**
   * Password to use for basic authentication, optional if other means of authentication shall be used.
   */
  password?: string | null;

  /**
   * Authentication tokens returned from destination service on SAP Business Technology Platform.
   */
  authTokens?: DestinationAuthToken[] | null;

  /**
   * Flag indicating whether all certificates should be accepted when communicating with the destination. Should not be "true" in production.
   */
  isTrustingAllCertificates?: boolean;

  /**
   * ProxyConfiguration for on-premise connectivity and http(s) web proxies. Is present if proxyType of the destination equals "OnPremise" or environment variables [http_proxy] or [https_proxy] are set See {@link ProxyConfiguration}.
   */
  proxyConfiguration?: ProxyConfiguration;

  /**
   * Client Id used to retrieve access token for "OAuth2ClientCredentials", "OAuth2UserTokenExchange" and "OAuth2JWTBearer" authentication.
   */
  clientId?: string;

  /**
   * Client Secret used to retrieve access token for "OAuth2ClientCredentials", "OAuth2UserTokenExchange" and "OAuth2JWTBearer" authentication.
   */
  clientSecret?: string;

  /**
   * URL to retrieve access token for "OAuth2ClientCredentials", "OAuth2UserTokenExchange" and "OAuth2JWTBearer" authentication.
   */
  tokenServiceUrl?: string;

  /**
   * User for basic authentication to OAuth server (if required).
   */
  tokenServiceUser?: string;

  /**
   * Password for tokenServiceUser (if required).
   */
  tokenServicePassword?: string;

  /**
   * The type of the destination, defaults to 'HTTP'. The SAP Cloud SDK only understands destinations of type 'HTTP' and 'MAIL'.
   */
  type?: 'HTTP' | 'LDAP' | 'MAIL' | 'RFC';

  /**
   * Further properties of the destination as defined in destination service on SAP Business Technology Platform, possibly empty.
   */
  originalProperties?: { [key: string]: any };

  /**
   * Flag indicating whether the destination is for test purpose. Should be "undefined" or "false" for non-mocked destinations.
   */
  isTestDestination?: boolean;

  /**
   * Location ID of the Cloud Connector to be used for connection to an On-Premise system. Optional. Corresponds to property "CloudConnectorLocationId" in the additional properties of a destination.
   */
  cloudConnectorLocationId?: string;

  /**
   * Array of certificates used for authentication type ClientCertificateAuthentication.
   */
  certificates?: DestinationCertificate[];

  /**
   * Trusted certificate for https requests used by the destination. Only relevant for self-signed certificates where trust needs to be enabled in the client.
   */
  trustStoreCertificate?: DestinationCertificate;

  /**
   * Name of the key store/certificate to be used for ClientCertificateAuthentication.
   */
  keyStoreName?: string;

  /**
   * Password of the key store/certificate to be used for ClientCertificateAuthentication.
   */
  keyStorePassword?: string;

  /**
   * System user to be used for OAuth2SAMLBearerAssertion authentication type.
   */
  systemUser?: string;

  /**
   * Additional headers to be used for calls against the destination, originally defined by `URL.headers.<header-name>`.
   * The keys of this object denote the names of the headers and the values their values.
   */
  headers?: Record<string, any>;

  /**
   * Additional query parameters to be used for calls against the destination, originally defined by `URL.queries.<query-parameter-name>`.
   * The keys of this object denote the names of the query parameters and the values their values.
   */
  queryParameters?: Record<string, any>;

  /**
   * If set to true the auth token provided to the request execution is forwarded to the destination target.
   */
  forwardAuthToken?: boolean;

  /**
   * Base64-encoded JSON web key set, containing the signing keys which are used to validate the JWT provided in the X-User-Token header.
   * This field is used to authenticate the destination using a JWT without JKU.
   */
  jwks?: string;

  /**
   * URI of the JSON web key set, containing the signing keys which are used to validate the JWT provided in the X-User-Token header.
   * This field is used to authenticate the destination using a JWT without JKU.
   */
  jwksUri?: string;
}

/**
 * Represents authentication token returned from destination service.
 */
export interface DestinationAuthToken {
  /**
   * Type of the token, e.g., Bearer.
   */
  type: string;
  /**
   * Value of the token.
   */
  value: string;
  /**
   * The number of seconds until the access token expires.
   */
  expiresIn: string;
  /**
   * Potential error of token retrieval in the destination service.
   */
  error: string | null;
  /**
   * An object containing ready-to-use key-value pairs like `Authorization` : `Bearer U29tZVRva2VuVmFsdWU=`.
   */
  http_header: {
    key: string;
    value: string;
  };
}

/**
 * Represents the proxy type on a destination.
 */
export type DestinationProxyType =
  | 'OnPremise'
  | 'Internet'
  | 'PrivateLink'
  | null;

/**
 * Represents a certificate attached to a destination.
 */
export interface DestinationCertificate {
  /**
   * Name of the certificate file.
   */
  name: string;

  /**
   * Content of the certificate as base64 encoded binary.
   */
  content: string;

  /**
   * Type of the certificate.
   */
  type: string;
}

/**
 * Options to use while fetching destinations. Encompasses both {@link CachingOptions} and {@link ResilienceOptions} interfaces.
 */
export type DestinationRetrievalOptions = CachingOptions &
  ResilienceOptions & {
    /**
     * The isolation strategy used for caching destinations. For the available options, see {@link IsolationStrategy}.
     * By default, IsolationStrategy.Tenant_User is set.
     */
    isolationStrategy?: IsolationStrategy;
  };

/**
 * Typeguard to find if object is a Destination.
 * @param destination - Destination to be checked
 * @returns boolean
 * @internal
 */
export function isDestination(destination: any): destination is Destination {
  return destination.url !== undefined;
}

/**
 * Represents the authentication type of a destination.
 */
export type AuthenticationType =
  | 'PrincipalPropagation'
  | 'NoAuthentication'
  | 'BasicAuthentication'
  | 'SAMLAssertion'
  | 'OAuth2SAMLBearerAssertion'
  | 'OAuth2ClientCredentials'
  | 'OAuth2UserTokenExchange'
  | 'ClientCertificateAuthentication'
  | 'OAuth2JWTBearer'
  | 'OAuth2Password';

/**
 * The destinations endpoint distinguished between destinations maintained on service level (instance) and account level (subaccount).
 * This enum is used as a switch in the {@link fetchInstanceDestinations}, {@link fetchSubaccountDestinations}  and {@link destinationServiceCache}
 * @internal
 */
export enum DestinationType {
  Instance = 'instance',
  Subaccount = 'subaccount'
}
