/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { VdmFunctionImportReturnType, VdmFunctionImportReturnTypeCategory } from '../vdm-types';

export function responseTransformerFunctionName(returnType: VdmFunctionImportReturnType): string {
  const transformationFn = singleTransformationFunction(returnType);
  return returnType.isMulti ? `${transformationFn}List` : transformationFn;
}

function singleTransformationFunction(returnType: VdmFunctionImportReturnType): string {
  switch (returnType.returnTypeCategory) {
    case VdmFunctionImportReturnTypeCategory.ENTITY:
      return 'transformReturnValueForEntity';
    case VdmFunctionImportReturnTypeCategory.COMPLEX_TYPE:
      return 'transformReturnValueForComplexType';
    default:
      return 'transformReturnValueForEdmType';
  }
}
