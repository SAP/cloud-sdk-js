/**
 * Fallback for undefined API names.
 */
export const defaultApiName = 'default';
/**
 * Key for the API name extension.
 */
export const apiNameExtension = 'x-sap-cloud-sdk-api-name';
/**
 * Key for the operation name extension.
 */
export const operationNameExtension = 'x-sap-cloud-sdk-operation-name';

/**
 * Type of objects, that can have an API name extension.
 */
export interface ApiNameExtended {
  [apiNameExtension]?: string;
}

/**
 * Type of objects, that can have an operation name extension.
 */
export interface OperationNameExtended {
  [operationNameExtension]?: string;
}
