import { OpenApiServiceMetadata } from '../open-api-types';
import {
  ClassDeclarationStructure, ImportDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import {
  apiRequestBuilderClass,
} from './api-request-builder-class';
import { operationRequestBuilderClass } from './operation-request-builder-class';
import { coreImportDeclaration } from '../utils';
import { unique } from '@sap-cloud-sdk/util';
import { toPascalCase } from '@sap-cloud-sdk/core';

export function requestBuilderSourceFile(serviceMetadata: OpenApiServiceMetadata): SourceFileStructure{
  return {
    kind: StructureKind.SourceFile,
    statements:[
      coreImportDeclaration(['Destination', 'DestinationNameAndJwt', 'RestRequestBuilder', 'RestRequestConfig']),
      importAxiosRequestConfig(),
      importFromOpenApi(serviceMetadata),
      apiRequestBuilderClass(serviceMetadata),
      ...getOperationRequestBuilders(serviceMetadata)
    ]
  }
}

function getOperationRequestBuilders(serviceMetadata: OpenApiServiceMetadata): ClassDeclarationStructure[] {
  return serviceMetadata.paths.flatMap(path => {
    return path.operations.map(o => {
      return operationRequestBuilderClass(serviceMetadata, path, o);
    })
  });
}

function importAxiosRequestConfig(): ImportDeclarationStructure{
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: 'axios',
    namedImports: ['AxiosRequestConfig']
  };
}

function importFromOpenApi(serviceMetadata: OpenApiServiceMetadata): ImportDeclarationStructure{
  const refNames = serviceMetadata.paths.flatMap(path => {
    return path.operations.flatMap(o => {
      return o.requestBodySchemaRefName? [toPascalCase(o.requestBodySchemaRefName)] : [];
    })
  });
  const apiClassName = `${toPascalCase(serviceMetadata.apiName)}Api`;
  return {
    kind: StructureKind.ImportDeclaration,
    moduleSpecifier: './api',
    namedImports: [apiClassName, ...refNames]
  };
}
