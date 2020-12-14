import { $Refs } from '@apidevtools/swagger-parser';
import { filterDuplicatesRight, partition } from '@sap-cloud-sdk/util';
import { OpenAPIV3 } from 'openapi-types';
import { OpenApiParameter } from '../openapi-types';
import { resolveObject } from './refs';
import { getType } from './type-mapping';

/**
 * Parse parameters of an operation.
 * @param operation The original operation definition.
 * @param refs List of crossreferences that can occur in the document.
 * @returns A list of parsed parameters.
 */
export function parseParameters(
  operation: OpenAPIV3.OperationObject,
  refs: $Refs
): OpenApiParameter[] {
  // TODO: What if this is a reference? What does OpenApi do?
  // TODO: What about oneof and other operations?
  let parameters =
    operation.parameters?.map(param => resolveObject(param, refs)) || [];
  parameters = filterDuplicateParams(parameters);
  parameters = reorderParameters(parameters);
  parameters = renameEquallyNamedParams(parameters);
  return parameters.map(param => ({
    ...param,
    // TODO: Check whether types are correct here and whether we can use union types here.
    type: getType(resolveObject(param.schema, refs)?.type?.toString())
  }));
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
