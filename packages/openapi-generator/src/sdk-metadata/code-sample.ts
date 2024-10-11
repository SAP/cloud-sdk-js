import { codeBlock } from '@sap-cloud-sdk/util';
import { getOperationParamCode } from './code-sample-util';
import type { MultiLineText } from '@sap-cloud-sdk/generator-common/internal';
import type { OpenApiOperation } from '../openapi-types';

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
