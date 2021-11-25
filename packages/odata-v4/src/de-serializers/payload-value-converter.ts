/* eslint-disable valid-jsdoc */

import BigNumber from 'bignumber.js';
import moment from 'moment';
import { Time, EdmTypeShared } from '@sap-cloud-sdk/odata-common/internal';
import { EdmType } from '../edm-types';
import { defaultDeSerializers } from './default-de-serializers';
import { DeSerializers } from './de-serializers';

export function edmToTs<T extends EdmType>(
  value: any,
  edmType: EdmTypeShared<'v4'>,
  deSerializers: DeSerializers = defaultDeSerializers
): EdmToPrimitive<T> {
  return deSerializers[edmType].deserialize(value);
}

/**
 * @internal
 */
export function tsToEdm(
  value: any,
  edmType: EdmTypeShared<'v4'>,
  deSerializers: DeSerializers = defaultDeSerializers
): any {
  return deSerializers[edmType].serialize(value);
}

/**
 * @internal
 */
export type EdmToPrimitive<T extends EdmType> = T extends
  | 'Edm.Int16'
  | 'Edm.Int32'
  | 'Edm.Single'
  | 'Edm.Double'
  | 'Edm.Float'
  | 'Edm.Byte'
  | 'Edm.SByte'
  ? number
  : T extends 'Edm.Decimal' | 'Edm.Int64'
  ? BigNumber
  : T extends 'Edm.DateTime' | 'Edm.DateTimeOffset'
  ? moment.Moment
  : T extends 'Edm.String' | 'Edm.Guid'
  ? string
  : T extends 'Edm.Boolean'
  ? boolean
  : T extends 'Edm.Time'
  ? Time
  : any;
