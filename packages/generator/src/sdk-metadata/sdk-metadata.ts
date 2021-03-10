import { VdmServiceMetadata } from '../vdm-types';
import { Client, GenerationAndUsage, Links, PregeneratedLibrary } from './sdk-metadata-types';
import {
  getInstallationSnippet,
  getRepositoryLink,
  getVersion,
  getServiceDescription,
  getTimeStamp,
  getPregeneratedLibrary
} from './pregenerated-lib';
import { GeneratorOptions } from '../generator-options';

export async function sdkMetaDataJS(service: VdmServiceMetadata,options:GeneratorOptions):Client{
  return {
    language: 'javascript',
    pregeneratedLibrary: await getPregeneratedLibrary(service,options),
    generationAndUsage:getGenerationAndUsage()
  }
}

export function sdkMetaDataHeader(service: VdmServiceMetadata):string{
return ''
}





function getLinks():Links{
  return {
    apiHubTutorial:'',
    support:'',
    featureDocumentation:'',
    generationManual:'',
    sdkDocumentation:''
  }
}

