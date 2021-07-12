import { removeFileExtension } from '@sap-cloud-sdk/util';
import { getSdkVersion } from './util';
import {
  Client,
  GenerationAndUsage,
  PregeneratedLibrary,
  SdkMetadataHeader,
  ServiceStatus
} from './sdk-metadata-types';

export function getSdkMetadataFileNames(originalFileName: string): {
  clientFileName: string;
  headerFileName: string;
} {
  return {
    clientFileName: `${originalFileName}_CLIENT_JS.json`,
    headerFileName: `${originalFileName}_HEADER.json`
  };
}

export async function sdkMetadataHeader(
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
    language: 'JavaScript',
    serviceStatus: status,
    pregeneratedLibrary,
    generationAndUsage
  };
}

export const sdkMetadataHeaderIntroText =
  'The SAP Cloud SDK is a versatile set of libraries and tools for developers to build applications in a cloud-native way and host them on the SAP Business Technology Platform or other runtimes.';

export const ServiceStatusValues: Record<
  ServiceStatus['status'],
  ServiceStatus
> = {
  certified: {
    status: 'certified',
    statusText: 'API Client available for download',
    statusLongText: 'You can download our pregenerated API client for this API.'
  },
  verified: {
    status: 'verified',
    statusText: 'API Client generation tested but no download available',
    statusLongText:
      'The SAP Cloud SDK team checked for this API that generating a API client works, but no pregenerated client is available. You can generate your own client for this API.'
  },
  unknown: {
    status: 'unknown',
    statusText: 'API Client generation not tested',
    statusLongText:
      'The SAP Cloud SDK team has not tested if generating an API client for this API works. You might try to generate a client for this API if you need one.'
  },
  failed: {
    status: 'failed',
    statusText: 'API Client generation has failed',
    statusLongText:
      'The SAP Cloud SDK team checked for this API if generating a API client works, which has failed. You might try it on your own.'
  }
};
