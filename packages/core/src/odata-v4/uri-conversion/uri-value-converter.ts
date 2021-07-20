/* eslint-disable valid-jsdoc */

import { identity } from '@sap-cloud-sdk/util';
import { tsToEdm } from '../payload-value-converter';
import {
  convertToUriForEdmString,
  uriConvertersCommon,
  EdmTypeShared,
  UriConverter, Enum
} from '../../odata-common';
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
  'Edm.Decimal': value => String(value),
  'Edm.Duration': value => `duration'${value}'`,
  'Edm.Guid': identity
};
/**
 * @hidden
 */
export const uriConverter: UriConverter = {
  convertToUriFormat(value: any, edmType?: EdmTypeShared<'v4'>, enumType?: Enum<any>): string {
    if(!edmType && !enumType){
      throw new Error("Failed to convert value to URI format. Either 'edmType' or 'enumType' has to be specified.");
    }
    if(enumType){
      return `'${enumType[value].toString()}'`;
    }
    const converted = tsToEdm(value, edmType!);
    const uriConverterFunc = uriConverters[edmType!];
    if (uriConverterFunc) {
      return uriConverterFunc(converted);
    }
    return converted;
  }
};

export { uriConverters as uriConvertersV4, uriConverter as uriConverterV4 };
