import { VdmServiceMetadata } from '../vdm-types';
import { readFileSync } from "fs";
import { resolve } from "path";
import { GeneratorOptions } from '../generator-options';
import { genericDescription, s4hanaCloudDescription } from '../package-description';

export function getInstallationSnippet(service:VdmServiceMetadata){
  return `npm i ${service.npmPackageName}:latest`
}

export function getRepositoryLink(service:VdmServiceMetadata){
  return `https://www.npmjs.com/package/${service.npmPackageName}`
}

function getGeneratorVersion(): string {
  return JSON.parse(readFileSync(resolve(__dirname, '../../package.json'), 'utf8'))
    .version;
}

export function getVersion(options:GeneratorOptions):string{
  return options.versionInPackageJson || getGeneratorVersion()
}

export function getServiceDescription(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): string {
  return options.s4hanaCloud
    ? s4hanaCloudDescription(service.directoryName)
    : genericDescription(service.directoryName);
}

export function isPublishedNpmPackage(service:VdmServiceMetadata):boolean
{

}
