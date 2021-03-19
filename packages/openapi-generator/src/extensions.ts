export const defaultApiName = 'default';
export const apiNameExtension = 'x-sap-cloud-sdk-api-name';
export const operationNameExtension = 'x-sap-cloud-sdk-operation-name';

export interface ApiNameExtended {
  [apiNameExtension]?: string;
}

export interface OperationNameExtended {
  [operationNameExtension]?: string;
}
