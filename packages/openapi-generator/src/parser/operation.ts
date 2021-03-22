import { $Refs } from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import {
  camelCase,
  filterDuplicatesRight,
  partition,
  UniqueNameGenerator
} from '@sap-cloud-sdk/util';
import { Method, OpenApiOperation, OpenApiParameter } from '../openapi-types';
import { parseRequestBody } from './request-body';
import { resolveObject } from './refs';
import { parseSchema } from './schema';

export function parseOperation(
  pathPattern: string,
  pathItem: OpenAPIV3.PathItemObject,
  method: Method,
  refs: $Refs
): OpenApiOperation {
  const operation = getOperation(pathItem, method);
  const requestBody = parseRequestBody(operation.requestBody, refs);
  const parameters = parseParameters(
    [...(pathItem.parameters || []), ...(operation.parameters || [])],
    refs
  );

  const [pathParameters, queryParameters] = partition(
    parameters,
    parameter => parameter.in === 'path'
  );

  const pathTemplateAndPathParams = renamePathParametersAndPath(
    pathPattern,
    pathParameters
  );

  return {
    ...operation,
    method,
    requestBody,
    queryParameters,
    ...pathTemplateAndPathParams,
    operationId: operation.operationId!,
    tags: operation.tags!
  };
}

/**
 * Get the operation for the given method and merge path parameters with operation parameters.
 * @param pathItem Path Item to get the operation from.
 * @param method HTTP method to get the operation for.
 * @returns The sanitized original operation.
 */
export function getOperation(
  pathItem: OpenAPIV3.PathItemObject,
  method: Method
): OpenAPIV3.OperationObject {
  const operation = pathItem[method];
  if (!operation) {
    throw new Error(
      `Could not parse operation. Operation for method '${method}' does not exist.`
    );
  }
  return operation;
}

function getRelevantParameters(
  parameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[],
  refs: $Refs
): OpenAPIV3.ParameterObject[] {
  const resolvedParameters = parameters.map(param =>
    resolveObject(param, refs)
  );
  return filterDuplicatesRight(
    resolvedParameters,
    (left, right) => left.name === right.name && left.in === right.in
  );
}

export function parseParameters(
  allParameters: (OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject)[],
  refs: $Refs
): OpenApiParameter[] {
  const relevantParameters = getRelevantParameters(allParameters, refs);
  return relevantParameters.map(param => ({
    ...param,
    schema: parseSchema(param.schema)
  }));
}

export function renamePathParametersAndPath(
  pathPattern: string,
  pathParams: OpenApiParameter[]
): {
  pathTemplate: string;
  pathParameters: OpenApiParameter[];
} {
  const nameGenerator = new UniqueNameGenerator('', [
    'body',
    'queryParameters'
  ]);

  return pathParams.reduce(
    ({ pathTemplate, pathParameters }, parameter) => {
      const subPattern = new RegExp(`(?<!\\$){${parameter.name}}`);

      if (!subPattern.test(pathTemplate)) {
        throw new Error(
          `Path parameter '${parameter.name}' is not referenced in path.`
        );
      }
      const name = nameGenerator.generateAndSaveUniqueName(
        camelCase(parameter.name)
      );

      return {
        pathTemplate: pathTemplate.replace(subPattern, `\${${name}}`),
        pathParameters: [...pathParameters, { ...parameter, name }]
      };
    },
    {
      pathTemplate: pathPattern,
      pathParameters: []
    }
  );
}
