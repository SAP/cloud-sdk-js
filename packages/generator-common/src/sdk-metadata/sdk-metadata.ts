import levenstein from 'fast-levenshtein';
import { getSdkVersion } from './util';
import { Client, MultiLineText, ServiceStatus } from './sdk-metadata-types';

const distanceThreshold = 5;

/**
 * @internal
 */
export function getSdkMetadataFileNames(originalFileName: string): {
  clientFileName: string;
} {
  return {
    clientFileName: `${originalFileName}_CLIENT_JS.json`
  };
}

/**
 * @internal
 */
export async function getVersionForClient(
  versionInPackageJson?: string
): Promise<string> {
  return versionInPackageJson || getSdkVersion();
}
/**
 * @internal
 */
export async function getSdkMetadataClient(
  apiSpecificUsage: MultiLineText,
  generatorVersion: string,
  apiType: 'OData' | 'OpenAPI'
): Promise<Client> {
  const status = ServiceStatusValues.verified.status;
  return {
    apiType,
    language: 'JavaScript',
    serviceStatus: status,
    generatorVersion,
    apiSpecificUsage
  };
}
/**
 * Gets the closest matching object using Levenshtein distance algorithm.
 * @param name - Name of the service or api class.
 * @param objectsToCheck - List of objects, e.g. VdmEntity, FunctionImports, etc.
 * @param extractorFn - Function to get the object's property to match against name.
 * @returns - closest matched object or undefined if not found.
 * @internal
 */
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
  return text.replace(/[^A-Za-z]/g, '').toLowerCase();
}

/**
 * @internal
 */
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
