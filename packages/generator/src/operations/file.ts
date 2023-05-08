import { flat } from '@sap-cloud-sdk/util';
import {
  FunctionDeclarationStructure,
  InterfaceDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { VdmOperation, VdmServiceMetadata } from '../vdm-types';
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
