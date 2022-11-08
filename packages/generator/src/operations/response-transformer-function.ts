import { VdmOperationReturnType, VdmReturnTypeCategory } from '../vdm-types';

/**
 * @internal
 */
export function responseTransformerFunctionName(
  returnType: VdmOperationReturnType
): string {
  const transformationFn = singleTransformationFunction(returnType);
  return returnType.isCollection
    ? `${transformationFn}List`
    : `${transformationFn}`;
}

function singleTransformationFunction(
  returnType: VdmOperationReturnType
): string {
  switch (returnType.returnTypeCategory) {
    case VdmReturnTypeCategory.VOID:
      return 'transformReturnValueForUndefined';
    case VdmReturnTypeCategory.ENTITY:
      return 'transformReturnValueForEntity';
    case VdmReturnTypeCategory.COMPLEX_TYPE:
      return 'transformReturnValueForComplexType';
    default:
      return 'transformReturnValueForEdmType';
  }
}
