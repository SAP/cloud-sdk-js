import { VdmServiceMetadata } from '../vdm-types';
import { getLinks } from './links';
import type {
  GenerationAndUsage,
  InstructionWithText
} from './sdk-metadata-types';
import { genericGetAllCodeSample } from './code-samples/generic-get-all-code-sample';
import { getGeneratorVersion } from './pregenerated-lib';

export const generatorRepositoryLink =
  'https://www.npmjs.com/package/@sap-cloud-sdk/generator';

export async function getGenerationAndUsage(service: VdmServiceMetadata){
  return {
    genericUsage: await getGenericUsage(),
    apiSpecificUsage: await getApiSpecificUsage(service),
    links: getLinks(),
    generationSteps: getGenerationSteps(),
    generatorVersion: getGeneratorVersion(),
    generatorRepositoryLink
  };
}

export async function getGenericUsage(): Promise<InstructionWithText> {
  return {
    instructions: genericGetAllCodeSample(
      'BusinessPartner',
      '@sap/cloud-sdk-vdm-business-partner-service'
    ),
    text:
      'Find a generic example on how to execute requests with the SAP Cloud SDK below.'
  };
}

export const apiSpecificUsageText = 'Find a usage example for this API below.';
export async function getApiSpecificUsage(
  service: VdmServiceMetadata
): Promise<InstructionWithText> {
  if (service.entities.length > 0) {
    const codeSample = await genericGetAllCodeSample(
      service.entities[0].className,
      service.npmPackageName
    );
    return {
      instructions: codeSample,
      text: apiSpecificUsageText
    };
  }
  // TODO handle cases if no entity is there in the follow up ticket.
  if (service.functionImports.length > 0) {
    return { instructions: '', text: apiSpecificUsageText };
  }
  return { instructions: '', text: apiSpecificUsageText };
}

export const linkGenerationDocumentaion =
  'https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client';

export function getGenerationSteps(): InstructionWithText {
  return {
    instructions: `<ul>
<li>Download the API specification to your local computer.</li>
<li>Install the generator <code>npm install -g @sap-cloud-sdk/generator</code></li>
<li>Execute the generator <code>generate-odata-client --inputDir path/to/service-spec --outputDir path/to/</code></li>
</ul>
The steps above will generate a basic TypeScript client. For additional options like transpiling to JavaScript etc. visit our <a href="${linkGenerationDocumentaion}">documentation.</a>`,
    text: 'Follow the following generation steps to generate the client.'
  };
}
