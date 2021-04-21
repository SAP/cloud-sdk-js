import { unixEOL } from '@sap-cloud-sdk/util';
import { FunctionDeclarationStructure, StructureKind } from 'ts-morph';
import {
  VdmActionImport,
  VdmReturnTypeCategory,
  VdmServiceMetadata
} from '../vdm-types';
import { getRequestBuilderArgumentsBase } from './request-builder-arguments';
import { additionalDocForEntityNotDeserializable } from './function';
const parameterName = 'parameters';

export function actionImportFunction(
  actionImport: VdmActionImport,
  service: VdmServiceMetadata
): FunctionDeclarationStructure {
  const returnType =
    actionImport.returnType.returnTypeCategory ===
    VdmReturnTypeCategory.ENTITY_NOT_DESERIALIZABLE
      ? `Omit<ActionImportRequestBuilder<${actionImport.parametersTypeName}, ${actionImport.returnType.returnType}>, 'execute'>`
      : `ActionImportRequestBuilder<${actionImport.parametersTypeName}, ${
          actionImport.returnType.returnType
        }${actionImport.returnType.isCollection ? '[]' : ''}>`;
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
    returnType,
    statements: getActionImportStatements(actionImport, service),
    docs: [
      [
        getDocDescription(actionImport),
        '@param parameters - Object containing all parameters for the action import.',
        '@returns A request builder that allows to overwrite some of the values and execute the resulting request.'
      ].join(unixEOL)
    ]
  };
}

function getDocDescription(actionImport: VdmActionImport) {
  return `${actionImport.description} ${
    actionImport.returnType.returnTypeCategory ===
    VdmReturnTypeCategory.ENTITY_NOT_DESERIALIZABLE
      ? additionalDocForEntityNotDeserializable
      : ''
  }${unixEOL}`;
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
