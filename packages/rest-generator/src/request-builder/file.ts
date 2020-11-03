import {
  ImportDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { toPascalCase } from '@sap-cloud-sdk/core';
import { flat } from '@sap-cloud-sdk/util';
import { OpenApiServiceMetadata } from '../open-api-types';
import { coreImportDeclaration } from '../utils';
import { apiRequestBuilderClass } from './api-request-builder-class';
export function requestBuilderSourceFile(
  serviceMetadata: OpenApiServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      coreImportDeclaration([
        'Destination',
        'DestinationNameAndJwt',
        'RestRequestBuilder'
      ]),
      importAxiosRequestConfig(),
      importFromOpenApi(serviceMetadata),
      apiRequestBuilderClass(serviceMetadata)
    ]
  };
}

function importAxiosRequestConfig(): ImportDeclarationStructure {
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: 'axios',
    namedImports: ['AxiosRequestConfig', 'AxiosResponse']
  };
}

function importFromOpenApi(
  serviceMetadata: OpenApiServiceMetadata
): ImportDeclarationStructure {
  const paramRefNames: string[] = flat(
    serviceMetadata.paths.map(path =>
      flat(
        path.operations.map(o =>
          o.requestBodySchemaRefName
            ? [toPascalCase(o.requestBodySchemaRefName)]
            : []
        )
      )
    )
  );
  const responseRefNames: string[] = flat(
    serviceMetadata.paths.map(path =>
      flat(
        path.operations.map(o =>
          o.responseSchemaRefName ? [toPascalCase(o.responseSchemaRefName)] : []
        )
      )
    )
  );
  const apiClassName = `${toPascalCase(serviceMetadata.apiName)}Api`;
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: './open-api/api',
    namedImports: [apiClassName, ...paramRefNames, ...responseRefNames]
  };
}
