import { caps, unixEOL } from '@sap-cloud-sdk/util';
import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import {
  VdmFunctionImport,
  VdmReturnTypeCategory,
  VdmServiceMetadata
} from '../vdm-types';
import { getRequestBuilderArgumentsBase } from './request-builder-arguments';

const parameterName = 'parameters';

export function functionImportFunction(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const returnType =
    functionImport.returnType.returnTypeCategory ===
    VdmReturnTypeCategory.ENTITY_NOT_DESERIALIZABLE
      ? `Omit<FunctionImportRequestBuilder${caps(service.oDataVersion)}<${
          functionImport.parametersTypeName
        }, ${functionImport.returnType.returnType}>, 'execute'>`
      : `FunctionImportRequestBuilder${caps(service.oDataVersion)}<${
          functionImport.parametersTypeName
        }, ${functionImport.returnType.returnType}${
          functionImport.returnType.isCollection ? '[]' : ''
        }>`;
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
    functionImport.returnType.returnTypeCategory ===
    VdmReturnTypeCategory.ENTITY_NOT_DESERIALIZABLE
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
