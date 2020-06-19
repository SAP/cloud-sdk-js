/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MapType } from '@sap-cloud-sdk/util';

export function extractODataETag(json: MapType<any>): string | undefined {
  return '@odata.etag' in json ? json['@odata.etag'] : undefined;
}
