import {
  EdmTypeCommon,
  ExclusiveEdmTypeV4
  // eslint-disable-next-line import/no-internal-modules
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * Allowed Edm types for OData v4.
 *  @internal
 */
export type EdmType = EdmTypeCommon | ExclusiveEdmTypeV4;
