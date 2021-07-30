import { caps } from '@sap-cloud-sdk/util';
import { VdmActionImport, VdmFunctionImport } from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';

function actionFunctionImportReturnType(
  actionOrFuncitonImport: VdmActionImport | VdmFunctionImport,
  requestBuilderName: string
): string {
  let type = actionOrFuncitonImport.returnType.returnType;
  const returnType = actionOrFuncitonImport.returnType;

  if (isEntityNotDeserializable(returnType)) {
    type = wrapRequestBuilderAroundType(
      requestBuilderName,
      actionOrFuncitonImport.parametersTypeName,
      type
    );
    type = `Omit<${type}, 'execute'>`;
    return type;
  }

  if (returnType.isCollection) {
    type = `${type}[]`;
  }

  if (returnType.isNullable) {
    type = `${type} | null`;
  }
  type = wrapRequestBuilderAroundType(
    requestBuilderName,
    actionOrFuncitonImport.parametersTypeName,
    type
  );
  return type;
}

function wrapRequestBuilderAroundType(
  requestBuilderName: string,
  parameterName: string,
  type: string
) {
  return `${requestBuilderName}<${parameterName}, ${type}>`;
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
