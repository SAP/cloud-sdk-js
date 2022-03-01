import { unixEOL } from '@sap-cloud-sdk/util';
import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmFunctionImport, VdmServiceMetadata } from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { getRequestBuilderArgumentsBase } from './request-builder-arguments';
import { functionImportReturnType } from './return-type';

const parameterName = 'parameters';

/**
 * @internal
 */
export function functionImportFunction(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const returnType = functionImportReturnType(functionImport);
  return {
    kind: StructureKind.Function,
    name: `${functionImport.name}<DeSerializersT extends DeSerializers = DefaultDeSerializers>`,
    isExported: true,
    parameters: [
      {
        name: parameterName,
        type: `${functionImport.parametersTypeName}<DeSerializersT>`
      },
      {
        name: 'deSerializers',
        type: 'DeSerializersT',
        initializer: 'defaultDeSerializers as any'
      }
    ],
    returnType,
    statements: getFunctionImportStatements(functionImport, service),
    docs: [
      [
        getDocDescription(functionImport),
        '@param parameters - Object containing all parameters for the function import.',
        '@returns A request builder that allows to overwrite some of the values and execute the resulting request.'
      ].join(unixEOL)
    ]
  };
}
/**
 * @internal
 */
export const additionalDocForEntityNotDeserializable =
  "The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.";

function getDocDescription(functionImport: VdmFunctionImport) {
  return `${functionImport.description} ${
    isEntityNotDeserializable(functionImport.returnType)
      ? additionalDocForEntityNotDeserializable
      : ''
  }`;
}

function getFunctionImportStatements(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): string {
  const paramsLines = (functionImport.parameters || []).map(
    param =>
      `${param.parameterName}: new FunctionImportParameter('${param.originalName}', '${param.edmType}', ${parameterName}.${param.parameterName})`
  );
  const params = `const params = {\n${paramsLines.join(',\n')}\n};`;

  let parameters = getRequestBuilderArgumentsBase(functionImport, service);
  if (service.oDataVersion === 'v2') {
    parameters = [`'${functionImport.httpMethod}'`, ...parameters];
  }

  const returnStatement = `return new FunctionImportRequestBuilder(${parameters.join(
    ', '
  )});`;

  return [params, '\n', returnStatement].join('\n');
}
