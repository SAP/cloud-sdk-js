import { readJsonSync } from 'fs-extra';
import { last } from '@sap-cloud-sdk/util';
import {
  OpenApiOperation,
  OpenApiPath,
  OpenApiServiceMetadata,
  SupportedOperation
} from './open-api-types';

/**
 * Builds an [[OpenApiServiceMetadata]] from the given open api definition file.
 * @param pathToAdjustedOpenApiDefFile the path to the open api definition file
 * @param serviceName the service name
 * @param serviceDir the directory name to store generated files for the service
 * @returns A [[OpenApiServiceMetadata]]
 */
export function toOpenApiServiceMetaData(
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

export function toPathParameters(path: string): string[] {
  const matches = path.match(/{.*?}/g);
  return matches ? Array.from(matches!).map(m => m.slice(1, m.length - 1)) : [];
}

function toOpenApiOperation(obj, method: string): OpenApiOperation | undefined {
  if (obj[method]) {
    const operation = obj[method];
    const requestBodySchemaRefName = toRequestBodySchemaRefName(operation);
    const responseSchemaRefName = toResponseSchemaRefName(operation);
    return {
      method: SupportedOperation[method],
      operationName: operation.operationId,
      requestBodySchemaRefName,
      responseSchemaRefName
    };
  }
}

function toRequestBodySchemaRefName(operation): string | undefined {
  const content = operation.requestBody?.content;
  return getRefNameFromContent(content);
}

function getRefNameFromContent(content): string | undefined {
  if (content) {
    const contentAppJson = content['application/json'];
    const ref = contentAppJson?.schema['$ref'];
    return ref && getRefName(ref);
  }
}

function toResponseSchemaRefName(operation): string | undefined {
  const responses = operation.responses;
  if (!responses) {
    return;
  }
  const key2XX = Object.keys(responses).find(httpStatusCode =>
    is2XXCode(httpStatusCode)
  );
  if (!key2XX) {
    return;
  }

  return getRefNameFromContent(responses[key2XX]?.content);
}

export function is2XXCode(httpStatusCode: string): boolean {
  return httpStatusCode.match(/^2\d\d$/) != null;
}

function getRefName(ref: string) {
  return last(ref.split('/'));
}
