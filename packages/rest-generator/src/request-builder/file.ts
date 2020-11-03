import {
  ImportDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { toPascalCase } from '@sap-cloud-sdk/core';
import { flat } from '@sap-cloud-sdk/util';
import { OpenApiServiceMetadata } from '../open-api-types';
import { coreImportDeclaration } from '../utils';
import { apiRequestBuilderClass } from './class';
export function requestBuilderSourceFile(
  serviceMetadata: OpenApiServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      coreImportDeclaration(['RestRequestBuilder']),
      ...openApiImports(serviceMetadata),
      apiRequestBuilderClass(serviceMetadata)
    ]
  };
}

function openApiImports(
  serviceMetadata: OpenApiServiceMetadata
): ImportDeclarationStructure[] {
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
  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './open-api',
      namedImports: [`${toPascalCase(serviceMetadata.apiName)}Api`]
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './open-api/model',
      namedImports: [...paramRefNames]
    }
  ];
}
