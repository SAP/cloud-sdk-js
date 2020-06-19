/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MapType } from '@sap-cloud-sdk/util';

export function extractODataETag(json: MapType<any>): string | undefined {
  return '__metadata' in json ? json['__metadata']['etag'] : undefined;
}
