import { codeBlock } from '@sap-cloud-sdk/util';
import {
  InstructionWithText,
  InstructionWithTextAndHeader,
  usageHeaderText
} from '@sap-cloud-sdk/generator-common';
import { VdmActionImport, VdmFunctionImport, VdmParameter } from '../vdm-types';

export function codeSamples(
  entityName: string,
  packageName: string
): InstructionWithText {
  return {
    text: 'To consume the service via the pregenerated typed client library run the code snippet below. For more details about OData client libraries chose "OData Consumption Manual" from the "Helpful Links" menu.',
    instructions: codeBlock`
import { ${entityName} } from '${packageName}';

const resultPromise = ${entityName}.requestBuilder().getAll().top(5).execute({ destinationName:'myDestinationName' });

`
  };
}

export function genericCodeSample(): InstructionWithTextAndHeader {
  return {
    ...codeSamples(
      'BusinessPartner',
      '@sap/cloud-sdk-vdm-business-partner-service'
    ),
    header: usageHeaderText
  };
}

export function importsCodeSample(
  actionFunctionImport: VdmFunctionImport | VdmActionImport,
  packageName: string
): InstructionWithText {
  return {
    text: 'To consume the service via the pregenerated typed client library run the code snippet below. For more details about OData client libraries chose "OData Consumption Manual" from the "Helpful Links" menu.',
    instructions: codeBlock`
import { ${actionFunctionImport.name}${
      actionFunctionImport.parametersTypeName
        ? `, ${actionFunctionImport.parametersTypeName}`
        : ''
    } } from '${packageName}';

${getParameterCodeSample(actionFunctionImport)}
const resultPromise = ${actionFunctionImport.name}(${
      actionFunctionImport.parametersTypeName ? 'parameter' : ''
    }).execute({ destinationName:'myDestinationName' });
`
  };
}

function getParameterCodeSample(functionImport: VdmFunctionImport): string {
  if (functionImport.parameters) {
    return `const parameter: ${
      functionImport.parametersTypeName
    } = ${getActionFunctionParams(functionImport.parameters)};
    `;
  }
  return '';
}

function getActionFunctionParams(parameters: VdmParameter[]): string {
  const paramString = Object.entries(parameters || [])
    .slice(0, 2)
    .reduce(
      (cumulator, currentParam) =>
        `${cumulator}, ${currentParam[1].parameterName}: '${currentParam[1].parameterName}'`,
      ''
    );
  return `{${paramString.substring(1)}${
    parameters.length > 2 ? ', ...' : ''
  } }`;
}
