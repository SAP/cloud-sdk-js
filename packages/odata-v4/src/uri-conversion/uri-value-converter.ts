/* eslint-disable valid-jsdoc */

import { EdmTypeShared, UriConverter } from '@sap-cloud-sdk/odata-common';
import { tsToEdm } from '../de-serializers/payload-value-converter';
import { defaultDeSerializers } from '../de-serializers/default-de-serializers';

export const uriConverter: UriConverter = {
  convertToUriFormat(value: any, edmType: EdmTypeShared<'v4'>): string {
    const { serializeToUri, ...deSerializer } = defaultDeSerializers[edmType];
    if (serializeToUri) {
      return serializeToUri(value, deSerializer);
    }
    return tsToEdm(value, edmType);
  }
};
