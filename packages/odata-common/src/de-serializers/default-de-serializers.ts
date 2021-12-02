import { identity, isNullish } from '@sap-cloud-sdk/util';
import BigNumber from 'bignumber.js';
import { DeSerializer, DeSerializers } from './de-serializers';
import {
  serializeFromBigNumber,
  deserializeToNumber,
  serializeFromNumber,
  deserializeToBigNumber,
  validateGuid,
  convertToNumber
} from './payload-value-converter';
import { convertToUriForEdmString, isInfOrNan } from './uri-value-converter';

/**
 * @internal
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
  any
>;

/**
 * @internal
 * Default (de-)serializers without `null` and `undefined` handling.
 */
export const defaultDeSerializersRaw: DefaultDeSerializers = {
  'Edm.Binary': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, serialize) => `X'${serialize(value)}'`
  },
  'Edm.Boolean': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, serialize) => String(serialize(value))
  },
  'Edm.Byte': {
    deserialize: convertToNumber,
    serialize: convertToNumber,
    serializeToUri: (value, serialize) => String(serialize(value))
  },
  'Edm.Double': {
    deserialize: deserializeToNumber,
    serialize: serializeFromNumber,
    serializeToUri: (value, serialize) => {
      const serialized = serialize(value);
      return isInfOrNan(serialized) ? serialized : `${serialized}D`;
    }
  },
  'Edm.Float': {
    deserialize: deserializeToNumber,
    serialize: serializeFromNumber,
    serializeToUri: (value, serialize) => {
      const serialized = serialize(value);
      return isInfOrNan(serialized) ? serialized : `${serialized}F`;
    }
  },
  'Edm.Int16': {
    deserialize: convertToNumber,
    serialize: convertToNumber,
    serializeToUri: (value, serialize) => String(serialize(value))
  },
  'Edm.Int32': {
    deserialize: convertToNumber,
    serialize: convertToNumber,
    serializeToUri: (value, serialize) => String(serialize(value))
  },
  'Edm.Int64': {
    deserialize: deserializeToBigNumber,
    serialize: serializeFromBigNumber,
    serializeToUri: (value, serialize) => `${serialize(value)}L`
  },
  'Edm.SByte': {
    deserialize: convertToNumber,
    serialize: convertToNumber,
    serializeToUri: (value, serialize) => String(serialize(value))
  },
  'Edm.Single': {
    deserialize: deserializeToNumber,
    serialize: serializeFromNumber,
    serializeToUri: (value, serialize) => {
      const serialized = serialize(value);
      return isInfOrNan(serialized) ? serialized : `${serialized}F`;
    }
  },
  'Edm.String': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, serialize) =>
      convertToUriForEdmString(serialize(value))
  },
  'Edm.Any': {
    deserialize: identity,
    serialize: identity,
    serializeToUri: (value, serialize) => String(serialize(value))
  },
  /* DeSerializers with v2 and v4 specific URI serializer defaults. */
  'Edm.Decimal': {
    deserialize: deserializeToBigNumber,
    serialize: serializeFromBigNumber
  },
  'Edm.Guid': {
    deserialize: validateGuid,
    serialize: identity
  }
};

/**
 * Wraps the given default serialization function with a check for null values.
 * @param serialize - Serialization function to wrap.
 * @returns The wrapped serialization function.
 */
function wrapDefaultSerializer<T>(
  serialize: DeSerializer<T>['serialize']
): DeSerializer<T>['serialize'] {
  return function (value) {
    if (value === null) {
      return 'null';
    }
    if (serialize) {
      return serialize(value);
    }
    return value;
  };
}

/**
 * Wraps the given default deserialization function with a check for nullish values.
 * @param deserialize - Deserialization function to wrap.
 * @returns The wrapped deserialization function.
 */
function wrapDefaultDeserializer<T>(
  deserialize: DeSerializer<T>['deserialize']
): DeSerializer<T>['deserialize'] {
  return function (value) {
    if (isNullish(value)) {
      return value;
    }
    if (deserialize) {
      return deserialize(value);
    }
    return value;
  };
}

/**
 * Wraps the given default (de-)serialization functions with a check for nullish values.
 * @param deSerializers - (De-)Serializers to wrap.
 * @returns The wrapped (de-)serializers.
 */
export function wrapDefaultDeSerializers<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT
): DeSerializersT {
  return Object.entries(deSerializers).reduce(
    (entries, [edmType, { deserialize, serialize, serializeToUri }]) => ({
      ...entries,
      [edmType]: {
        deserialize: wrapDefaultDeserializer(deserialize),
        serialize: wrapDefaultSerializer(serialize),
        serializeToUri
      }
    }),
    {}
  ) as DeSerializersT;
}
