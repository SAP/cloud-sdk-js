/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import {
  VdmFunctionImport,
  VdmServiceMetadata
} from '../vdm-types';
import { responseTransformerFunctionName } from './response-transformer-function';

const parameterName = 'parameters';

export function functionImportFunction(
  functionImport: VdmFunctionImport,
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    name: functionImport.functionName,
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

  const returnStatement = `return new FunctionImportRequestBuilder('${
    functionImport.httpMethod
  }', '${service.servicePath}', '${
    functionImport.originalName
  }', (data) => ${responseTransformerFunctionName(
    functionImport.returnType
  )}(data, ${functionImport.returnType.builderFunction}), params);`;

  return context + '\n\n' + returnStatement;
}
