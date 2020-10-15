/* eslint-disable valid-jsdoc */

import { tsToEdmV4 } from '../payload-value-converter';
import { EdmTypeShared, UriConverter } from '../../common';
import {
  convertToUriForEdmString,
  uriConvertersCommon
} from '../../common/uri-conversion/uri-value-converter';
import { EdmTypeV4 } from '../edm-types';

type UriConverterMapping = { [key in EdmTypeV4]: (value: any) => string };
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
    const converted = tsToEdmV4(value, edmType);
    const uriConverterFunc = uriConvertersV4[edmType];
    if (uriConverterFunc) {
      return uriConverterFunc(converted);
    }
    return converted;
  }
};
