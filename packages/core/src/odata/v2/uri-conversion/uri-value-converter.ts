/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable valid-jsdoc */

import { edmToTs, tsToEdm } from '../payload-value-converter';
import { EdmTypeShared } from '../../common';
import { uriConvertersCommon } from '../../common/uri-conversion/uri-value-converter';
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
      .replace(/Z$/, '')}'`, //
  'Edm.DateTimeOffset': value =>
    `datetimeoffset'${edmToTs(value, 'Edm.DateTimeOffset').toISOString()}'`, //
  'Edm.Time': value => `time'${value}'`,
  'Edm.Guid': value => `guid'${value}'`
};
/**
 * @hidden
 */
export function convertToUriFormat(
  value: any,
  edmType: EdmTypeShared<'v2'>
): string {
  const converted = tsToEdm(value, edmType);
  const uriConverter = uriConverters[edmType];
  if (uriConverter) {
    return uriConverter(converted);
  }
  return converted;
}
