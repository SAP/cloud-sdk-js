/**
 * [[include:http-client/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/http-client
 */

export {
  buildHttpRequest,
  encodeAllParameters,
  executeHttpRequest,
  executeHttpRequestWithOrigin
} from './http-client';
export {
  HttpRequestOptions,
  HttpResponse,
  OriginOptions,
  HttpRequestConfigBase,
  DestinationHttpRequestConfig,
  OriginOptionsInternal
} from './http-client-types';
export type {
  HttpRequestConfig,
  HttpRequestConfigWithOrigin,
  Method,
  ParameterEncoder
} from './http-client-types';
export { mergeOptionsWithPriority } from './http-request-config';
