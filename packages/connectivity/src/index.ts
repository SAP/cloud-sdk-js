/**
 * [[include:connectivity/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/connectivity
 */
export {
  toDestinationNameUrl,
  sanitizeDestination,
  getDestination,
  useOrFetchDestination,
  getDestinationFromDestinationService,
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst,
  parseProxyEnv,
  decodeJwt,
  retrieveJwt,
  jwtBearerToken,
  serviceToken,
  isHttpDestination,
  assertHttpDestination,
  DestinationSelectionStrategies,
  buildHeadersForDestination,
  getClientCredentialsToken,
  getUserToken,
  registerDestination,
  setDestinationCache,
  getServiceBinding,
  getDestinationFromServiceBinding,
  transformServiceBindingToDestination,
  getAllDestinationsFromDestinationService,
  getTenantId,
  transformServiceBindingToClientCredentialsDestination
} from './scp-cf';
export type {
  DestinationCacheInterface,
  CacheEntry,
  CachingOptions,
  Protocol,
  IsolationStrategy,
  Destination,
  HttpDestination,
  HttpDestinationOrFetchOptions,
  DestinationFetchOptions,
  ServiceBindingTransformFunction,
  DestinationAccessorOptions,
  JwtPayload,
  BasicProxyConfiguration,
  ProxyConfiguration,
  ProxyConfigurationHeaders,
  Service,
  VerifyJwtOptions,
  DestinationAuthToken,
  DestinationCertificate,
  ClientCredentialsResponse,
  AllDestinations,
  DestinationConfiguration,
  DestinationJson,
  DestinationsByType,
  DestinationFromServiceBindingOptions,
  ServiceBindingTransformOptions,
  ActAs,
  IasOptions
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

export { getAgentConfig } from './http-agent';
export type { HttpAgentConfig, HttpsAgentConfig } from './http-agent';
