/* eslint-disable valid-jsdoc */

import { EdmTypeShared, UriConverter } from '@sap-cloud-sdk/odata-common';
import { defaultDeSerializers } from '../de-serializers/default-de-serializers';
import { tsToEdm } from '../de-serializers/payload-value-converter';

/**
 * @internal
 */
export const uriConverter: UriConverter = {
  convertToUriFormat(value: any, edmType: EdmTypeShared<'v2'>): string {
    const { serializeToUri, ...deSerializer } = defaultDeSerializers[edmType];
    if (serializeToUri) {
      return serializeToUri(value, deSerializer);
    }
    return tsToEdm(value, edmType);
  }
};
