import { caps, ODataVersion } from '@sap-cloud-sdk/util';
import {
  VdmActionFunctionImportReturnType,
  VdmFunctionImportReturnType,
  VdmReturnTypeCategory
} from '../vdm-types';

export function responseTransformerFunctionName(
  returnType: VdmActionFunctionImportReturnType,
  oDataVersion: ODataVersion
): string {
  const transformationFn = singleTransformationFunction(returnType);
  const versionInCaps = caps(oDataVersion);
  return returnType.isCollection
    ? `${transformationFn}List${versionInCaps}`
    : `${transformationFn}${versionInCaps}`;
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
