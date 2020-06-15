import { MapType } from '@sap-cloud-sdk/util';

export function extractODataETag(json: MapType<any>): string | undefined {
  return '__metadata' in json ? json['__metadata']['etag'] : undefined;
}
