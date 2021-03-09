import { VdmServiceMetadata } from '../vdm-types';
import { Client, GenerationAndUsage, Links, PregeneratedLibrary } from './sdk-metadata-types';
import { getInstallationSnippet, getRepositoryLink, getVersion, getServiceDescription } from './npm';
import { GeneratorOptions } from '../generator-options';

export function sdkMetaDataJS(service: VdmServiceMetadata):Client{
  return {
    language: 'javascript',
    pregeneratedLibrary: getPregeneratedLibrary(),
    generationAndUsage:getGenerationAndUsage()
  }
}

export function sdkMetaDataHeader(service: VdmServiceMetadata):string{
return ''
}

function getPregeneratedLibrary(service: VdmServiceMetadata,options:GeneratorOptions):PregeneratedLibrary{
  return {
    repository:'npm',
    dependencyName:service.npmPackageName,
    installLibrarySnippet:getInstallationSnippet(service),
    repositoryLink:getRepositoryLink(service),
    compatibilityNotes:'',
    description: getServiceDescription(service,options),
    generatedAt: getTimeStamp(),
    version: getVersion(options)
  }
}

function getGenerationAndUsage():GenerationAndUsage{
  return {
    successfulGenerationVerified: true,
    genericUsage:'',
    apiSpecificUsage:'',
    links: getLinks(),
    generationSteps:''
  }
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

function getTimeStamp():string{
  return "XXX to be done"
}
