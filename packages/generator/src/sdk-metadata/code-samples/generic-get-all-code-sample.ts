import { codeBlock } from '@sap-cloud-sdk/util';

export function genericGetAllCodeSample(
  entityName: string,
  packageName: string
): string {
  return codeBlock`
import { ${entityName} } from '${packageName}';

const resultPromise = ${entityName}.requestBuilder().getAll().top(5).execute({ destinationName:'myDestinationName' });

`;
}
