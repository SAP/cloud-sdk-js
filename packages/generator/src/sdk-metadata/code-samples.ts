import { codeBlock } from '@sap-cloud-sdk/util';
import { MultiLineText } from '@sap-cloud-sdk/generator-common/internal';
import voca from 'voca';
import { VdmActionImport, VdmFunctionImport } from '../vdm-types';
import { getApiName } from '../generator-without-ts-morph/service';
import { getActionFunctionParams } from './code-sample-util';

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
export function functionImportCodeSample(
  functionImport: VdmFunctionImport,
  packageName: string
): MultiLineText {
  return importsCodeSample(functionImport, packageName);
}
/**
 * @internal
 */
export function actionImportCodeSample(
  actionImport: VdmActionImport,
  packageName: string
): MultiLineText {
  return importsCodeSample(actionImport, packageName);
}

function importsCodeSample(
  actionFunctionImport: VdmFunctionImport | VdmActionImport,
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

function getParameterCodeSample(functionImport: VdmFunctionImport): string {
  if (functionImport.parameters) {
    return `const parameter: ${
      functionImport.parametersTypeName
    } = ${getActionFunctionParams(functionImport.parameters)};
    `;
  }
  return '';
}
