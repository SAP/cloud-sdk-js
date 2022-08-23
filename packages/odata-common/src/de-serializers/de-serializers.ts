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
   * TODO-JSDOC.
   */
  'Edm.Binary': DeSerializer<BinaryT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Boolean': DeSerializer<BooleanT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Byte': DeSerializer<ByteT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Decimal': DeSerializer<DecimalT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Double': DeSerializer<DoubleT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Float': DeSerializer<FloatT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Int16': DeSerializer<Int16T>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Int32': DeSerializer<Int32T>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Int64': DeSerializer<Int64T>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Guid': DeSerializer<GuidT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.SByte': DeSerializer<SByteT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Single': DeSerializer<SingleT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.String': DeSerializer<StringT>;
  /**
   * TODO-JSDOC.
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
