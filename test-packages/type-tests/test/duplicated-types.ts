import { DeSerializers as DeSerializersV2 } from '@sap-cloud-sdk/odata-v2';
import BigNumber from 'bignumber.js';
import { Time } from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers as DeSerializersV4 } from '@sap-cloud-sdk/odata-v4';
import { mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v4/internal';

/*
These types are duplicated from the published module to ensure a unintentional change breaks the type tests.
 */

export type AnyDeserializerV2 = DeSerializersV2<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;
export type DefaultDeSerializerV2 = DeSerializersV2<
  string,
  boolean,
  number,
  BigNumber,
  number,
  number,
  number,
  number,
  BigNumber,
  string,
  number,
  number,
  string,
  any,
  moment.Moment,
  moment.Moment,
  Time
>;
export type CustomDeSerializerV2 = DeSerializersV2<
  string,
  boolean,
  number,
  BigNumber,
  number,
  number,
  number,
  number,
  BigNumber,
  string,
  number,
  number,
  number,
  any,
  moment.Moment,
  moment.Moment,
  Time
>;
export type DefaultDeSerializersV4 = DeSerializersV4<
  string,
  boolean,
  number,
  BigNumber,
  number,
  number,
  number,
  number,
  BigNumber,
  string,
  number,
  number,
  string,
  any,
  moment.Moment,
  moment.Moment,
  moment.Duration,
  Time,
  any
>;
export type CustomDeSerializerV4 = DeSerializersV4<
  string,
  boolean,
  number,
  BigNumber,
  number,
  number,
  number,
  number,
  BigNumber,
  string,
  number,
  number,
  number,
  any,
  moment.Moment,
  moment.Moment,
  moment.Duration,
  Time,
  any
>;
export type AnyDeSerializerV4 = DeSerializersV4<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;
export const customTestDeSerializersV4: CustomDeSerializerV4 =
  mergeDefaultDeSerializersWith({
    'Edm.String': {
      deserialize: () => 100,
      serialize: (value: number) => value.toString(),
      serializeToUri: (value: number, serialize) => `'URI(${serialize(value)})'`
    }
  });
