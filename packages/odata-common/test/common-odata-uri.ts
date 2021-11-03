import {
  createGetResourcePathForKeys,
  serializersCommon,
  UriConverter,
  uriConvertersCommon
} from '@sap-cloud-sdk/odata-common';
import { createGetFilter, getOrderBy, ODataUri, getEntityKeys } from '../src';
import { CommonEntity } from './common-entity';

export const commonUriConverter: UriConverter = {
  convertToUriFormat(value: any, edmType: any): string {
    if (value === null) {
      return 'null';
    }
    if (serializersCommon[edmType]) {
      const valueConverted = serializersCommon[edmType](value);
      if (uriConvertersCommon[edmType]) {
        return uriConvertersCommon[edmType](valueConverted);
      }
      return valueConverted;
    }
    throw new Error(
      `You try to convert Edm type ${edmType} which is version specific.`
    );
  }
};

export const commonOdataUri: ODataUri = {
  getSelect: select => {
    if (select && select.length > 0) {
      throw new Error('Select is version specific not testable here.');
    }
    return;
  }, // versionspecific
  getExpand: expand => {
    if (expand && expand.length > 0) {
      throw new Error('Expand is version specific not testable here.');
    }
    return;
  }, // versionSpecific
  getOrderBy: () => getOrderBy,
  getFilter: filter => {
    if (filter) {
      return createGetFilter(commonUriConverter).getFilter(
        filter,
        CommonEntity
      );
    }
  },
  getResourcePathForKeys:
    createGetResourcePathForKeys(commonUriConverter).getResourcePathForKeys,
  getEntityKeys
} as any;
