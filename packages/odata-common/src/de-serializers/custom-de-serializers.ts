import BigNumber from 'bignumber.js';
import {
  DeserializedType,
  DeSerializer,
  DeSerializers
} from './de-serializers';
import {
  defaultDeSerializers,
  DefaultDeSerializers
} from './default-de-serializers';

/**
 * Infers the deserialized type for an EDM type, based on custom (de-)serializers.
 * If the custom (de-)serializers specify a type for the given EDM type, this type is inferred.
 * Otherwise the given DefaultType is used.
 * @typeParam CustomDeSerializerT - Type of the custom (de-)serializers.
 * @typeParam EdmT - The EDM type to infer the type for.
 */
export type CustomOrDefaultType<
  CustomDeSerializerT,
  EdmT,
  DefaultDeSerializersT extends DefaultDeSerializers
> = EdmT extends keyof CustomDeSerializerT
  ? CustomDeSerializerT[EdmT] extends DeSerializer<infer CustomT> | undefined
    ? CustomT
    : DeserializedType<DefaultDeSerializersT, EdmT>
  : DeserializedType<DefaultDeSerializersT, EdmT>;

/**
 * @internal
 * Get a complete set of (de-)serializers, that consists of the given partial custom (de-)serializers and default (de-)serializers (aka. default (de-)serializers merged with custom (de-)serializers).
 * The custom (de-)serializers are merged with the default (de-)serializers, while custom (de-)serializers take precedence.
 * @param customDeSerializers - Custom (de-)serialization functions.
 * @returns A full set of (de-)serialization functions, that combines custom and default (de-)serializers.
 */
export function mergeDefaultDeSerializersWith<
  BinaryT = string,
  BooleanT = boolean,
  ByteT = number,
  DecimalT = BigNumber,
  DoubleT = number,
  FloatT = number,
  Int16T = number,
  Int32T = number,
  Int64T = BigNumber,
  GuidT = string,
  SByteT = number,
  SingleT = number,
  StringT = string,
  AnyT = any
>(
  customDeSerializers: Partial<
    DeSerializers<
      BinaryT,
      BooleanT,
      ByteT,
      DecimalT,
      DoubleT,
      FloatT,
      Int16T,
      Int32T,
      Int64T,
      GuidT,
      SByteT,
      SingleT,
      StringT,
      AnyT
    >
  >
): CustomDeSerializers<typeof customDeSerializers> {
  return {
    ...(defaultDeSerializers as any),
    ...(customDeSerializers || {})
  };
}

/**
 * @internal
 * Type of the full set of (de-)serialization functions, that include custom (de-)serializers (aka. default (de-)serializers type merged with custom (de-)serializers type).
 */
export type CustomDeSerializers<T> = DeSerializers<
  CustomOrDefaultType<T, 'Edm.Binary', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Boolean', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Byte', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Decimal', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Double', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Float', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Int16', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Int32', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Int64', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Guid', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.SByte', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Single', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.String', DefaultDeSerializers>,
  CustomOrDefaultType<T, 'Edm.Any', DefaultDeSerializers>
>;
