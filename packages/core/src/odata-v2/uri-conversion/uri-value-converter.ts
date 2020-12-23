/* eslint-disable valid-jsdoc */

import { edmToTsV2, tsToEdmV2 } from '../payload-value-converter';
import {
  EdmTypeShared,
  UriConverter,
  uriConvertersCommon
} from '../../odata-common';
import { EdmType } from '../edm-types';

type UriConverterMapping = { [key in EdmType]: (value: any) => string };
/**
 * @hidden
 */
export const uriConvertersV2: UriConverterMapping = {
  ...uriConvertersCommon,
  'Edm.DateTime': value =>
    `datetime'${edmToTsV2(value, 'Edm.DateTime')
      .toISOString()
      .replace(/Z$/, '')}'`,
  'Edm.DateTimeOffset': value =>
    `datetimeoffset'${edmToTsV2(value, 'Edm.DateTimeOffset').toISOString()}'`,
  'Edm.Decimal': value => `${value}M`,
  'Edm.Time': value => `time'${value}'`,
  'Edm.Guid': value => `guid'${value}'`
};
/**
 * @hidden
 */
export const uriConverterV2: UriConverter = {
  convertToUriFormat(value: any, edmType: EdmTypeShared<'v2'>): string {
    const converted = tsToEdmV2(value, edmType);
    const uriConverterFunc = uriConvertersV2[edmType];
    if (uriConverterFunc) {
      return uriConverterFunc(converted);
    }
    return converted;
  }
};
