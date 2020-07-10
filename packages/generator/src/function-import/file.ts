/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { flat } from '@sap-cloud-sdk/util';
import {
  FunctionDeclarationStructure,
  InterfaceDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { VdmFunctionImport, VdmServiceMetadata } from '../service-vdm/vdm-types';
import { exportStatement } from './export-statement';
import { functionImportFunction } from './function';
import { importDeclarations } from './import';
import { functionImportParametersInterface } from './parameters-interface';

export function functionImportSourceFile(
  service: VdmServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importDeclarations(service),
      ...flat(
        service.functionImports.map(fi => functionImportStatements(fi, service))
      ),
      exportStatement(service.functionImports)
    ]
  };
}

function functionImportStatements(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): [InterfaceDeclarationStructure, FunctionDeclarationStructure] {
  return [
    functionImportParametersInterface(functionImport),
    functionImportFunction(functionImport, service)
  ];
}
