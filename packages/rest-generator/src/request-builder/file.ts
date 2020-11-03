import {
  ImportDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { toPascalCase } from '@sap-cloud-sdk/core';
import { flat } from '@sap-cloud-sdk/util';
import { OpenApiServiceMetadata } from '../open-api-types';
import { coreImportDeclaration } from '../utils';
import { operationsVariable } from './operations';
export function requestBuilderSourceFile(
  serviceMetadata: OpenApiServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      coreImportDeclaration(['RestRequestBuilder']),
      ...openApiImports(serviceMetadata),
      operationsVariable(serviceMetadata)
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

  return [
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './open-api/api',
      namedImports: [`${toPascalCase(serviceMetadata.apiName)}Api`]
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './open-api/model',
      namedImports: [...paramRefNames]
    }
  ];
}
