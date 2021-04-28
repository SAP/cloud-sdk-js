import { VdmServiceMetadata } from '../vdm-types';
import type {
  GenerationAndUsage,
  InstructionWithText,
} from '@sap-cloud-sdk/generator-common';
import {getSdkVersion,
  getLinks,
  apiSpecificUsageText,
  genericUsageText,
  getGenerationSteps} from '@sap-cloud-sdk/generator-common';
import { genericGetAllCodeSample } from './code-samples/generic-get-all-code-sample';

export async function getGenerationAndUsage(
  service: VdmServiceMetadata
): Promise<GenerationAndUsage> {
  return {
    genericUsage: getGenericUsage(),
    apiSpecificUsage: getApiSpecificUsage(service),
    links: getLinks(),
    generationSteps: getGenerationSteps(
      installCommand,
      generateCommand,
      linkGenerationDocumentation
    ),
    generatorVersion: await getSdkVersion(),
    generatorRepositoryLink:
      'https://www.npmjs.com/package/@sap-cloud-sdk/generator'
  };
}

export function getGenericUsage(): InstructionWithText {
  return {
    instructions: genericGetAllCodeSample(
      'BusinessPartner',
      '@sap/cloud-sdk-vdm-business-partner-service'
    ),
    text: genericUsageText
  };
}

export function getApiSpecificUsage(
  service: VdmServiceMetadata
): InstructionWithText {
  if (service.entities.length > 0) {
    const codeSample = genericGetAllCodeSample(
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

const linkGenerationDocumentation =
  'https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client';

const installCommand = 'npm install -g @sap-cloud-sdk/generator';
const generateCommand =
  'generate-odata-client --inputDir path/to/service-spec --outputDir path/to/';
