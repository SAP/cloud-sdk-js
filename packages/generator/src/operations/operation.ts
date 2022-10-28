import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import voca from 'voca';
import { VdmOperation, VdmServiceMetadata } from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { getRequestBuilderArgumentsBase } from './request-builder-arguments';
import { operationReturnType } from './return-type';

const parameterName = 'parameters';

/**
 * @internal
 * Returns a function declaration representation for an action or function.
 */
export function operationFunction(
  operation: VdmOperation,
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const returnType = operationReturnType(operation);
  return {
    kind: StructureKind.Function,
    name: `${operation.name}<DeSerializersT extends DeSerializers = DefaultDeSerializers>`,
    isExported: true,
    parameters: [
      {
        name: parameterName,
        type: `${operation.parametersTypeName}<DeSerializersT>`
      },
      {
        name: 'deSerializers',
        type: 'DeSerializersT',
        initializer: 'defaultDeSerializers as any'
      }
    ],
    returnType,
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

  const returnStatement = `return new ${voca.capitalize(
    operation.type
  )}ImportRequestBuilder(${parameters.join(', ')});`;

  return `${params}\n\n${returnStatement}`;
}
