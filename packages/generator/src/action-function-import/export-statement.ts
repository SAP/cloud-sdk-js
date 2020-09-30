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
      if (initializer !== '{\n') {
        initializer += ',\n';
      }
      initializer += `${currentImport.name}`;
      return initializer;
    }, '{\n') + '\n}'
  );
}
