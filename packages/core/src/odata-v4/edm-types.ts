import { EdmTypeCommon, ExclusiveEdmType } from '../odata-common';

/**
 * Allowed Edm types for OData v4.
 */
export type EdmType = EdmTypeCommon | ExclusiveEdmType;

export { EdmType as EdmTypeV4 };
