import {
  wrapDeserialization,
  wrapDefaultSerialization,
  defaultDeSerializersRaw as defaultDeSerializersCommon,
  Time
} from '@sap-cloud-sdk/odata-common/internal';
import BigNumber from 'bignumber.js';
import {
  deserializeToMoment,
  deserializeToTime,
  serializeFromMoment,
  serializeFromTime
} from './converters';
import { DeSerializers } from './de-serializers';

/**
 * Type of the default (de-)serializers.
 */
export type DefaultDeSerializers = DeSerializers<
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

/**
 * Default (de-)serializers without `null` and `undefined` handling.
 */
const defaultDeSerializersRaw: DefaultDeSerializers = {
  ...defaultDeSerializersCommon,
  'Edm.DateTime': {
    deserialize: deserializeToMoment,
    serialize: serializeFromMoment,
    serializeToUri: value =>
      `datetime'${value.toISOString().replace(/Z$/, '')}'`
  },
  'Edm.DateTimeOffset': {
    deserialize: deserializeToMoment,
    serialize: serializeFromMoment,
    serializeToUri: value => `datetimeoffset'${value.toISOString()}'`
  },
  'Edm.Time': {
    deserialize: deserializeToTime,
    serialize: serializeFromTime,
    serializeToUri: (value, serialize) => `time'${serialize(value)}'`
  },
  /* DeSerializers without common URI serializer defaults. */
  'Edm.Decimal': {
    ...defaultDeSerializersCommon['Edm.Decimal'],
    serializeToUri: (value, serialize) => `${serialize(value)}M`
  },
  'Edm.Guid': {
    ...defaultDeSerializersCommon['Edm.Guid'],
    serializeToUri: (value, serialize) => `guid'${serialize(value)}'`
  }
};

/**
 * The default (de-)serializers.
 */
export const defaultDeSerializers: DefaultDeSerializers = Object.entries(
  defaultDeSerializersRaw
).reduce(
  (entries, [edmType, { deserialize, serialize, serializeToUri }]) => ({
    ...entries,
    [edmType]: {
      deserialize: wrapDeserialization(deserialize),
      serialize: wrapDefaultSerialization(serialize),
      serializeToUri
    }
  }),
  {}
) as DefaultDeSerializers;
