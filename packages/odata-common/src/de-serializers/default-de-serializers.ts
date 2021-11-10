import { identity } from '@sap-cloud-sdk/util';
import {
  serializeFromBigNumber,
  deserializeToNumber,
  serializeFromNumber,
  deserializeToBigNumber,
  validateGuid,
  convertToNumber
} from './payload-value-converter';
import { DeSerializationMiddleware } from './de-serialization-middleware';
import { convertToUriForEdmString, isInfOrNan } from './uri-value-converter';

export const defaultDeSerializersRaw: DeSerializationMiddleware = {
  'Edm.Binary': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, { serialize }) => `X'${serialize(value)}'`
  },
  'Edm.Boolean': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, { serialize }) => String(serialize(value))
  },
  'Edm.Byte': {
    deserialize: convertToNumber,
    serialize: convertToNumber,
    serializeToUri: (value, { serialize }) => String(serialize(value))
  },
  'Edm.Double': {
    deserialize: deserializeToNumber,
    serialize: serializeFromNumber,
    serializeToUri: (value, { serialize }) => {
      const serialized = serialize(value);
      return isInfOrNan(serialized) ? serialized : `${serialized}D`;
    }
  },
  'Edm.Float': {
    deserialize: deserializeToNumber,
    serialize: serializeFromNumber,
    serializeToUri: (value, { serialize }) => {
      const serialized = serialize(value);
      return isInfOrNan(serialized) ? serialized : `${serialized}F`;
    }
  },
  'Edm.Int16': {
    deserialize: convertToNumber,
    serialize: convertToNumber,
    serializeToUri: (value, { serialize }) => String(serialize(value))
  },
  'Edm.Int32': {
    deserialize: convertToNumber,
    serialize: convertToNumber,
    serializeToUri: (value, { serialize }) => String(serialize(value))
  },
  'Edm.Int64': {
    deserialize: deserializeToBigNumber,
    serialize: serializeFromBigNumber,
    serializeToUri: (value, { serialize }) => `${serialize(value)}L`
  },
  'Edm.SByte': {
    deserialize: convertToNumber,
    serialize: convertToNumber,
    serializeToUri: (value, { serialize }) => String(serialize(value))
  },
  'Edm.Single': {
    deserialize: deserializeToNumber,
    serialize: serializeFromNumber,
    serializeToUri: (value, { serialize }) => {
      const serialized = serialize(value);
      return isInfOrNan(serialized) ? serialized : `${serialized}F`;
    }
  },
  'Edm.String': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, { serialize }) =>
      convertToUriForEdmString(serialize(value))
  },
  'Edm.Any': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, { serialize }) => String(serialize(value))
  },
  /* DeSerializers without common URI serializer defaults. */
  'Edm.Decimal': {
    deserialize: deserializeToBigNumber,
    serialize: serializeFromBigNumber
  },
  'Edm.Guid': {
    deserialize: validateGuid,
    serialize: identity
  }
};
