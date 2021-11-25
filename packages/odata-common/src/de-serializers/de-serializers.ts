import { identity } from '@sap-cloud-sdk/util';

/**
 * Represents a set of functions that determine (de-)serialization per EDM type.
 */
export interface DeSerializers<
  BinaryT = any,
  BooleanT = any,
  ByteT = any,
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
  'Edm.Binary': DeSerializer<BinaryT>;
  'Edm.Boolean': DeSerializer<BooleanT>;
  'Edm.Byte': DeSerializer<ByteT>;
  'Edm.Decimal': DeSerializer<DecimalT>;
  'Edm.Double': DeSerializer<DoubleT>;
  'Edm.Float': DeSerializer<FloatT>;
  'Edm.Int16': DeSerializer<Int16T>;
  'Edm.Int32': DeSerializer<Int32T>;
  'Edm.Int64': DeSerializer<Int64T>;
  'Edm.Guid': DeSerializer<GuidT>;
  'Edm.SByte': DeSerializer<SByteT>;
  'Edm.Single': DeSerializer<SingleT>;
  'Edm.String': DeSerializer<StringT>;
  'Edm.Any': DeSerializer<AnyT>;
}

/**
 * Represents a set of functions for serialization, deserialization and optionally serialization for URIs.
 * The return type of the `deserialize` function is the type of the input to the `serialize` and `serializeToUri` functions.
 */
export interface DeSerializer<DeserializedT> {
  /**
   * Function to deserialize a value.
   * @param val - Serialized value to deserialize.
   * @returns Deserialized value.
   */
  deserialize: (val: any) => DeserializedT;

  /**
   * Function to serialize a value.
   * @param val - Deserialized value to serialize.
   * @returns Serialized value.
   */
  serialize: (val: DeserializedT) => any;

  /**
   * Function to serialize a value for use in a URI.
   * This function is optional. If not specified, the `serialize` function will be used.
   * @param val - Deserialized value to serialize.
   * @param serialize - The `serialize` function to serialize the payload.
   * @returns Serialized value for URIs.
   */
  serializeToUri?: (
    val: DeserializedT,
    serialize: DeSerializer<DeserializedT>['serialize']
  ) => string;
}

/**
 * Infers the deserialized type for an EDM type from the given `DeSerializers` type.
 * @typeparam DeSerializersT - Type of the `DeSerializers`.
 * @typeparam EdmT - EDM type to get the deserialized type for.
 */
export type DeserializedType<
  DeSerializersT extends DeSerializers,
  EdmT
> = EdmT extends keyof DeSerializersT
  ? DeSerializersT[EdmT] extends DeSerializer<infer DeserializedT>
    ? DeserializedT
    : never
  : never;

export const identityDeSerializerRaw = {
  deserialize: identity,
  serialize: identity
};
