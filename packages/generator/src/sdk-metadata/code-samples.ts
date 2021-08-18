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
