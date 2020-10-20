import {
  ClassDeclarationStructure,
  MethodDeclarationStructure,
  OptionalKind,
  ParameterDeclarationStructure,
  Scope,
  StructureKind
} from 'ts-morph';
import { toPascalCase, toPropertyFormat } from '@sap-cloud-sdk/core';
import {
  OpenApiOperation,
  OpenApiPath,
  OpenApiServiceMetadata
} from '../open-api-types';
import {
  pathParamToParamStructure,
  refNameToParamStructure
} from './api-request-builder-class';

export function operationRequestBuilderClass(
  metadata: OpenApiServiceMetadata,
  openApiPath: OpenApiPath,
  operation: OpenApiOperation
): ClassDeclarationStructure {
  return {
    kind: StructureKind.Class,
    name: `${toPascalCase(operation.operationName)}RequestBuilder`,
    methods: method(metadata, openApiPath, operation),
    extends: 'RestRequestBuilder',
    isExported: true,
    ctors: [
      {
        parameters: [
          ...addPublicScope([getRequestConfigParameter()]),
          ...addPublicScope(
            pathParamToParamStructure(openApiPath.pathParameters)
          ),
          ...addPublicScope(
            refNameToParamStructure(operation.requestBodySchemaRefName)
          )
        ],
        statements: 'super(requestConfig);'
      }
    ]
  };
}

function addPublicScope(
  objs: OptionalKind<ParameterDeclarationStructure>[]
): OptionalKind<ParameterDeclarationStructure>[] {
  return objs.map(o => ({ ...o, scope: Scope.Public }));
}

function method(
  metadata: OpenApiServiceMetadata,
  openApiPath: OpenApiPath,
  operation: OpenApiOperation
): MethodDeclarationStructure[] {
  return [
    {
      kind: StructureKind.Method,
      name: 'execute',
      isAsync: true,
      parameters: [
        {
          name: 'destination',
          type: 'Destination | DestinationNameAndJwt'
        }
      ],
      statements: toStatement(metadata, openApiPath, operation)
    }
  ];
}

function toStatement(
  metadata: OpenApiServiceMetadata,
  openApiPath: OpenApiPath,
  operation: OpenApiOperation
) {
  const parameters = [
    ...buildParameterFromPathParameters(openApiPath.pathParameters),
    ...buildParameterFromRefName(operation.requestBodySchemaRefName),
    'requestConfig'
  ];
  return (
    'const requestConfig: AxiosRequestConfig = await this.buildRequestConfig(destination);\n' +
    `return new ${metadata.apiName}Api({basePath: requestConfig.baseURL})` +
    `.${toPropertyFormat(operation.operationName)}(${parameters.join(', ')});`
  );
}

function buildParameterFromPathParameters(pathParameters: string[]) {
  return pathParameters.map(p => `this.${toPropertyFormat(p)}`);
}

function buildParameterFromRefName(refName?: string): string[] {
  if (refName) {
    return [`this.${toPropertyFormat(refName)}`];
  }
  return [];
}

function getRequestConfigParameter(): OptionalKind<
  ParameterDeclarationStructure
> {
  return {
    name: 'requestConfig',
    type: 'RestRequestConfig'
  };
}
