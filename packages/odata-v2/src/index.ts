/**
 * [[include:odata-v2/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/odata-v2
 */

export {
  filterFunctions,
  replace,
  substring,
  substringOf,
  length
} from './filter-functions';

export type { FilterFunctionsType } from './filter-functions';

export {
  transformReturnValueForComplexType,
  transformReturnValueForComplexTypeList,
  transformReturnValueForEdmType,
  transformReturnValueForEdmTypeList,
  transformReturnValueForEntity,
  transformReturnValueForEntityList,
  transformReturnValueForUndefined
} from './request-builder';

export {
  CreateRequestBuilder,
  CountRequestBuilder,
  DeleteRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  ODataBatchRequestBuilder,
  UpdateRequestBuilder,
  OperationRequestBuilder
} from './request-builder';
export { Entity } from './entity';
export { CustomField } from './selectable';

export {
  defaultDeSerializers,
  edmToTs,
  entityDeserializer,
  mergeDefaultDeSerializersWith
} from './de-serializers';

export type {
  CustomDeSerializers,
  DefaultDeSerializers,
  CustomOrDefaultType,
  DeSerializers
} from './de-serializers';

export { ODataFunctionRequestConfig } from './request';
export type { BatchResponse } from './batch-response';

export * from './common';
