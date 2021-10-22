import {
  VdmActionImport,
  VdmFunctionImport,
  VdmServiceMetadata
} from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { responseTransformerFunctionName } from './response-transformer-function';

export function getRequestBuilderArgumentsBase(
  actionFunctionImport: VdmFunctionImport | VdmActionImport,
  service: VdmServiceMetadata
): string[] {
  const transformer = getTransformer(actionFunctionImport, service);
  return [
    `'${service.servicePath}'`,
    `'${actionFunctionImport.originalName}'`,
    transformer,
    'params'
  ];
}

function getTransformer(
  actionFunctionImport: VdmFunctionImport | VdmActionImport,
  service: VdmServiceMetadata
): string {
  if (isEntityNotDeserializable(actionFunctionImport.returnType)) {
    return `(data) => throwErrorWhenReturnTypeIsUnionType(data, '${actionFunctionImport.originalName}')`;
  }
  if (actionFunctionImport.returnType.builderFunction) {
    return `(data) => ${responseTransformerFunctionName(
      actionFunctionImport.returnType
    )}(data, ${actionFunctionImport.returnType.builderFunction})`;
  }
  throw Error(
    `Cannot build function/action import ${actionFunctionImport.originalName} because the builder function: ${actionFunctionImport.returnType.builderFunction} is missing.`
  );
}
