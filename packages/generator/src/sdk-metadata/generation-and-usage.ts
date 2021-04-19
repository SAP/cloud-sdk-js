import { VdmServiceMetadata } from '../vdm-types';
import { getLinks } from './links';
import { GenerationAndUsage, InstructionWithText } from './sdk-metadata-types';
import { genericGetAllCodeSample } from './code-samples/generic-get-all-code-sample';
import { getGeneratorVersion } from './pregenerated-lib';

export const genericUsageText =
  'Find below a generic example on execute request with the SDK.';

export async function getGenerationAndUsage(
  service: VdmServiceMetadata
): Promise<GenerationAndUsage> {
  return {
    genericUsage: await getGenericUsage(),
    apiSpecificUsage: await getApiSpecificUsage(service),
    links: getLinks(),
    generationSteps: getGenerationSteps(),
    generatorVersion: getGeneratorVersion(),
    generatorRepositoryLink:
      'https://www.npmjs.com/package/@sap-cloud-sdk/generator'
  };
}

export async function getGenericUsage(): Promise<
  InstructionWithText<typeof genericUsageText>
> {
  return {
    instructions: genericGetAllCodeSample(
      'BusinessPartner',
      '@sap/cloud-sdk-vdm-business-partner-service'
    ),
    text: genericUsageText
  };
}

export const apiSpecificUsageText = 'Find below a usage example for this API.';
export async function getApiSpecificUsage(
  service: VdmServiceMetadata
): Promise<InstructionWithText<typeof apiSpecificUsageText>> {
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

export const generationStepsText =
  'Follow the following generation steps to generate the client.';
export function getGenerationSteps(): InstructionWithText<
  typeof generationStepsText
> {
  return {
    instructions: `<ul>
<li>Download the API specification to your local computer.</li>
<li>Install the generator <code>npm install -g @sap-cloud-sdk/generator</code></li>
<li>Execute the generator <code>generate-odata-client --inputDir path/to/service-spec --outputDir path/to/</code></li>
</ul>
The steps above will generate a basic TypeScript client. For additional options like transpiling to JavaScript etc. visit our <a href="${linkGenerationDocumentaion}">documentation.</a>`,
    text: generationStepsText
  };
}
