import { readJsonSync } from 'fs-extra';
import { last } from '@sap-cloud-sdk/util';
import {
  OpenApiOperation,
  OpenApiPath,
  OpenApiServiceMetadata,
  SupportedOperation
} from './open-api-types';

export function toOpenApiModel(
  pathToAdjustedOpenApiDefFile: string,
  serviceName: string,
  serviceDir: string
): OpenApiServiceMetadata {
  const openApiJson = readJsonSync(pathToAdjustedOpenApiDefFile);
  const paths = openApiJson.paths;
  const openApiPath = Object.keys(paths).map(k => parsePath(k, paths[k]));
  return {
    apiName: serviceName,
    serviceDir,
    paths: openApiPath
  };
}

function parsePath(pathName: string, pathValue): OpenApiPath {
  const pathParameters = toPathParameters(pathName);
  const operations: OpenApiOperation[] = [];
  Object.keys(SupportedOperation).forEach(supportOperation => {
    const operation = toOpenApiOperation(pathValue, supportOperation);
    if (operation) {
      operations.push(operation);
    }
  });
  return { name: pathName, pathParameters, operations };
}

function toPathParameters(path: string): string[] {
  const matches = Array.from(path.matchAll(/{(.*?)}/g));
  return matches.map(m => m[1]);
}

function toOpenApiOperation(obj, method: string): OpenApiOperation | undefined {
  if (obj[method]) {
    const operation = obj[method];
    const requestBodySchemaRefName = toRequestBodySchemaRefName(operation);
    return {
      method: SupportedOperation[method],
      operationName: operation.operationId,
      requestBodySchemaRefName
    };
  }
}

function toRequestBodySchemaRefName(operation): string | undefined {
  const content = operation.requestBody?.content;
  if (content) {
    const contentAppJson = content['application/json'];
    const ref = contentAppJson?.schema['$ref'];
    return ref && getRefName(ref);
  }
}

function getRefName(ref: string) {
  return last(ref.split('/'));
}
