import { EdmTypeCommon, ExclusiveEdmTypeV4 } from '../odata-common';

/**
 * Allowed Edm types for OData v4.
 */
export type EdmType = EdmTypeCommon | ExclusiveEdmTypeV4;

export { EdmType as EdmTypeV4 };
