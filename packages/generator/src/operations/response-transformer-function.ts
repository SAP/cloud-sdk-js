import type { VdmOperationReturnType } from '../vdm-types';

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
    case 'void':
      return 'transformReturnValueForUndefined';
    case 'entity':
      return 'transformReturnValueForEntity';
    case 'complex-type':
      return 'transformReturnValueForComplexType';
    default:
      return 'transformReturnValueForEdmType';
  }
}
