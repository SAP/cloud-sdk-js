/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import { VdmActionImport, VdmServiceMetadata } from '../vdm-types';
import { getRequestBuilderArgumentsBase } from './request-builder-arguments';

const parameterName = 'parameters';

export function actionImportFunction(
  actionImport: VdmActionImport,
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    name: actionImport.name,
    isExported: true,
    parameters: [
      {
        name: parameterName,
        type: actionImport.parametersTypeName
      }
    ],
    returnType: `ActionImportRequestBuilder<${
      actionImport.parametersTypeName
    }, ${actionImport.returnType.returnType}${
      actionImport.returnType.isCollection ? '[]' : ''
    }>`,

    statements: getActionImportStatements(actionImport, service),
    docs: [
      [
        `${actionImport.description}\n`,
        '@param parameters - Object containing all parameters for the action import.',
        '@returns A request builder that allows to overwrite some of the values and execute the resultng request.'
      ].join('\n')
    ]
  };
}

function getActionImportStatements(
  actionImport: VdmActionImport,
  service: VdmServiceMetadata
): string {
  const context = actionImport.parameters
    ? actionImport.parameters.reduce((cumulator, currentParameters) => {
        if (cumulator !== 'const payload = {\n') {
          cumulator += ',\n';
        }
        cumulator += `${currentParameters.parameterName}: new ActionImportParameter('${currentParameters.originalName}', '${currentParameters.edmType}', ${parameterName}.${currentParameters.parameterName})`;
        return cumulator;
      }, 'const payload = {\n') + '\n}'
    : '{}';

  const parameters = getRequestBuilderArgumentsBase(
    'payload',
    actionImport,
    service
  );
  const returnStatement = `return new ActionImportRequestBuilder(${parameters.join(
    ', '
  )});`;

  return context + '\n\n' + returnStatement;
}
