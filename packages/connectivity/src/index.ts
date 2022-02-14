/* eslint-disable tsdoc/syntax */
/**
 * [[include:connectivity/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/connectivity
 */

export {
  parseDestination,
  noDestinationErrorMessage,
  toDestinationNameUrl,
  sanitizeDestination,
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
  ResilienceOptions,
  Service,
  VerifyJwtOptions,
  buildHeadersForDestination,
  getClientCredentialsToken,
  getUserToken,
  registerDestination
} from './scp-cf';

export type {
  DestinationRetrievalOptions,
  DestinationSelectionStrategy,
  DestinationOrFetchOptions,
  DestinationOptions,
  ServiceCredentials
} from './scp-cf';

export { getAgentConfig } from './http-agent';
