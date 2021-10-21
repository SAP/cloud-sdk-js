/* eslint-disable valid-jsdoc */

import { edmToTs, tsToEdm } from '../payload-value-converter';
import {
  EdmTypeShared,
  UriConverter,
  uriConvertersCommon
} from '@sap-cloud-sdk/odata-common';
import { EdmType } from '../edm-types';

type UriConverterMapping = { [key in EdmType]: (value: any) => string };
/**
 * @hidden
 */
export const uriConverters: UriConverterMapping = {
  ...uriConvertersCommon,
  'Edm.DateTime': value =>
    `datetime'${edmToTs(value, 'Edm.DateTime')
      .toISOString()
      .replace(/Z$/, '')}'`,
  'Edm.DateTimeOffset': value =>
    `datetimeoffset'${edmToTs(value, 'Edm.DateTimeOffset').toISOString()}'`,
  'Edm.Decimal': value => `${value}M`,
  'Edm.Time': value => `time'${value}'`,
  'Edm.Guid': value => `guid'${value}'`
};
/**
 * @hidden
 */
export const uriConverter: UriConverter = {
  convertToUriFormat(value: any, edmType: EdmTypeShared<'v2'>): string {
    const converted = tsToEdm(value, edmType);
    const uriConverterFunc = uriConverters[edmType];
    if (uriConverterFunc) {
      return uriConverterFunc(converted);
    }
    return converted;
  }
};

export { uriConverter as uriConverterV2, uriConverters as uriConvertersV2 };
