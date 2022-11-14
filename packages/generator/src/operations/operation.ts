import {
  FunctionDeclarationStructure,
  FunctionLikeDeclarationStructure,
  StructureKind
} from 'ts-morph';
import voca from 'voca';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { VdmOperation, VdmServiceMetadata } from '../vdm-types';
import { getRequestBuilderArgumentsBase } from './request-builder-arguments';
import { operationReturnType } from './return-type';

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
        name: isBound ? 'deSerializers?' : 'deSerializers',
        type: isBound ? 'T' : 'DeSerializersT',
        initializer: isBound ? undefined : 'defaultDeSerializers as any'
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
    isEntityNotDeserializable(returnType)
      ? `The 'execute' method does not exist when using this ${type} import. Please use the 'executeRaw' for getting the raw response.`
      : ''
  }`;
}

function getOperationStatements(
  operation: VdmOperation,
  service: VdmServiceMetadata
): string {
  const requestBuilderName = `${
    operation.isBound ? 'Bound' : ''
  }${voca.capitalize(operation.type)}ImportRequestBuilder`;
  const paramsLines = (operation.parameters || []).map(
    param =>
      `${param.parameterName}: new ${voca.capitalize(
        operation.type
      )}ImportParameter('${param.originalName}', '${
        param.edmType
      }', ${parameterName}.${param.parameterName})`
  );
  const params = `const params = {\n${paramsLines.join(',\n')}\n};`;

  let parameters = getRequestBuilderArgumentsBase(operation, service);
  if (operation.type === 'function' && service.oDataVersion === 'v2') {
    parameters = [`'${operation.httpMethod}'`, ...parameters];
  }

  const returnStatement = `return new ${requestBuilderName}(${parameters.join(
    ', '
  )});`;

  return `${params}\n\n${returnStatement}`;
}
