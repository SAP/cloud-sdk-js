import { EdmTypeCommon, ExclusiveEdmTypeV2 } from '../odata-common';

/**
 * Allowed Edm types for OData v2.
 */
export type EdmType = EdmTypeCommon | ExclusiveEdmTypeV2;

export { EdmType as EdmTypeV2 };
