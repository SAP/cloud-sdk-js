import { codeBlock } from '@sap-cloud-sdk/util';
import voca from 'voca';
import { getApiName } from '../generator-without-ts-morph';
import { getOperationParams } from './code-sample-util';
import type { VdmOperation } from '../vdm-types';
import type { MultiLineText } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function entityCodeSample(
  entityName: string,
  serviceName: string,
  directoryName: string
): MultiLineText {
  return codeBlock`
import { ${voca.decapitalize(
    serviceName
  )} } from './generated/${directoryName}';

const { ${getApiName(entityName)} } = ${voca.decapitalize(serviceName)}();
const resultPromise = ${getApiName(
    entityName
  )}.requestBuilder().getAll().top(5).execute({ destinationName: 'myDestinationName' });

`;
}

/**
 * @internal
 */
export function operationCodeSample(
  operation: VdmOperation,
  packageName: string
): MultiLineText {
  return importsCodeSample(operation, packageName);
}

function importsCodeSample(
  actionFunctionImport: VdmOperation,
  packageName: string
): MultiLineText {
  return codeBlock`
import { ${actionFunctionImport.name}${
    actionFunctionImport.parametersTypeName
      ? `, ${actionFunctionImport.parametersTypeName}`
      : ''
  } } from './generated/${packageName}';

${getParameterCodeSample(actionFunctionImport)}
const resultPromise = ${actionFunctionImport.name}(${
    actionFunctionImport.parametersTypeName ? 'parameter' : ''
  }).execute({ destinationName: 'myDestinationName' });
`;
}

function getParameterCodeSample(functionImport: VdmOperation): string {
  if (functionImport.parameters) {
    return `const parameter: ${
      functionImport.parametersTypeName
    } = ${getOperationParams(functionImport.parameters)};
    `;
  }
  return '';
}
