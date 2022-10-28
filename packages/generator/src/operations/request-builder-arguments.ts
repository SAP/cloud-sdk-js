import { VdmOperation, VdmServiceMetadata } from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { responseTransformerFunctionName } from './response-transformer-function';

/**
 * @internal
 */
export function getRequestBuilderArgumentsBase(
  operation: VdmOperation,
  service: VdmServiceMetadata
): string[] {
  const transformer = getTransformer(operation);
  return [
    `'${service.servicePath}'`,
    `'${operation.originalName}'`,
    transformer,
    'params',
    'deSerializers'
  ];
}

function getTransformer(operation: VdmOperation): string {
  if (isEntityNotDeserializable(operation.returnType)) {
    return `(data) => throwErrorWhenReturnTypeIsUnionType(data, '${operation.originalName}')`;
  }
  if (operation.returnType.builderFunction) {
    return `(data) => ${responseTransformerFunctionName(
      operation.returnType
    )}(data, ${operation.returnType.builderFunction})`;
  }
  throw Error(
    `Cannot build function/action import ${operation.originalName} because the builder function: ${operation.returnType.builderFunction} is missing.`
  );
}
