import { cannotDeserialize } from '../edmx-to-vdm';
import { responseTransformerFunctionName } from './response-transformer-function';
import type { VdmOperation, VdmServiceMetadata } from '../vdm-types';

/**
 * @internal
 */
export function getRequestBuilderArguments(
  operation: VdmOperation,
  service: VdmServiceMetadata
): string[] {
  const sharedParameters = [getTransformer(operation), 'params'];
  if (operation.isBound) {
    return [
      'this._entityApi',
      'this',
      `'${operation.originalName}'`,
      ...sharedParameters,
      'deSerializers',
      `'${operation.type}'`
    ];
  }
  const params = [
    `'${service.serviceOptions.basePath}'`,
    `'${operation.originalName}'`,
    ...sharedParameters,
    'deSerializers'
  ];

  return service.oDataVersion === 'v4'
    ? [...params, `'${operation.type}'`]
    : [`'${operation.httpMethod}'`, ...params];
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
