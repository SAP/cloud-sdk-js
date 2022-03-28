import { checkUrlExists } from '@sap-cloud-sdk/util';
import axios from 'axios';
import {
  InstructionWithTextAndHeader,
  PregeneratedLibrary
} from './sdk-metadata-types';

/**
 * @internal
 */
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

/**
 * @internal
 */
export async function getLatestVersionOfNpmPackage(
  npmPackageName: string
): Promise<string> {
  const response = await axios.request<{ version: string }>({
    url: `http://registry.npmjs.org/${npmPackageName}/latest`,
    method: 'GET'
  });
  return response.data.version;
}

/**
 * @internal
 */
export function getInstallationSnippet(
  npmPackageName: string
): InstructionWithTextAndHeader {
  return {
    header: 'Installation',
    instructions: `npm i ${npmPackageName}:latest`,
    text: 'Add this client library as a dependency to your JavaScript project by running the npm command below in the root folder of your project. For more details take a look at our "Getting Started with the SAP Cloud SDK for JavaScript" guide in the "Helpful Links" menu.'
  };
}

/**
 * @internal
 */
export function getRepositoryLink(npmPackageName: string): string {
  return `https://www.npmjs.com/package/${npmPackageName}`;
}

/**
 * @internal
 */
export function getTimeStamp(): string {
  return `/Date(${Date.now()})/`;
}

/**
 * @internal
 */
export async function getPregeneratedLibrary(
  description: string,
  npmPackageName: string
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
      version: await getLatestVersionOfNpmPackage(npmPackageName)
    };
  }
}
