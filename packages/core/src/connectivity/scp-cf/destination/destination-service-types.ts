import { CachingOptions, IsolationStrategy } from '../cache';
import { ProxyConfiguration } from '../connectivity-service-types';
import { ResilienceOptions } from '../resilience-options';

/**
 * A resolved destination containing information needed to execute requests, such as the system URL.
 *
 * You can create a destination as a local object when supplying all necessary information, or it could be retrieved from the destination service on SAP Cloud Platform (via [[DestinationNameAndJwt]]).
 * When creating a local object representing a destination, you need to supply at least the [[url]] and, if required by the target system, valid credentials with [[username]] and [[password]].
 */
export interface Destination {
  /**
   * Name of the destination retrieved from SAP Cloud Platform.
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
   * Defaults to `NoAuthentication`, unless [[username]] and [[password]] are provided, in which case the default is `BasicAuthentication`.
   */
  authentication?: AuthenticationType;

  /**
   * Proxy type to specify whether the target resides on-premise (not used).
   */
  proxyType?: DestinationProxyType;

  /**
   * @deprecated Since v1.0.1.
   *
   * Origin of the destination in a multi-tenant setup on SAP Cloud Platform (either from provider or subscriber account), optional.
   */
  origin?: DestinationOrigin;

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
   * Authentication tokens returned from destination service on SAP Cloud Platform.
   */
  authTokens?: DestinationAuthToken[] | null;

  /**
   * Flag indicating whether all certificates should be accepted when communicating with the destination. Should not be "true" in production.
   */
  isTrustingAllCertificates?: boolean;

  /**
   * ProxyConfiguration for on-premise connectivity and http(s) web proxies. Is present if proxyType of the destination equals "OnPremise" or environment variables [http_proxy] or [https_proxy] are set See [[ProxyConfiguration]].
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
   * The type of the destination, defaults to 'HTTP'. The SAP Cloud SDK only understands destinations of type 'HTTP'.
   */
  type?: 'HTTP' | 'LDAP' | 'MAIL' | 'RFC';

  /**
   * Further properties of the destination as defined in destination service on SAP Cloud Platform, possibly empty.
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
}

/**
 * Represents authentication token returned from destination service.
 */
export interface DestinationAuthToken {
  type: string;
  value: string;
  expiresIn: string;
  error: string | null;
  http_header: {
    key: string;
    value: string;
  };
}

export type DestinationProxyType = 'OnPremise' | 'Internet' | null;

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
 * @deprecated Since v1.0.1.
 *
 * Represents the origin of a destination in a multi-tenant setup on SAP Cloud Platform.
 *
 * In a multi-tenant application on SAP Cloud Platform, destinations can be defined both on provider account level ("PaaS tenant") as well as on the level of each subscriber account ("SaaS tenant").
 */
export enum DestinationOrigin {
  Subscriber = 'subscriber',
  Provider = 'provider'
}

/**
 * Declaration of a destination to be retrieved from an environment variable or from the destination service on SAP Cloud Platform.
 *
 * Use an object of this interface to specify which destination shall be used when executing a request.
 * The destination will be retrieved via its [[DestinationNameAndJwt.destinationName]] according to the following algorithm:
 * 1. If a destination of this [[DestinationNameAndJwt.destinationName]] is defined in the environment variable `destinations` (if available), it will be converted into a [[Destination]] and used for the request.
 * 2. Otherwise, the destination service on SAP Cloud Platform is queried for a destination with the given [[DestinationNameAndJwt.destinationName]], using the access token provided as value of property [[jwt]].
 */
export interface DestinationNameAndJwt {
  /**
   * Name of the destination to retrieve, mandatory.
   */
  destinationName: string;

  /**
   * An access token for the XSUAA service on SAP Cloud Platform, provided as a JSON Web Token, only mandatory when destination shall be retrieved from destination service on SAP Cloud Platform.
   */
  jwt?: string;
}

/**
 * @deprecated Since version 1.16.0. Use [[CachingOptions]] instead.
 */
export interface DestinationCachingOptions {
  /**
   * A boolean value that indicates whether to read destinations from cache.
   */
  useCache?: boolean;

  /**
   * The isolation strategy used for caching destinations. For the available options, see [[IsolationStrategy]].
   * By default, IsolationStrategy.Tenant is set.
   */
  isolationStrategy?: IsolationStrategy;
}

/**
 * Options to use while fetching destinations. Encompasses both [[DestinationCachingOptions]] and [[ResilienceOptions]] interfaces.
 */
export type DestinationRetrievalOptions = (
  | DestinationCachingOptions
  | CachingOptions
) &
  ResilienceOptions;

export function isDestinationNameAndJwt(
  destination: any
): destination is DestinationNameAndJwt {
  return destination.destinationName !== undefined;
}

export function isDestination(destination: any): destination is Destination {
  return destination.url !== undefined;
}

export type AuthenticationType =
  | 'PrincipalPropagation'
  | 'NoAuthentication'
  | 'BasicAuthentication'
  | 'OAuth2SAMLBearerAssertion'
  | 'OAuth2ClientCredentials'
  | 'OAuth2UserTokenExchange'
  | 'ClientCertificateAuthentication'
  | 'OAuth2JWTBearer';

/**
 * The destinations endpoint distinguished between destinations maintained on service level (instance) and account level (subaccount).
 * This enum is used as a switch in the [[fetchInstanceDestinations]], [[fetchSubaccountDestinations]]  and [[destinationServiceCache]]
 */
export enum DestinationType {
  Instance = 'instance',
  Subaccount = 'subaccount'
}
