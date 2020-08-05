/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
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
    returnType: `FunctionImportRequestBuilder<${
      functionImport.parametersTypeName
    }, ${functionImport.returnType.returnType}${
      functionImport.returnType.isCollection ? '[]' : ''
    }>`,

    statements: getFunctionImportStatements(functionImport, service),
    docs: [
      [
        `${functionImport.description}\n`,
        '@param parameters - Object containing all parameters for the function import.',
        '@returns A request builder that allows to overwrite some of the values and execute the resultng request.'
      ].join('\n')
    ]
  };
}

function getFunctionImportStatements(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): string {
  const context = functionImport.parameters
    ? functionImport.parameters.reduce((cumulator, currentParameters) => {
        if (cumulator !== 'const params = {\n') {
          cumulator += ',\n';
        }
        cumulator += `${currentParameters.parameterName}: new FunctionImportParameter('${currentParameters.originalName}', '${currentParameters.edmType}', ${parameterName}.${currentParameters.parameterName})`;
        return cumulator;
      }, 'const params = {\n') + '\n}'
    : '{}';

  let parameters = getRequestBuilderArgumentsBase(functionImport, service);
  if (service.oDataVersion === 'v2') {
    parameters = [`'${functionImport.httpMethod}'`, ...parameters];
  }

  const returnStatement = `return new FunctionImportRequestBuilder(${parameters.join(
    ', '
  )});`;

  return context + '\n\n' + returnStatement;
}
