import { VdmServiceMetadata } from '../vdm-types';
import { getLinks } from './links';
import { GenerationAndUsage } from './sdk-metadata-types';
import { genericGetAllCodeSample } from './code-samples/generic-get-all-code-sample';

export async function getGenerationAndUsage(service: VdmServiceMetadata): Promise<GenerationAndUsage>{
  return {
    successfulGenerationVerified: true,
    genericUsage: await getGenericUsage(),
    apiSpecificUsage:await getApiSpecificUsage(service),
    links: getLinks(),
    generationSteps:getGenerationDocumentation()
  };
}

export async function getGenericUsage(): Promise<string>{
  return genericGetAllCodeSample('BusinessPartner','@sap/cloud-sdk-vdm-business-partner-service');
}

export async function getApiSpecificUsage(service: VdmServiceMetadata): Promise<string>{
  if(service.entities.length > 0){
    return genericGetAllCodeSample(service.entities[0].className,service.npmPackageName);
  }
  // TODO handle cases if no entity is there in the follow up ticket.
  if(service.functionImports.length > 0){
    return '';
  }
  return '';
}

export const linkGenerationDocumentaion = 'https://sap.github.io/cloud-sdk/docs/js/features/odata/generate-odata-client';

export function getGenerationDocumentation(): string{
  return `Please follow the documentation ${linkGenerationDocumentaion}`;
}
