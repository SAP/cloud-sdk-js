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
  return parameters.map(param => ({
    ...param,
    name: camelCase(param.name),
    // TODO: Check whether types are correct here and whether we can use union types here.
    type: parseType(param, refs)
  }));
}

function parseType(param: OpenAPIV3.ParameterObject, refs: $Refs): string {
  const originalType = resolveObject(param.schema, refs)?.type?.toString();
  const tsType = getType(originalType);
  const enumValue = resolveObject(param.schema, refs)?.enum;
  return enumValue && isValidEnumType(tsType)
    ? enumAsUnionType(tsType, enumValue, originalType)
    : tsType;
}

function isValidEnumType(tsType: string): boolean {
  return tsType === 'number' || tsType === 'string';
}

function enumAsUnionType(
  tsType: string,
  enumValue: any[],
  originalType
): string {
  if (tsType === 'number') {
    return enumValue.join(' | ');
  }
  if (tsType === 'string') {
    return enumValue.map(e => `'${e}'`).join(' | ');
  }
  throw new Error(`Cannot parse enum with original type: ${originalType}.`);
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
