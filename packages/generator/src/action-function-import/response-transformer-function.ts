/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  VdmActionFunctionImportReturnType,
  VdmFunctionImportReturnType,
  VdmReturnTypeCategory
} from '../vdm-types';

export function responseTransformerFunctionName(
  returnType: VdmActionFunctionImportReturnType
): string {
  const transformationFn = singleTransformationFunction(returnType);
  return returnType.isCollection ? `${transformationFn}List` : transformationFn;
}

function singleTransformationFunction(
  returnType: VdmFunctionImportReturnType
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
