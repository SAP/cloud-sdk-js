import { codeBlock } from '@sap-cloud-sdk/util';
import {
  InstructionWithText,
  InstructionWithTextAndHeader,
  usageHeaderText
} from '@sap-cloud-sdk/generator-common/internal';
import { VdmActionImport, VdmFunctionImport } from '../vdm-types';
import { getActionFunctionParams } from './code-sample-util';

const instructionsText =
  'To consume the service via the pregenerated typed client library run the code snippet below. For more details about OData client libraries chose "OData Consumption Manual" from the "Helpful Links" menu.';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function entityCodeSample(
  entityName: string,
  packageName: string
): InstructionWithText {
  return {
    text: instructionsText,
    instructions: codeBlock`
import { ${entityName} } from '${packageName}';

const resultPromise = ${entityName}.requestBuilder().getAll().top(5).execute({ destinationName:'myDestinationName' });

`
  };
}
/**
 * @internal
 */
export function genericEntityCodeSample(): InstructionWithTextAndHeader {
  return {
    ...entityCodeSample(
      'BusinessPartner',
      '@sap/cloud-sdk-vdm-business-partner-service'
    ),
    header: usageHeaderText
  };
}
/**
 * @internal
 */
export function functionImportCodeSample(
  functionImport: VdmFunctionImport,
  packageName: string
): InstructionWithText {
  return importsCodeSample(functionImport, packageName);
}
/**
 * @internal
 */
export function actionImportCodeSample(
  actionImport: VdmActionImport,
  packageName: string
): InstructionWithText {
  return importsCodeSample(actionImport, packageName);
}

function importsCodeSample(
  actionFunctionImport: VdmFunctionImport | VdmActionImport,
  packageName: string
): InstructionWithText {
  return {
    text: instructionsText,
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
