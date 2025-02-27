/**
 * [[include:connectivity/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/connectivity
 */

export {
  toDestinationNameUrl,
  sanitizeDestination,
  DestinationCacheInterface,
  CacheEntry,
  CachingOptions,
  getDestination,
  useOrFetchDestination,
  getDestinationFromDestinationService,
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst,
  parseProxyEnv,
  Protocol,
  IsolationStrategy,
  decodeJwt,
  retrieveJwt,
  jwtBearerToken,
  serviceToken,
  Destination,
  HttpDestination,
  isHttpDestination,
  HttpDestinationOrFetchOptions,
  assertHttpDestination,
  DestinationFetchOptions,
  ServiceBindingTransformFunction,
  DestinationAccessorOptions,
  DestinationSelectionStrategies,
  JwtPayload,
  BasicProxyConfiguration,
  ProxyConfiguration,
  ProxyConfigurationHeaders,
  Service,
  VerifyJwtOptions,
  buildHeadersForDestination,
  getClientCredentialsToken,
  getUserToken,
  registerDestination,
  setDestinationCache,
  DestinationAuthToken,
  DestinationCertificate,
  ClientCredentialsResponse,
  AllDestinations,
  DestinationConfiguration,
  DestinationJson,
  DestinationsByType,
  DestinationFromServiceBindingOptions,
  getServiceBinding,
  getDestinationFromServiceBinding,
  ServiceBindingTransformOptions,
  transformServiceBindingToDestination,
  getAllDestinationsFromDestinationService,
  getTenantId,
  transformServiceBindingToClientCredentialsDestination
} from './scp-cf';

export type {
  DestinationRetrievalOptions,
  DestinationSelectionStrategy,
  DestinationOrFetchOptions,
  DestinationOptions,
  ServiceCredentials,
  XsuaaServiceCredentials,
  DestinationProxyType,
  AuthenticationType,
  DestinationWithName,
  RegisterDestinationOptions,
  DestinationWithoutToken,
  AllDestinationOptions
} from './scp-cf';

export {
  getAgentConfig,
  HttpAgentConfig,
  HttpsAgentConfig
} from './http-agent';
