/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  StructureKind,
  VariableDeclarationKind,
  VariableStatementStructure
} from 'ts-morph';
import { VdmFunctionImport } from '../edmx-to-vdm/vdm-types';

export function exportStatement(
  functionImports: VdmFunctionImport[]
): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'functionImports',
        initializer: exportsInitializer(functionImports)
      }
    ],
    isExported: true
  };
}

function exportsInitializer(functionImports: VdmFunctionImport[]): string {
  return (
    functionImports.reduce((initializer, currentImport) => {
      if (initializer !== '{\n') {
        initializer += ',\n';
      }
      initializer += `${currentImport.functionName}`;
      return initializer;
    }, '{\n') + '\n}'
  );
}
