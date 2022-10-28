import voca from 'voca';
import { VdmOperation } from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
/**
 * @internal
 */
export function operationReturnType({
  returnType,
  parametersTypeName,
  type: operationType,
  isBound
}: VdmOperation): string {
  let type = returnType.returnType;
  const requestBuilderName = `${isBound ? 'Bound' : ''}${voca.capitalize(
    operationType
  )}ImportRequestBuilder`;

  if (isEntityNotDeserializable(returnType)) {
    type = wrapRequestBuilderAroundType(
      requestBuilderName,
      parametersTypeName,
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
    parametersTypeName,
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
