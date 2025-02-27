import { cannotDeserialize } from '../edmx-to-vdm';
import type { VdmOperation } from '../vdm-types';
/**
 * @internal
 */
export function operationReturnType({
  returnType,
  parametersTypeName,
  isBound,
  name,
  entityClassName
}: VdmOperation): string {
  let type = returnType.returnType;
  const requestBuilderName = `${isBound ? 'Bound' : ''}OperationRequestBuilder`;

  if (cannotDeserialize(returnType)) {
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

  if (isBound && !entityClassName) {
    throw new Error(
      `For bound operations the entity set name needs to be provided: ${name}`
    );
  }
  type = isBound
    ? wrapRequestBuilderAroundTypeBound(
        entityClassName!,
        requestBuilderName,
        parametersTypeName,
        type
      )
    : wrapRequestBuilderAroundType(
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

function wrapRequestBuilderAroundTypeBound(
  entityName: string,
  requestBuilderName: string,
  parameterName: string,
  type: string
) {
  return `${requestBuilderName}<${entityName}<T>, T, ${parameterName}<T>, ${type}>`;
}
