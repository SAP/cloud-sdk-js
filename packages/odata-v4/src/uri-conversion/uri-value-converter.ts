/* eslint-disable valid-jsdoc */

import { identity } from '@sap-cloud-sdk/util';
import {
  uriConvertersCommon,
  UriConverter,
  convertToUriForEdmString,
  createUriConverter
} from '@sap-cloud-sdk/odata-common';
import { serializers } from '../payload-value-converter';
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

export const uriConverter: UriConverter = createUriConverter(
  serializers,
  uriConverters
);
