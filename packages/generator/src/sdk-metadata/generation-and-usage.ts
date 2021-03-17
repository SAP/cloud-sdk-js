import { promises } from 'fs';
import { resolve } from 'path';
import { render } from 'mustache';
import { VdmServiceMetadata } from '../vdm-types';
import { getLinks } from './links';
import { GenerationAndUsage } from './sdk-metadata-types';

export async function getGenerationAndUsage(service: VdmServiceMetadata): Promise<GenerationAndUsage>{
  return {
    successfulGenerationVerified: true,
    genericUsage: await getGenericUsage(),
    apiSpecificUsage:await getApiSpecificUsage(service),
    links: getLinks(),
    generationSteps:getGenerationDocumentation()
  };
}

async function readGeneticGetAllCodeSample(): Promise<string>{
  return promises.readFile(resolve(__dirname,'code-samples','generic-get-all-code-sample.mustache'),{ encoding:'utf8' });
}

export async function getGenericUsage(): Promise<string>{
  const file =  await readGeneticGetAllCodeSample();
  return render(file,{ EntityName:'BusinessPartner',PackageName:'@sap/cloud-sdk-vdm-business-partner-service' });
}

export async function getApiSpecificUsage(service: VdmServiceMetadata): Promise<string>{
  const file =  await readGeneticGetAllCodeSample();

  if(service.entities.length > 0){
    const genericString = (await getGenericUsage());
    return render(file,{ EntityName:service.entities[0].className,PackageName:service.npmPackageName });
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
