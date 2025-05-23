/**
 * [[include:odata-v4/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/odata-v4
 */

export { filterFunction } from './filter-function';

export {
  filterFunctions,
  now,
  hasSubset,
  hasSubsequence,
  fractionalSeconds,
  totalOffsetMinutes,
  maxDateTime,
  minDateTime,
  matchesPattern,
  contains
} from './filter-functions';

export type { FilterFunctionTypes } from './filter-functions';

export {
  transformReturnValueForComplexType,
  transformReturnValueForComplexTypeList,
  transformReturnValueForEdmType,
  transformReturnValueForEdmTypeList,
  transformReturnValueForEntity,
  transformReturnValueForEntityList,
  transformReturnValueForUndefined,
  CountRequestBuilder,
  CreateRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  UpdateRequestBuilder,
  BoundOperationRequestBuilder,
  OperationRequestBuilder
} from './request-builder';

export { ODataBatchRequestBuilder } from './request-builder';

export {
  ODataActionRequestConfig,
  ODataFunctionRequestConfig
} from './request';

export { Entity } from './entity';
export { CustomField } from './selectable';
export { all, any, DateFilterFunction } from './filter';

export {
  defaultDeSerializers,
  edmToTs,
  entityDeserializer,
  mergeDefaultDeSerializersWith
} from './de-serializers';
export type { DeSerializers } from './de-serializers';

export type {
  CustomDeSerializers,
  DefaultDeSerializers,
  CustomOrDefaultType
} from './de-serializers';

export type { BatchResponse } from './batch-response';

export type {
  ODataBoundActionRequestConfig,
  ODataBoundFunctionRequestConfig
} from './request';

export * from './common';
