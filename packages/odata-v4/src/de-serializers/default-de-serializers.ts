import {
  convertToUriForEdmString,
  defaultDeSerializersRaw as defaultDeSerializersCommon,
  wrapDefaultDeSerializers
} from '@sap-cloud-sdk/odata-common/internal';
import { identity } from '@sap-cloud-sdk/util';
import {
  serializeToDate,
  deserializeDateTimeOffsetToMoment,
  serializeToDateTimeOffset,
  deserializeDurationToMoment,
  serializeToDuration,
  deserializeToTime,
  serializeToTime,
  deserializeDateToMoment
} from './converters';
import type BigNumber from 'bignumber.js';
import type { Time } from '@sap-cloud-sdk/odata-common/internal';
import type { DeSerializers } from './de-serializers';
import type moment from 'moment';

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
  moment.Duration,
  Time,
  any
>;

/**
 * Default (de-)serializers without `null` and `undefined` handling.
 */
const defaultDeSerializersRaw: DefaultDeSerializers = {
  ...defaultDeSerializersCommon,
  'Edm.Date': {
    deserialize: deserializeDateToMoment,
    serialize: serializeToDate,
    serializeToUri: (value, serialize) => serialize(value)
  },
  'Edm.DateTimeOffset': {
    deserialize: deserializeDateTimeOffsetToMoment,
    serialize: (value: moment.Moment, precision?: number) =>
      serializeToDateTimeOffset(value, precision),
    serializeToUri: (value, serialize) => serialize(value)
  },
  'Edm.Duration': {
    deserialize: deserializeDurationToMoment,
    serialize: serializeToDuration,
    serializeToUri: (value, serialize) => `duration'${serialize(value)}'`
  },
  'Edm.TimeOfDay': {
    deserialize: deserializeToTime,
    serialize: serializeToTime,
    serializeToUri: (value, serialize) => serialize(value)
  },
  'Edm.Enum': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, serialize) =>
      convertToUriForEdmString(serialize(value))
  },
  /* DeSerializers with v4 specific URI serializer defaults. */
  'Edm.Decimal': {
    deserialize: defaultDeSerializersCommon['Edm.Decimal'].deserialize,
    serialize: value => {
      const primitiveNumber = typeof value === 'number' ? value : Number(value);
      if (
        primitiveNumber <= Number.MAX_SAFE_INTEGER &&
        primitiveNumber >= Number.MIN_SAFE_INTEGER
      ) {
        return primitiveNumber;
      }
      return defaultDeSerializersCommon['Edm.Decimal'].serialize(value);
    },
    serializeToUri: (value, serialize) => String(serialize(value))
  },
  'Edm.Guid': {
    ...defaultDeSerializersCommon['Edm.Guid'],
    serializeToUri: (value, serialize) => serialize(value)
  }
};

/**
 * The default (de-)serializers.
 */
export const defaultDeSerializers = wrapDefaultDeSerializers(
  defaultDeSerializersRaw
);
