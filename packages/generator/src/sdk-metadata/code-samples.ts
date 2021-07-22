import { codeBlock } from '@sap-cloud-sdk/util';
import {
  InstructionWithText,
  InstructionWithTextAndHeader,
  usageHeaderText
} from '@sap-cloud-sdk/generator-common';

export function codeSamples(
  entityName: string,
  packageName: string
): InstructionWithText {
  return {
    text: `In the example below you query the top 5 entities of the  <code>${entityName} </code> type.`,
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
