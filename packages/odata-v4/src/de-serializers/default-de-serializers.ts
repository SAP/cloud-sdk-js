/* eslint-disable valid-jsdoc */
import { convertToUriForEdmString } from '@sap-cloud-sdk/odata-common/internal';
import {
  wrapDeserialization,
  wrapSerialization
} from '@sap-cloud-sdk/odata-common/src/de-serializers/de-serialization-middleware';
import { defaultDeSerializersRaw as defaultDeSerializersCommon } from '@sap-cloud-sdk/odata-common/src/de-serializers/default-de-serializers';
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
import { DeSerializationMiddleware } from './de-serialization-middleware';

const defaultDeSerializersRaw: DeSerializationMiddleware = {
  ...defaultDeSerializersCommon,
  'Edm.Date': {
    deserialize: deserializeDateToMoment,
    serialize: serializeToDate,
    serializeToUri: (value, { serialize }) => serialize(value)
  },
  'Edm.DateTimeOffset': {
    deserialize: deserializeDateTimeOffsetToMoment,
    serialize: serializeToDateTimeOffset,
    serializeToUri: (value, { serialize }) => serialize(value)
  },
  'Edm.Duration': {
    deserialize: deserializeDurationToMoment,
    serialize: serializeToDuration,
    serializeToUri: (value, { serialize }) => `duration'${serialize(value)}'`
  },
  'Edm.TimeOfDay': {
    deserialize: deserializeToTime,
    serialize: serializeToTime,
    serializeToUri: (value, { serialize }) => serialize(value)
  },
  'Edm.Enum': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, { serialize }) =>
      convertToUriForEdmString(serialize(value))
  },
  /* DeSerializers without common URI serializer defaults. */
  'Edm.Decimal': {
    ...defaultDeSerializersCommon['Edm.Decimal'],
    serializeToUri: (value, { serialize }) => String(serialize(value))
  },
  'Edm.Guid': {
    ...defaultDeSerializersCommon['Edm.Guid'],
    serializeToUri: (value, { serialize }) => serialize(value)
  }
};

/**
 * TODO
 */
export const defaultDeSerializers: DeSerializationMiddleware = Object.entries(
  defaultDeSerializersRaw
).reduce(
  (entries, [edmType, { deserialize, serialize, serializeToUri }]) => ({
    ...entries,
    [edmType]: {
      deserialize: wrapDeserialization(deserialize),
      serialize: wrapSerialization(serialize),
      serializeToUri
    }
  }),
  {}
) as DeSerializationMiddleware;
