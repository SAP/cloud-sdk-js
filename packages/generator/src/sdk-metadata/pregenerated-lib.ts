import { readFileSync } from 'fs';
import { resolve } from 'path';
import { executeHttpRequest } from '@sap-cloud-sdk/core';
import { VdmServiceMetadata } from '../vdm-types';
import { GeneratorOptions } from '../generator-options';
import { genericDescription, s4hanaCloudDescription } from '../package-description';
import { PregeneratedLibrary } from './sdk-metadata-types';

export function getInstallationSnippet(service: VdmServiceMetadata): string{
  return `npm i ${service.npmPackageName}:latest`;
}

export function getRepositoryLink(service: VdmServiceMetadata): string{
  return `https://www.npmjs.com/package/${service.npmPackageName}`;
}

export function getGeneratorVersion(): string {
  return JSON.parse(readFileSync(resolve(__dirname, '../../package.json'), 'utf8'))
    .version;
}

export function getVersionForClient(options: GeneratorOptions): string{
  return options.versionInPackageJson || getGeneratorVersion();
}

export function getServiceDescription(
  service: VdmServiceMetadata,
  options: GeneratorOptions
): string {
  return options.s4hanaCloud
    ? s4hanaCloudDescription(service.directoryName)
    : genericDescription(service.directoryName);
}

export function getTimeStamp(): string{
  return `/Date(${new Date().getTime()})/`;
}

export async function isPublishedNpmPackage(service: VdmServiceMetadata): Promise<boolean>{
  try{
    await executeHttpRequest({ url:'http://registry.npmjs.org/' },{ method: 'get',url:service.npmPackageName });
    return true;
  }catch (e) {
    return false;
  }
}

export async function getPregeneratedLibrary(service: VdmServiceMetadata,options: GeneratorOptions): Promise<PregeneratedLibrary|undefined>{
  if(await isPublishedNpmPackage(service)){
    return {
      repository:'npm',
      dependencyName:service.npmPackageName,
      installLibrarySnippet:getInstallationSnippet(service),
      repositoryLink:getRepositoryLink(service),
      compatibilityNotes:'',
      description: getServiceDescription(service,options),
      generatedAt: getTimeStamp(),
      version: getVersionForClient(options)
    };
  }
}
