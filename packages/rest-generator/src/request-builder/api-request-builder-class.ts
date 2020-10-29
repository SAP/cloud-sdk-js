import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  StructureKind
} from 'ts-morph';
import { toPascalCase, toPropertyFormat } from '@sap-cloud-sdk/core';
import { flat } from '@sap-cloud-sdk/util';
import { OpenApiPath, OpenApiServiceMetadata } from '../open-api-types';

/**
 * Used by the generator for generating a API request builder class
 * @param serviceMetadata The service metadata model converted from the open api file.
 * @returns class declaration structure of the API request builder class
 */
export function apiRequestBuilderClass(
  serviceMetadata: OpenApiServiceMetadata
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: `${serviceMetadata.apiName}ApiRequestBuilder`,
    methods: method(serviceMetadata.paths),
    isExported: true
  };
}

function method(paths: OpenApiPath[]): MethodDeclarationStructure[] {
  return flat(paths.map(p => getMethods(p)));
}

function getMethods(openApiPath: OpenApiPath): MethodDeclarationStructure[] {
  return openApiPath.operations.map(o => {
    const returnType = `${toPascalCase(o.operationName)}RequestBuilder`;
    const parameters = [
      ...pathParamToParamStructure(openApiPath.pathParameters),
      ...refNameToParamStructure(o.requestBodySchemaRefName)
    ];
    return {
      kind: StructureKind.Method,
      name: toPropertyFormat(o.operationName),
      isStatic: true,
      parameters,
      returnType,
      statements: toStatement(
        returnType,
        parameters.map(p => p.name)
      )
    };
  });
}

function toStatement(className: string, parameters: string[]) {
  const paramString = [...parameters].join(', ');
  return `return new ${className}(${paramString});`;
}

export function refNameToParamStructure(
  refName?: string
): OptionalKind<ParameterDeclarationStructure>[] {
  if (refName) {
    return [
      {
        name: toPropertyFormat(refName),
        type: toPascalCase(refName)
      }
    ];
  }
  return [];
}

export function pathParamToParamStructure(
  pathParameters: string[]
): OptionalKind<ParameterDeclarationStructure>[] {
  return pathParameters.map(p => ({
    name: p,
    type: 'string'
  }));
}
