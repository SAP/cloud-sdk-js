import { unixEOL } from '@sap-cloud-sdk/util'
import {
  StructureKind,
  VariableDeclarationKind,
  VariableStatementStructure
} from 'ts-morph';
import { VdmFunctionImport, VdmActionImport } from '../vdm-types';

export function exportStatement(
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[],
  name: 'functionImports' | 'actionImports'
): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name,
        initializer: exportsInitializer(actionFunctionImports)
      }
    ],
    isExported: true
  };
}

function exportsInitializer(
  actionFunctionImports: VdmFunctionImport[] | VdmActionImport[]
): string {
  return (
    actionFunctionImports.reduce((initializer, currentImport) => {
      if (initializer !== `{${unixEOL}`) {
        initializer += `,${unixEOL}`;
      }
      initializer += `${currentImport.name}`;
      return initializer;
    }, `{${unixEOL}`) + `${unixEOL}}`
  );
}
