import { EdmxComplexType, parseComplexTypesBase, transformComplexTypesBase } from '../common/edmx-complex-type-parser';
import { joinTypesWithBaseTypes } from './edmx-parser-util';
import { ParsedServiceMetadata } from '../parsed-service-metadata';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType } from '../../vdm-types';


function parseComplexType(root):EdmxComplexType[] {
  return joinTypesWithBaseTypes(
    parseComplexTypesBase(root),
    joinComplexTypes
  )
}

function joinComplexTypes(
  complexType: EdmxComplexType,
  baseType: EdmxComplexType
): EdmxComplexType {
  return {
    ...complexType,
    Property: [...complexType.Property, ...baseType.Property]
  };
}


export function transformComplexTypesV4(serviceMetadata: ParsedServiceMetadata,
                                      formatter: ServiceNameFormatter):VdmComplexType[]{
  return transformComplexTypesBase(parseComplexType(serviceMetadata.edmx.root),formatter)
}
