import { $Refs } from '@apidevtools/swagger-parser';
import {
  camelCase,
  filterDuplicatesRight,
  partition
} from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApiParameter } from '../openapi-types';
import { resolveObject } from './refs';
import { getType } from './type-mapping';

/**
 * Parse parameters of an operation.
 * @param operation The original operation definition.
 * @param refs List of cross references that can occur in the document.
 * @returns A list of parsed parameters.
 */
export function parseParameters(
  operation: OpenAPIV3.OperationObject,
  refs: $Refs
): OpenApiParameter[] {
  // TODO: What if this is a reference? What does OpenApi do?
  // TODO: What about one of and other operations?
  let parameters =
    operation.parameters?.map(param => resolveObject(param, refs)) || [];
  parameters = filterDuplicateParams(parameters);
  parameters = reorderParameters(parameters);
  parameters = renameEquallyNamedParams(parameters);
  return parameters.map(param => toOpenApiParameter(param, refs));
}

function toOpenApiParameter(
  param: OpenAPIV3.ParameterObject,
  refs: $Refs
): OpenApiParameter {
  const enumValue = resolveObject(param.schema, refs)?.enum;
  const ret = {
    ...param,
    name: camelCase(param.name),
    // TODO: Check whether types are correct here and whether we can use union types here.
    type: getType(resolveObject(param.schema, refs)?.type?.toString()),
    enum: resolveObject(param.schema, refs)?.enum
  };
  if (!enumValue) {
    delete ret.enum;
  }
  return ret;
}

export function filterDuplicateParams(
  parameters: OpenAPIV3.ParameterObject[]
): OpenAPIV3.ParameterObject[] {
  return filterDuplicatesRight(
    parameters,
    (left, right) => left.name === right.name && left.in === right.in
  );
}

function reorderParameters(
  parameters: OpenAPIV3.ParameterObject[]
): OpenAPIV3.ParameterObject[] {
  const [required, optional] = partition(parameters, param => !!param.required);
  return [...required, ...optional];
}

export function renameEquallyNamedParams(
  parameters: OpenAPIV3.ParameterObject[]
): OpenAPIV3.ParameterObject[] {
  return parameters.map((param, i) => {
    const duplicate = parameters
      .slice(0, i)
      .find(previousParam => previousParam.name === param.name);
    if (duplicate) {
      param.name = `${param.name}2`;
    }
    return param;
  });
}
