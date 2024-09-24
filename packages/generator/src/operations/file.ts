import { flat } from '@sap-cloud-sdk/util';
import type {
  FunctionDeclarationStructure,
  InterfaceDeclarationStructure,
  SourceFileStructure
} from 'ts-morph';
import { StructureKind } from 'ts-morph';
import type { VdmOperation, VdmServiceMetadata } from '../vdm-types';
import { parametersInterface } from './parameters-interface';
import { exportStatement } from './export-statement';
import { operationDeclarations } from './import';
import { operationFunction } from './operation';

/**
 * @internal
 */
export function operationsSourceFile(
  service: VdmServiceMetadata
): SourceFileStructure {
  const operations = service.operations;

  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...operationDeclarations(service, operations),
      ...flat(
        operations.map(operation => operationStatements(operation, service))
      ),
      exportStatement(operations)
    ]
  };
}

function operationStatements(
  operation: VdmOperation,
  service: VdmServiceMetadata
): [InterfaceDeclarationStructure, FunctionDeclarationStructure] {
  return [
    parametersInterface(operation),
    operationFunction(operation, service)
  ];
}
