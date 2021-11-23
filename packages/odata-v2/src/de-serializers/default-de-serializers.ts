/* eslint-disable valid-jsdoc */

import {
  wrapDeserialization,
  wrapSerialization
} from '@sap-cloud-sdk/odata-common/src/de-serializers/de-serialization-middleware';
import { defaultDeSerializersRaw as defaultDeSerializersCommon } from '@sap-cloud-sdk/odata-common/src/de-serializers/default-de-serializers';
import {
  deserializeToMoment,
  deserializeToTime,
  serializeFromMoment,
  serializeFromTime
} from './converters';
import { DeSerializationMiddleware } from './de-serialization-middleware';

const defaultDeSerializersRaw: DeSerializationMiddleware = {
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
    // serializeToUri: value => `time'${value}'`
    // serializeToUri: value => `time'${value}'`
    serializeToUri: (value, { serialize }) => `time'${serialize(value)}'`
  },
  /* DeSerializers without common URI serializer defaults. */
  'Edm.Decimal': {
    ...defaultDeSerializersCommon['Edm.Decimal'],
    serializeToUri: (value, { serialize }) => `${serialize(value)}M`
  },
  'Edm.Guid': {
    ...defaultDeSerializersCommon['Edm.Guid'],
    serializeToUri: (value, { serialize }) => `guid'${serialize(value)}'`
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
