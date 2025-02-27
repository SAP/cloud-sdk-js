import { StructureKind, VariableDeclarationKind } from 'ts-morph';
import type { VariableStatementStructure } from 'ts-morph';
import type { VdmOperation } from '../vdm-types';

/**
 * @internal
 */
export function exportStatement(
  operations: VdmOperation[]
): VariableStatementStructure {
  return {
    kind: StructureKind.VariableStatement,
    declarationKind: VariableDeclarationKind.Const,
    declarations: [
      {
        name: 'operations',
        initializer: exportsInitializer(operations)
      }
    ],
    isExported: true
  };
}

function exportsInitializer(operations: VdmOperation[]): string {
  const exports = operations.map(({ name }) => name);

  return `{\n${exports.join(',\n')}\n}`;
}
