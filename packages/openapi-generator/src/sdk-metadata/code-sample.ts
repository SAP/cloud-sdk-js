import { codeBlock } from '@sap-cloud-sdk/util';
import { MultiLineText } from '@sap-cloud-sdk/generator-common/internal';
import { OpenApiOperation } from '../openapi-types';
import { getOperationParamCode } from './code-sample-util';

/**
 * @internal
 */
export function apiSpecificCodeSample(
  apiName: string,
  operation: OpenApiOperation,
  directoryName: string
): MultiLineText {
  return codeBlock`
import { ${apiName} } from './generated/${directoryName}';

const responseData = await ${apiName}.${
    operation.operationId
  }(${getOperationParamCode(
    operation
  )}).execute({ destinationName: 'myDestinationName' });
`;
}
