import { VdmOperation, VdmServiceMetadata } from '../vdm-types';
import { cannotDeserialize } from '../edmx-to-vdm/common';
import { responseTransformerFunctionName } from './response-transformer-function';

/**
 * @internal
 */
export function getRequestBuilderArguments(
  operation: VdmOperation,
  service: VdmServiceMetadata
): string[] {
  const sharedParameters = [getTransformer(operation), 'params'];
  if (!operation.isBound) {
    return [
      `'${service.serviceOptions.basePath}'`,
      `'${operation.originalName}'`,
      ...sharedParameters,
      'deSerializers',
      `'${operation.type}'`
    ];
  }
  return [
    'this._entityApi',
    'this',
    `'${operation.originalName}'`,
    ...sharedParameters,
    'deSerializers || defaultDeSerializers',
    ...(service.oDataVersion === 'v4' ? [`'${operation.type}'`] : [])
  ];
}

function getTransformer(operation: VdmOperation): string {
  if (cannotDeserialize(operation.returnType)) {
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
