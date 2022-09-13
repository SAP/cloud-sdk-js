import { VdmActionImport, VdmFunctionImport } from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';

function actionFunctionImportReturnType(
  actionOrFunctionImport: VdmActionImport | VdmFunctionImport,
  requestBuilderName: string
): string {
  let type = actionOrFunctionImport.returnType.returnType;
  const returnType = actionOrFunctionImport.returnType;

  if (isEntityNotDeserializable(returnType)) {
    type = wrapRequestBuilderAroundType(
      requestBuilderName,
      actionOrFunctionImport.parametersTypeName,
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
    actionOrFunctionImport.parametersTypeName,
    type
  );
  return type;
}

function wrapRequestBuilderAroundType(
  requestBuilderName: string,
  parameterName: string,
  type: string
) {
  return `${requestBuilderName}<DeSerializersT, ${parameterName}<DeSerializersT>, ${type}>`;
}

/**
 * @internal
 */
export function actionImportReturnType(actionImport: VdmActionImport): string {
  return actionFunctionImportReturnType(
    actionImport,
    'ActionImportRequestBuilder'
  );
}
/**
 * @internal
 */
export function functionImportReturnType(
  actionImport: VdmActionImport
): string {
  return actionFunctionImportReturnType(
    actionImport,
    'FunctionImportRequestBuilder'
  );
}
