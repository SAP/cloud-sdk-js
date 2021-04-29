import { checkUrlExists } from '@sap-cloud-sdk/util';
import { InstructionWithText, PregeneratedLibrary } from './metadata-types';
import { getVersionForClient } from './metadata';

export async function isPublishedNpmPackage(
  npmPackageName: string
): Promise<boolean> {
  try {
    await checkUrlExists(`http://registry.npmjs.org/${npmPackageName}`);
    return true;
  } catch (e) {
    return false;
  }
}

export function getInstallationSnippet(
  npmPackageName: string
): InstructionWithText {
  return {
    instructions: `npm i ${npmPackageName}:latest`,
    text:
      'Execute the following npm command to install the pregenerated client.'
  };
}

export function getRepositoryLink(npmPackageName: string): string {
  return `https://www.npmjs.com/package/${npmPackageName}`;
}

export function getTimeStamp(): string {
  return `/Date(${Date.now()})/`;
}

export async function getPregeneratedLibrary(
  description: string,
  npmPackageName: string,
  versionInPackageJson?: string
): Promise<PregeneratedLibrary | undefined> {
  if (await isPublishedNpmPackage(npmPackageName)) {
    return {
      repository: 'npm',
      dependencyName: npmPackageName,
      installLibrarySteps: getInstallationSnippet(npmPackageName),
      repositoryLink: getRepositoryLink(npmPackageName),
      compatibilityNotes: '',
      description,
      generatedAt: getTimeStamp(),
      version: await getVersionForClient(versionInPackageJson)
    };
  }
}
