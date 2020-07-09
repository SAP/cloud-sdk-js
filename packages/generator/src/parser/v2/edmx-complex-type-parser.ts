import { parseComplexTypesBase, transformComplexTypesBase } from '../common/edmx-complex-type-parser';
import { ParsedServiceMetadata } from '../parsed-service-metadata';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmComplexType, VdmFunctionImport } from '../../vdm-types';


function parseComplexTypes(root){
  return parseComplexTypesBase(root)
}


export function transformComplexTypesV2(serviceMetadata: ParsedServiceMetadata,
                                        formatter: ServiceNameFormatter):VdmComplexType[]{
  return transformComplexTypesBase(parseComplexTypes(serviceMetadata.edmx.root),formatter)
}

