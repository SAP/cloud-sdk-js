/* eslint-disable tsdoc/syntax */
/**
 * [[include:core/README.md]]
 * @packageDocumentation
 * @module @sap-cloud-sdk/core
 */

export * from './header-util';
export * from './odata-common';
export * from './odata-v2';
// The explicit exports are needed to guarantee backwards compatibility, they override the named exports of the other odata modules.
export { entityDeserializer, filterFunction } from './odata-common';
export {
  CreateRequestBuilder,
  CustomField,
  DeleteRequestBuilder,
  deserializeEntity,
  deserializeComplexType,
  Entity,
  edmToTs,
  EdmType,
  EdmToPrimitive,
  entitySerializer,
  extractODataEtag,
  filterFunctions,
  FunctionImportRequestBuilder,
  GetAllRequestBuilder,
  GetByKeyRequestBuilder,
  getExpand,
  getSelect,
  ODataBatchChangeSet,
  ODataBatchRequestBuilder,
  ODataFunctionImportRequestConfig,
  oDataUri,
  serializeComplexType,
  serializeEntity,
  serializeEntityNonCustomFields,
  toBatchChangeSet,
  toBatchRetrieveBody,
  transformReturnValueForEntity,
  transformReturnValueForEdmType,
  transformReturnValueForComplexType,
  transformReturnValueForComplexTypeList,
  transformReturnValueForEdmTypeList,
  transformReturnValueForEntityList,
  transformReturnValueForUndefined,
  tsToEdm,
  UpdateRequestBuilder,
  uriConverter,
  uriConverters
} from './odata-v2';
export * from './odata-v4';
export * from './openapi';
