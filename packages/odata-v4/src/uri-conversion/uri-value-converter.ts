/* eslint-disable valid-jsdoc */

import { identity } from '@sap-cloud-sdk/util';
import {
  uriConvertersCommon,
  EdmTypeShared,
  UriConverter,
  convertToUriForEdmString
} from '@sap-cloud-sdk/odata-common';
import { tsToEdm } from '../payload-value-converter';
import { EdmType } from '../edm-types';

type UriConverterMapping = { [key in EdmType]: (value: any) => string };
/**
 * @internal
 */
export const uriConverters: UriConverterMapping = {
  ...uriConvertersCommon,
  'Edm.Date': identity,
  'Edm.DateTimeOffset': identity,
  'Edm.TimeOfDay': identity,
  'Edm.Decimal': value => String(value),
  'Edm.Duration': value => `duration'${value}'`,
  'Edm.Guid': identity,
  'Edm.Enum': value => convertToUriForEdmString(value)
};

export const uriConverter: UriConverter = {
  convertToUriFormat(value: any, edmType: EdmTypeShared<'v4'>): string {
    const converted = tsToEdm(value, edmType);
    const uriConverterFunc = uriConverters[edmType];
    if (uriConverterFunc) {
      return uriConverterFunc(converted);
    }
    return converted;
  }
};
