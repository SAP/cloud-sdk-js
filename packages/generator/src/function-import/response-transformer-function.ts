/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  VdmFunctionImportReturnType,
  VdmFunctionImportReturnTypeCategory
} from '../service-vdm/vdm-types';

export function responseTransformerFunctionName(
  returnType: VdmFunctionImportReturnType
): string {
  const transformationFn = singleTransformationFunction(returnType);
  return returnType.isCollection ? `${transformationFn}List` : transformationFn;
}

function singleTransformationFunction(
  returnType: VdmFunctionImportReturnType
): string {
  switch (returnType.returnTypeCategory) {
    case VdmFunctionImportReturnTypeCategory.VOID:
      return 'transformReturnValueForUndefined';
    case VdmFunctionImportReturnTypeCategory.ENTITY:
      return 'transformReturnValueForEntity';
    case VdmFunctionImportReturnTypeCategory.COMPLEX_TYPE:
      return 'transformReturnValueForComplexType';
    default:
      return 'transformReturnValueForEdmType';
  }
}
