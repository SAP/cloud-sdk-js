import {
  ClassDeclarationStructure,
  ImportDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { toPascalCase } from '@sap-cloud-sdk/core';
import { OpenApiServiceMetadata } from '../open-api-types';
import { coreImportDeclaration } from '../utils';
import { apiRequestBuilderClass } from './api-request-builder-class';
import { operationRequestBuilderClass } from './operation-request-builder-class';

/**
 * Used by the generator for generating the request builder source file.
 * @param serviceMetadata The service metadata model converted from the open api file.
 * @returns source file structure of the request builder file
 */
export function requestBuilderSourceFile(
  serviceMetadata: OpenApiServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      coreImportDeclaration([
        'Destination',
        'DestinationNameAndJwt',
        'RestRequestBuilder',
        'RestRequestConfig'
      ]),
      importAxiosRequestConfig(),
      importFromOpenApi(serviceMetadata),
      apiRequestBuilderClass(serviceMetadata),
      ...getOperationRequestBuilders(serviceMetadata)
    ]
  };
}

function getOperationRequestBuilders(
  serviceMetadata: OpenApiServiceMetadata
): ClassDeclarationStructure[] {
  return serviceMetadata.paths.flatMap(path =>
    path.operations.map(o =>
      operationRequestBuilderClass(serviceMetadata, path, o)
    )
  );
}

function importAxiosRequestConfig(): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: 'axios',
    namedImports: ['AxiosRequestConfig']
  };
}

function importFromOpenApi(
  serviceMetadata: OpenApiServiceMetadata
): ImportDeclarationStructure {
  const refNames = serviceMetadata.paths.flatMap(path =>
    path.operations.flatMap(o =>
      o.requestBodySchemaRefName
        ? [toPascalCase(o.requestBodySchemaRefName)]
        : []
    )
  );
  const apiClassName = `${toPascalCase(serviceMetadata.apiName)}Api`;
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: './api',
    namedImports: [apiClassName, ...refNames]
  };
}
