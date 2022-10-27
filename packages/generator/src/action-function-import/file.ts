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
import { operationImportDeclarations } from './import';
import { operationFunction } from './operation';

/**
 * @internal
 */
export function operationsSourceFile(
  service: VdmServiceMetadata,
  type: 'function' | 'action'
): SourceFileStructure {
  const propertyName = `${type}Imports`;
  const operations: VdmOperation[] = service[propertyName];
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...operationImportDeclarations(service, type, operations),
      ...flat(
        operations.map(operation => operationStatements(operation, service))
      ),
      exportStatement(operations, `${type}Imports`)
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
