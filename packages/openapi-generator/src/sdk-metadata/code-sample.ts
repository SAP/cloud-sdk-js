import { codeBlock } from '@sap-cloud-sdk/util';

export function genericCodeSample(): string {
  return apiSpecificCodeSample('MyApi', 'myFunction', 'my-npm-package');
}

export function apiSpecificCodeSample(
  apiName: string,
  functionName: string,
  packageName: string
): string {
  return codeBlock`
import { ${apiName} } from '${packageName}';

const responseData = await ${apiName}.${functionName}().execute({ destinationName:'myDestinationName' });
`;
}
