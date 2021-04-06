import { EOL } from 'os';
import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import { caps } from '@sap-cloud-sdk/util';
import { VdmFunctionImport, VdmServiceMetadata } from '../vdm-types';
import { getRequestBuilderArgumentsBase } from './request-builder-arguments';
const parameterName = 'parameters';

export function functionImportFunction(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
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
    returnType: `FunctionImportRequestBuilder${caps(service.oDataVersion)}<${
      functionImport.parametersTypeName
    }, ${functionImport.returnType.returnType}${
      functionImport.returnType.isCollection ? '[]' : ''
    }>`,

    statements: getFunctionImportStatements(functionImport, service),
    docs: [
      [
        `${functionImport.description}${EOL}`,
        '@param parameters - Object containing all parameters for the function import.',
        '@returns A request builder that allows to overwrite some of the values and execute the resultng request.'
      ].join(EOL)
    ]
  };
}

function getFunctionImportStatements(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): string {
  const context = functionImport.parameters
    ? functionImport.parameters.reduce((cumulator, currentParameters) => {
        if (cumulator !== 'const params = {'+EOL) {
          cumulator += ','+EOL;
        }
        cumulator += `${currentParameters.parameterName}: new FunctionImportParameter('${currentParameters.originalName}', '${currentParameters.edmType}', ${parameterName}.${currentParameters.parameterName})`;
        return cumulator;
      }, 'const params = {'+EOL) + EOL+'}'
    : '{}';

  let parameters = getRequestBuilderArgumentsBase(functionImport, service);
  if (service.oDataVersion === 'v2') {
    parameters = [`'${functionImport.httpMethod}'`, ...parameters];
  }

  const returnStatement = `return new FunctionImportRequestBuilder${caps(
    service.oDataVersion
  )}(${parameters.join(', ')});`;

  return context + EOL+EOL + returnStatement;
}
