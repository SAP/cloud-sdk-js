import { flat } from '@sap-cloud-sdk/util';
import {
  FunctionDeclarationStructure,
  InterfaceDeclarationStructure,
  SourceFileStructure,
  StructureKind
} from 'ts-morph';
import { VdmFunctionImport, VdmServiceMetadata } from '../vdm-types';
import { parametersInterface } from './parameters-interface';
import { exportStatement } from './export-statement';
import { actionImportFunction } from './action';
import { importDeclarationsAction, importDeclarationsFunction } from './import';
import { functionImportFunction } from './function';

/**
 * @internal
 */
export function actionImportSourceFile(
  service: VdmServiceMetadata
): SourceFileStructure {
  if (!service.actionImports) {
    throw new Error(
      'Tried to create action import source files without actions in service metadata.'
    );
  }
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importDeclarationsFunction(service),
      ...flat(
        service.actionImports.map(action =>
          actionImportStatements(action, service)
        )
      ),
      exportStatement(service.actionImports, 'actionImports')
    ]
  };
}

function actionImportStatements(
  actionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): [InterfaceDeclarationStructure, FunctionDeclarationStructure] {
  return [
    parametersInterface(actionImport),
    actionImportFunction(actionImport, service)
  ];
}
/**
 * @internal
 */
export function functionImportSourceFile(
  service: VdmServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importDeclarationsAction(service),
      ...flat(
        service.functionImports.map(fi => functionImportStatements(fi, service))
      ),
      exportStatement(service.functionImports, 'functionImports')
    ]
  };
}

function functionImportStatements(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): [InterfaceDeclarationStructure, FunctionDeclarationStructure] {
  return [
    parametersInterface(functionImport),
    functionImportFunction(functionImport, service)
  ];
}
