import { $Refs } from '@apidevtools/swagger-parser';
import {
  camelCase,
  filterDuplicatesRight,
  partition,
  UniqueNameGenerator
} from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApiParameter } from '../openapi-types';
import { resolveObject } from './refs';
import { parseSchema } from './schema';

export function parseParameters(
  operation: OpenAPIV3.OperationObject,
  refs: $Refs
): {
  pathParameters: OpenApiParameter[];
  queryParameters: OpenApiParameter[];
} {
  const parameters = getRelevantParameters(operation, refs).map(param => ({
    ...param,
    schema: parseSchema(param.schema)
  }));
  const [pathParameters, queryParameters] = partition(
    parameters,
    parameter => parameter.in === 'path'
  );
  return {
    pathParameters: renamePathParameters(pathParameters),
    queryParameters
  };
}

function renamePathParameters(
  pathParameters: OpenApiParameter[]
): OpenApiParameter[] {
  const nameGenerator = new UniqueNameGenerator('', [
    'body',
    'queryParameters'
  ]);
  return pathParameters.map(parameter => ({
    ...parameter,
    name: nameGenerator.generateAndSaveUniqueName(camelCase(parameter.name))
  }));
}

function getRelevantParameters(
  operation: OpenAPIV3.OperationObject,
  refs: $Refs
): OpenAPIV3.ParameterObject[] {
  const allParameters =
    operation.parameters?.map(param => resolveObject(param, refs)) || [];
  return filterDuplicatesRight(
    allParameters,
    (left, right) => left.name === right.name && left.in === right.in
  );
}
