import voca from 'voca';
import { VdmOperation } from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
/**
 * @internal
 */
export function operationReturnType(
  {
    returnType,
    parametersTypeName,
    type: operationType,
    isBound,
    name
  }: VdmOperation,
  boundEntitySetName?: string
): string {
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

  if (isBound && !boundEntitySetName) {
    throw new Error(
      `For bound operations the entity set name needs to be provided: ${name}`
    );
  }
  type = isBound
    ? wrapRequestBuilderAroundTypeBound(
        boundEntitySetName!,
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
  // BoundActionImportRequestBuilder<TestEntity<T>,T,BoundActionWithoutArgumentsParameters<T>,string>
  return `${requestBuilderName}<DeSerializersT, ${parameterName}<DeSerializersT>, ${type}>`;
}

function wrapRequestBuilderAroundTypeBound(
  entityName: string,
  requestBuilderName: string,
  parameterName: string,
  type: string
) {
  // BoundActionImportRequestBuilder<TestEntity<T>,T,BoundActionWithoutArgumentsParameters<T>,string>
  return `${requestBuilderName}<${entityName}<T>, T, ${parameterName}<T>, ${type}>`;
}
