/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable valid-jsdoc */

import { identity } from 'rambda';
import { tsToEdm } from '../payload-value-converter';
import { EdmTypeShared } from '../../common';
import { uriConvertersCommon } from '../../common/uri-conversion/uri-value-converter';
import { EdmType } from '../edm-types';

type UriConverterMapping = { [key in EdmType]: (value: any) => string };
/**
 * @hidden
 */
export const uriConverters: UriConverterMapping = {
  ...uriConvertersCommon,
  'Edm.Date': identity,
  'Edm.DateTimeOffset': identity,
  'Edm.TimeOfDay': identity,
  'Edm.Duration': value => `duration'${value}'`,
  'Edm.Guid': identity
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
