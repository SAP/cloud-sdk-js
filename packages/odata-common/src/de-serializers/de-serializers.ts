/**
 * Represents a set of functions that determine (de-)serialization per EDM type.
 */
export interface DeSerializers<
  BinaryT = any,
  BooleanT = any,
  ByteT = any,
  // todo: Given that this generic type is mandatory and odata v2/v4 specific types are optional.
  // For entity api files, we should not put unused import.
  // So "import { Duration } from 'moment';" can be omitted when the "Edm.Duration" (v4 specific) is not used.
  // However, even if "Edm.Decimal" is not used, the "import { BigNumber } from 'bignumber.js';" has to be provided, as it's used as default deserializer of the DecimalT (mandatory).
  DecimalT = any,
  DoubleT = any,
  FloatT = any,
  Int16T = any,
  Int32T = any,
  Int64T = any,
  GuidT = any,
  SByteT = any,
  SingleT = any,
  StringT = any,
  AnyT = any
> {
  /**
   * DeSerializer for `Edm.Binary` to the generic type `BinaryT`.
   */
  'Edm.Binary': DeSerializer<BinaryT>;
  /**
   * DeSerializer for `Edm.Boolean` to the generic type `BooleanT`.
   */
  'Edm.Boolean': DeSerializer<BooleanT>;
  /**
   * DeSerializer for `Edm.Byte` to the generic type `ByteT`.
   */
  'Edm.Byte': DeSerializer<ByteT>;
  /**
   * DeSerializer for `Edm.Decimal` to the generic type `DecimalT`.
   */
  'Edm.Decimal': DeSerializer<DecimalT>;
  /**
   * DeSerializer for `Edm.Double` to the generic type `DoubleT`.
   */
  'Edm.Double': DeSerializer<DoubleT>;
  /**
   * DeSerializer for `Edm.Float` to the generic type `FloatT`.
   */
  'Edm.Float': DeSerializer<FloatT>;
  /**
   * DeSerializer for `Edm.Int16` to the generic type `Int16T`.
   */
  'Edm.Int16': DeSerializer<Int16T>;
  /**
   * DeSerializer for `Edm.Int32` to the generic type `Int32T`.
   */
  'Edm.Int32': DeSerializer<Int32T>;
  /**
   * DeSerializer for `Edm.Int64` to the generic type `Int64T`.
   */
  'Edm.Int64': DeSerializer<Int64T>;
  /**
   * DeSerializer for `Edm.Guid` to the generic type `GuidT`.
   */
  'Edm.Guid': DeSerializer<GuidT>;
  /**
   * DeSerializer for `Edm.SByte` to the generic type `SByteT`.
   */
  'Edm.SByte': DeSerializer<SByteT>;
  /**
   * DeSerializer for `Edm.Single` to the generic type `SingleT`.
   */
  'Edm.Single': DeSerializer<SingleT>;
  /**
   * DeSerializer for `Edm.String` to the generic type `StringT`.
   */
  'Edm.String': DeSerializer<StringT>;
  /**
   * DeSerializer for `Edm.Any` to the generic type `AnyT`.
   */
  'Edm.Any': DeSerializer<AnyT>;
  // [key: string]: DeSerializer<any>;
}

/**
 * Represents a set of functions for serialization, deserialization and optionally serialization for URIs.
 * The return type of the `deserialize` function is the type of the input to the `serialize` and `serializeToUri` functions.
 * @typeParam DeserializedT - The return type of `deserialize` and input of `serialize` and `serilizeToUri`.
 */
export interface DeSerializer<DeserializedT> {
  /**
   * Function to deserialize a value which is _usually_ a string.
   * @param value - Serialized value to deserialize.
   * @returns Deserialized value.
   */
  deserialize: (value: any) => DeserializedT;

  /**
   * Function to serialize a value.
   * @param value - Deserialized value to serialize.
   * @returns Serialized value.
   */
  serialize: (value: DeserializedT) => any;

  /**
   * Function to serialize a value for use in a URI.
   * This function is optional. If not specified, the `serialize` function will be used.
   * @param value - Deserialized value to serialize.
   * @param serialize - A reference to the `serialize` function which is usually used to serialize the payload.
   * @returns Serialized value for URIs.
   */
  serializeToUri?: (
    value: DeserializedT,
    serialize: DeSerializer<DeserializedT>['serialize']
  ) => string;
}

/**
 * Infers the deserialized type for an EDM type from the given (de-)serializers type.
 * @typeParam DeSerializersT - Type of the (de-)serializers.
 * @typeParam EdmT - Return type of the deserialize function for the given EDM type.
 */
export type DeserializedType<
  DeSerializersT extends DeSerializers,
  EdmT
> = EdmT extends keyof DeSerializersT
  ? DeSerializersT[EdmT] extends DeSerializer<infer DeserializedT>
    ? DeserializedT
    : any
  : any;

/**
 * @internal
 * Creates a function to deserialize values (from EDM to their representation in code).
 * @typeParam DeSerializersT - Type of the (de-)serializers.
 * @param deSerializers - (De-)serializers object to use for deserialization of values.
 * @returns A function that deserializes values with the given deserializers.
 */
export function createValueDeserializer<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT
): <EdmT>(value: any, edmType: EdmT) => DeserializedType<DeSerializersT, EdmT> {
  return (value, edmType) => {
    const deserialize = deSerializers[edmType as any]?.deserialize;
    return deserialize ? deserialize(value) : value;
  };
}

/**
 * @internal
 * Creates a function to serialize values (from their representation in code to EDM).
 * @typeParam DeSerializersT - Type of the (de-)serializers.
 * @param deSerializers - (De-)serializers object to use for deserialization of values.
 * @returns A function that serializes values with the given serializers.
 */
export function createValueSerializer<DeSerializersT extends DeSerializers>(
  deSerializers: DeSerializersT
): <EdmT>(value: any, edmType: EdmT) => any {
  return (value, edmType) => {
    const serialize = deSerializers[edmType as any]?.serialize;
    return serialize ? serialize(value) : value;
  };
}
