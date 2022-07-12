/**
 * [[include:connectivity/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/connectivity
 */

export {
  parseDestination,
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
  DestinationFetchOptions,
  DestinationAccessorOptions,
  DestinationSelectionStrategies,
  JwtPayload,
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
  addResilience
} from './scp-cf';

export type {
  DestinationRetrievalOptions,
  DestinationSelectionStrategy,
  DestinationOrFetchOptions,
  DestinationOptions,
  ServiceCredentials,
  DestinationProxyType,
  AuthenticationType,
  ClientCredentialsResponse,
  ResilienceOptions
} from './scp-cf';

export {
  getAgentConfig,
  HttpAgentConfig,
  HttpsAgentConfig
} from './http-agent';
