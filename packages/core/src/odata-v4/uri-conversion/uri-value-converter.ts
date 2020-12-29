/* eslint-disable valid-jsdoc */

import { identity } from '@sap-cloud-sdk/util';
import { tsToEdm } from '../payload-value-converter';
import {
  convertToUriForEdmString,
  uriConvertersCommon,
  EdmTypeShared,
  UriConverter
} from '../../odata-common';
import { EdmType } from '../edm-types';

type UriConverterMapping = { [key in EdmType]: (value: any) => string };
/**
 * @hidden
 */
export const uriConvertersV4: UriConverterMapping = {
  ...uriConvertersCommon,
  'Edm.Date': identity,
  'Edm.DateTimeOffset': identity,
  'Edm.TimeOfDay': identity,
  'Edm.Decimal': value => String(value),
  'Edm.Duration': value => `duration'${value}'`,
  'Edm.Guid': identity,
  'Edm.Enum': value => convertToUriForEdmString(value)
};
/**
 * @hidden
 */
export const uriConverterV4: UriConverter = {
  convertToUriFormat(value: any, edmType: EdmTypeShared<'v4'>): string {
    const converted = tsToEdm(value, edmType);
    const uriConverterFunc = uriConvertersV4[edmType];
    if (uriConverterFunc) {
      return uriConverterFunc(converted);
    }
    return converted;
  }
};
