/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable valid-jsdoc */

import { edmToTsV2, tsToEdm } from '../payload-value-converter';
import { EdmTypeShared, UriConverter } from '../../common';
import { uriConvertersCommon } from '../../common/uri-conversion/uri-value-converter';
import { EdmTypeV2 } from '../edm-types';

type UriConverterMapping = { [key in EdmTypeV2]: (value: any) => string };
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
    const converted = tsToEdm(value, edmType);
    const uriConverterFunc = uriConvertersV2[edmType];
    if (uriConverterFunc) {
      return uriConverterFunc(converted);
    }
    return converted;
  }
};
