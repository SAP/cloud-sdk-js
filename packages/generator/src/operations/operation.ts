import { StructureKind } from 'ts-morph';
import { cannotDeserialize } from '../edmx-to-vdm';
import { getRequestBuilderArguments } from './request-builder-arguments';
import { operationReturnType } from './return-type';
import type { VdmOperation, VdmServiceMetadata } from '../vdm-types';
import type {
  FunctionDeclarationStructure,
  FunctionLikeDeclarationStructure
} from 'ts-morph';

const parameterName = 'parameters';

/**
 * @internal
 * Returns a function like declaration representation for an action or function.
 * Reusable for bound and unbound functions.
 */
export function operationFunctionBase(
  operation: VdmOperation,
  service: VdmServiceMetadata
): FunctionLikeDeclarationStructure & { name: string } {
  const { isBound } = operation;
  return {
    name: isBound
      ? operation.name
      : `${operation.name}<DeSerializersT extends DeSerializers = DefaultDeSerializers>`,

    parameters: [
      {
        name: parameterName,
        type: `${operation.parametersTypeName}<${
          isBound ? 'T' : 'DeSerializersT'
        }>`
      },
      {
        name: 'deSerializers',
        type: isBound ? 'T' : 'DeSerializersT',
        initializer: isBound
          ? 'defaultDeSerializers as T'
          : 'defaultDeSerializers as DeSerializersT'
      }
    ],
    returnType: operationReturnType(operation),
    statements: getOperationStatements(operation, service),
    docs: [
      [
        getDocDescription(operation),
        `@param parameters - Object containing all parameters for the ${operation.type}.`,
        '@returns A request builder that allows to overwrite some of the values and execute the resulting request.'
      ].join('\n')
    ]
  };
}

/**
 * @internal
 * Returns a function declaration representation for an action or function.
 */
export function operationFunction(
  operation: VdmOperation,
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    isExported: true,
    ...operationFunctionBase(operation, service)
  };
}

function getDocDescription({ description, returnType, type }: VdmOperation) {
  return `${description} ${
    cannotDeserialize(returnType)
      ? `The 'execute' method does not exist for this ${type} import. Please use 'executeRaw' to get the raw response.`
      : ''
  }`;
}

function getOperationStatements(
  operation: VdmOperation,
  service: VdmServiceMetadata
): string {
  const requestBuilderName = `${
    operation.isBound ? 'Bound' : ''
  }OperationRequestBuilder`;
  const paramsLines = (operation.parameters || []).map(
    param =>
      `${param.parameterName}: new OperationParameter('${param.originalName}', '${param.edmType}', ${parameterName}.${param.parameterName})`
  );
  const params = `const params = {\n${paramsLines.join(',\n')}\n};`;

  const parameters = getRequestBuilderArguments(operation, service);

  const returnStatement = `return new ${requestBuilderName}(${parameters.join(
    ', '
  )});`;

  return `${params}\n\n${returnStatement}`;
}
