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
  service: VdmServiceMetadata
): SourceFileStructure {
  const functions = service.functionImports;
  const actions = service.actionImports || [];
  const operations = functions.concat(actions);

  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...operationImportDeclarations(service, operations),
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
