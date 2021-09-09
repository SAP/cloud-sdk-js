import { removeFileExtension } from '@sap-cloud-sdk/util';
import levenstein from 'fast-levenshtein';
import { getSdkVersion } from './util';
import {
  Client,
  GenerationAndUsage,
  PregeneratedLibrary,
  SdkMetadataHeader,
  ServiceStatus
} from './sdk-metadata-types';

const distanceThreshold = 5;
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

export function getLevenshteinClosest<T>(
  name: string,
  objectsToCheck: T[],
  extractorFn: (x: T) => string
): T | undefined {
  const distBelowThreshold = objectsToCheck.reduce((prev, obj) => {
    const levenshteinDist = getLevenshteinDistance(name, extractorFn(obj));
    if (levenshteinDist < distanceThreshold) {
      return [...prev, { dist: levenshteinDist, obj }];
    }
    return prev;
  }, []);
  if (distBelowThreshold.length > 0) {
    return distBelowThreshold.sort((a, b) => (a.dist < b.dist ? -1 : 1))[0].obj;
  }
}

function getLevenshteinDistance(stringA: string, stringB: string): number {
  return levenstein.get(
    getSanitizedString(stringA),
    getSanitizedString(stringB)
  );
}

function getSanitizedString(text: string): string {
  return text.replace(/[^A-Za-z]/g, '').toLowerCase(); // new RegExp('[^A-Za-z]/g')
}

export const sdkMetadataHeaderIntroText =
  'The SAP Cloud SDK is a versatile set of libraries and tools for developers to build cloud-native applications on the SAP Business Technology Platform. To simplify the consumption of multiple services published on the SAP API Business Hub, the SDK offers code generators for OData and OpenAPI together with pregenerated typed client libraries. These libraries are seamlessly integrated with connectivity, authentication, multi-tenancy, and other abstractions to speed up application development.';

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
      'The SAP Cloud SDK team checked for this API that generating an API client works, but no pregenerated client is available. You can generate your own client for this API.'
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
      'The SAP Cloud SDK team checked for this API if generating an API client works, which has failed. You might try it on your own.'
  }
};
