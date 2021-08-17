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
    text: `In the example below you execute the  '{functionName}' of the  '${apiName}' API.`,
    instructions: codeBlock`
import { ${apiName} } from '${packageName}';

const responseData = await ${apiName}.${functionName}().execute({ destinationName:'myDestinationName' });
`
  };
}
