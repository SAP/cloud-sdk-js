import { unixEOL } from '@sap-cloud-sdk/util';
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
        `${actionImport.description}${unixEOL}`,
        '@param parameters - Object containing all parameters for the action import.',
        '@returns A request builder that allows to overwrite some of the values and execute the resulting request.'
      ].join(unixEOL)
    ]
  };
}

function getActionImportStatements(
  actionImport: VdmActionImport,
  service: VdmServiceMetadata
): string {
  const context = actionImport.parameters
    ? actionImport.parameters.reduce((cumulator, currentParameters) => {
        if (cumulator !== `const params = {${unixEOL}`) {
          cumulator += `,${unixEOL}`;
        }
        cumulator += `${currentParameters.parameterName}: new ActionImportParameter('${currentParameters.originalName}', '${currentParameters.edmType}', ${parameterName}.${currentParameters.parameterName})`;
        return cumulator;
      }, `const params = {${unixEOL}`) + `${unixEOL}}`
    : '{}';

  const parameters = getRequestBuilderArgumentsBase(actionImport, service);
  const returnStatement = `return new ActionImportRequestBuilder(${parameters.join(
    ', '
  )});`;

  return context + unixEOL + unixEOL + returnStatement;
}
