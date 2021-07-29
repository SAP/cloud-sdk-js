import { caps } from '@sap-cloud-sdk/util';
import { VdmActionImport, VdmFunctionImport } from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';

function actionFunctionImportReturnType(
  actionOrFuncitonImport: VdmActionImport | VdmFunctionImport,
  requestBuilderName: string
): string {
  let type = actionOrFuncitonImport.returnType.returnType;

  if (actionOrFuncitonImport.returnType.isCollection) {
    type = `${type}[]`;
  }

  if (actionOrFuncitonImport.returnType.isNullable) {
    type = `${type} | null`;
  }

  type = `${requestBuilderName}<${actionOrFuncitonImport.parametersTypeName}, ${type}>`;

  if (isEntityNotDeserializable(actionOrFuncitonImport.returnType)) {
    type = `Omit<${type}, 'execute'>`;
  }
  return type;
}

export function actionImportReturnType(actionImport: VdmActionImport): string {
  return actionFunctionImportReturnType(
    actionImport,
    'ActionImportRequestBuilder'
  );
}

export function functionImportReturnType(
  actionImport: VdmActionImport,
  oDataVersion: string
): string {
  return actionFunctionImportReturnType(
    actionImport,
    `FunctionImportRequestBuilder${caps(oDataVersion)}`
  );
}
