import {
  EdmTypeCommon,
  ExclusiveEdmTypeV2
  // eslint-disable-next-line import/no-internal-modules
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * Allowed Edm types for OData v2.
 * @internal
 */
export type EdmType = EdmTypeCommon | ExclusiveEdmTypeV2;
