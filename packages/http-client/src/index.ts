/* eslint-disable tsdoc/syntax */
/**
 * [[include:http-client/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/http-client
 */

export { buildHttpRequest, executeHttpRequest } from './http-client';
export {
  HttpRequestOptions,
  HttpResponse,
  Method,
  OriginOptions
} from './http-client-types';
export type {
  HttpRequestConfig,
  HttpRequestConfigWithOrigin
} from './http-client-types';
export { mergeOptionsWithPriority } from './http-request-config';
