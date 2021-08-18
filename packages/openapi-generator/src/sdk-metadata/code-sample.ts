import { codeBlock } from '@sap-cloud-sdk/util';
import { InstructionWithText } from '@sap-cloud-sdk/generator-common';

export function genericCodeSample(): InstructionWithText {
  return apiSpecificCodeSample('MyApi', 'myFunction', 'my-npm-package');
}

export function apiSpecificCodeSample(
  apiName: string,
  functionName: string,
  packageName: string
): InstructionWithText {
  return {
    text: 'To consume the service via the pregenerated typed client library run the code snippet below. For more details about OData client libraries chose "OData Consumption Manual" from the "Helpful Links" menu.',
    instructions: codeBlock`
import { ${apiName} } from '${packageName}';

const responseData = await ${apiName}.${functionName}().execute({ destinationName:'myDestinationName' });
`
  };
}
