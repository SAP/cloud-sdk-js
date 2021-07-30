import { caps, unixEOL } from '@sap-cloud-sdk/util';
import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmFunctionImport, VdmServiceMetadata } from '../vdm-types';
import { isEntityNotDeserializable } from '../edmx-to-vdm/common';
import { getRequestBuilderArgumentsBase } from './request-builder-arguments';
import { functionImportReturnType } from './return-type';

const parameterName = 'parameters';

export function functionImportFunction(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const returnType = functionImportReturnType(
    functionImport,
    service.oDataVersion
  );
  return {
    kind: StructureKind.Function,
    name: functionImport.name,
    isExported: true,
    parameters: [
      {
        name: parameterName,
        type: functionImport.parametersTypeName
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
export const additionalDocForEntityNotDeserializable =
  "The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.";

function getDocDescription(functionImport: VdmFunctionImport) {
  return `${functionImport.description} ${
    isEntityNotDeserializable(functionImport.returnType)
      ? additionalDocForEntityNotDeserializable
      : ''
  }${unixEOL}`;
}

function getFunctionImportStatements(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): string {
  const context = functionImport.parameters
    ? functionImport.parameters.reduce((cumulator, currentParameters) => {
        if (cumulator !== `const params = {${unixEOL}`) {
          cumulator += `,${unixEOL}`;
        }
        cumulator += `${currentParameters.parameterName}: new FunctionImportParameter('${currentParameters.originalName}', '${currentParameters.edmType}', ${parameterName}.${currentParameters.parameterName})`;
        return cumulator;
      }, `const params = {${unixEOL}`) + `${unixEOL}}`
    : '{}';

  let parameters = getRequestBuilderArgumentsBase(functionImport, service);
  if (service.oDataVersion === 'v2') {
    parameters = [`'${functionImport.httpMethod}'`, ...parameters];
  }

  const returnStatement = `return new FunctionImportRequestBuilder${caps(
    service.oDataVersion
  )}(${parameters.join(', ')});`;

  return context + unixEOL + unixEOL + returnStatement;
}
