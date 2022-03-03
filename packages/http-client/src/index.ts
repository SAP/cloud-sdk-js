/* eslint-disable tsdoc/syntax */
/**
 * [[include:http-client/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/http-client
 */

export {
  buildHttpRequest,
  encodeAllParameters,
  executeHttpRequest
} from './http-client';
export {
  HttpRequestOptions,
  HttpResponse,
  Method,
  OriginOptions,
  ParameterEncoder
} from './http-client-types';
export type {
  HttpRequestConfig,
  HttpRequestConfigWithOrigin
} from './http-client-types';
export { mergeOptionsWithPriority } from './http-request-config';
