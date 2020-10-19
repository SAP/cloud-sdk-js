export interface OpenApiServiceMetadata{
  apiName: string;
  serviceDir: string;
  paths: OpenApiPath[];
}

export interface OpenApiPath{
  name: string;
  pathParameters: string[];
  operations: OpenApiOperation[];
}

export interface OpenApiOperation{
  method: SupportedOperation
  operationName: string
  requestBodySchemaRefName?: string
}

export enum SupportedOperation{get = 'get', put = 'put', post = 'post', patch = 'patch', delete = 'delete'}
