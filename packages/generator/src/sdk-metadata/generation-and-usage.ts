import { GenerationAndUsage } from './sdk-metadata-types';
import { getLinks } from './links';
import {promises} from 'fs'
import {resolve} from 'path'
import { VdmServiceMetadata } from '../vdm-types';

export async function getGenerationAndUsage(service:VdmServiceMetadata):Promise<GenerationAndUsage>{
  return {
    successfulGenerationVerified: true,
    genericUsage: await getGenericUsage(),
    apiSpecificUsage:'',
    links: getLinks(),
    generationSteps:''
  }
}

export async function getGenericUsage():Promise<string>{
  return promises.readFile(resolve(__dirname,'generic-get-all-code-sample.ts'),{encoding:'utf8'})
}

export async function getApiSpecificUsage(service:VdmServiceMetadata):Promise<string>{
  if(service.entities.length > 0){
    const genericString = (await getGenericUsage())
    const f00 =  "genericString TestEntity".replace('TestEntity',service.entities[0].className)
      return f00.replace('@sap-cloud-sdk/test-services/v2/test-service',service.npmPackageName)
  }
  return ''
}
