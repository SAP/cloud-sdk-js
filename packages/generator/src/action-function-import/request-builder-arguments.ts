import {
  VdmActionImport,
  VdmFunctionImport,
  VdmReturnTypeCategory,
  VdmServiceMetadata
} from '../vdm-types';
import { responseTransformerFunctionName } from './response-transformer-function';

export function getRequestBuilderArgumentsBase(
  actionFunctionImport: VdmFunctionImport | VdmActionImport,
  service: VdmServiceMetadata
): string[] {
  return actionFunctionImport.returnType.returnTypeCategory ===
    VdmReturnTypeCategory.ENTITY_NOT_DESERIALIZABLE
    ? [
        `'${service.servicePath}'`,
        `'${actionFunctionImport.originalName}'`,
        `(data) => throwErrorWhenReturnTypeIsUnionType(data, '${actionFunctionImport.originalName}')`,
        'params'
      ]
    : [
        `'${service.servicePath}'`,
        `'${actionFunctionImport.originalName}'`,
        `(data) => ${responseTransformerFunctionName(
          actionFunctionImport.returnType,
          service.oDataVersion
        )}(data, ${actionFunctionImport.returnType.builderFunction})`,
        'params'
      ];
}
