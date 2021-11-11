/**
 * Fallback for undefined API names.
 * @internal
 */
export const defaultApiName = 'default';
/**
 * Key for the API name extension.
 * @internal
 */
export const apiNameExtension = 'x-sap-cloud-sdk-api-name';
/**
 * Key for the operation name extension.
 * @internal
 */
export const operationNameExtension = 'x-sap-cloud-sdk-operation-name';

/**
 * Type of objects, that can have an API name extension.
 * @internal
 */
export interface ApiNameExtended {
  [apiNameExtension]?: string;
}

/**
 * Type of objects, that can have an operation name extension.
 * @internal
 */
export interface OperationNameExtended {
  [operationNameExtension]?: string;
}
