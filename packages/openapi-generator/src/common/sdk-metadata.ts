import { removeFileExtension } from '@sap-cloud-sdk/util';
import { getSdkVersion } from './util';
import {
  Client,
  GenerationAndUsage,
  PregeneratedLibrary,
  ServiceStatus,
  SdkMetadataHeader
} from './sdk-metadata-types';

export function getSdkMetadataFileNames(
  originalFileName: string
): { clientFileName: string; headerFileName: string } {
  return {
    clientFileName: getClientFileName(originalFileName),
    headerFileName: getHeaderFileName(originalFileName)
  };
}

export async function sdkMetaDataHeader(
  type: 'odata' | 'rest' | 'soap',
  originalFileName: string,
  versionInPackageJson?: string
): Promise<SdkMetadataHeader> {
  return {
    type,
    // For the file name with use the artifact.name from API which should be the unique identifier
    name: removeFileExtension(originalFileName),
    version: await getVersionForClient(versionInPackageJson),
    introText: sdkMetadataHeaderIntroText
  };
}

export async function getVersionForClient(
  versionInPackageJson?: string
): Promise<string> {
  return versionInPackageJson || getSdkVersion();
}

export function getSdkMetadataClient(
  generationAndUsage: GenerationAndUsage,
  pregeneratedLibrary?: PregeneratedLibrary
): Client {
  const status = pregeneratedLibrary
    ? ServiceStatusValues.certified
    : ServiceStatusValues.verified;
  return {
    language: 'javascript',
    serviceStatus: status,
    pregeneratedLibrary,
    generationAndUsage
  };
}

function getClientFileName(serviceFileName: string): string {
  return `${serviceFileName}_CLIENT_JS.json`;
}

function getHeaderFileName(serviceFileName: string): string {
  return `${serviceFileName}_HEADER.json`;
}

const sdkMetadataHeaderIntroText =
  'The SAP Cloud SDK is a versatile set of libraries and tools for developers to build applications in a cloud-native way and host them on the SAP Business Technology Platform or other runtimes.';

const ServiceStatusValues: Record<ServiceStatus['status'], ServiceStatus> = {
  certified: {
    status: 'certified',
    statusText: 'A pre-generated API client exists.',
    gettingStartedText:
      'For this API you have two options to get a typed client. Either you download the pregenerated client from the repository or you generate the client on your own.'
  },
  verified: {
    status: 'verified',
    statusText: 'The generation process for this API works.',
    gettingStartedText:
      'For this API no pregenerated published client exists. Follow the generation steps to create a client on your own.'
  },
  unknown: {
    status: 'unknown',
    statusText: 'No information for this service present.',
    gettingStartedText: ''
  }
};
