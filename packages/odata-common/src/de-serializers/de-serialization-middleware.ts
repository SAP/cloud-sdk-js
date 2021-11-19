import { identity, isNullish } from '@sap-cloud-sdk/util';
import BigNumber from 'bignumber.js';
import { EdmTypeSameConverters } from '../edm-types';
export interface DeSerializationMiddleware<
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

export type DeSerializationMiddlewareBASE = {
  [P in EdmTypeSameConverters]: DeSerializer<any>;
};

export type DeserializedType<
  T extends DeSerializationMiddlewareBASE,
  U // extends keyof T
> = U extends keyof T
  ? T[U] extends DeSerializer<infer V>
    ? V
    : never
  : never;

export interface DeSerializer<T> {
  deserialize: (val: any) => T;
  serialize: (val: T) => any;
  serializeToUri?: (
    val: T,
    deSerializer: Omit<DeSerializer<T>, 'serializeToUri'>
  ) => string;
}

export const identityDeSerializerRaw = {
  deserialize: identity,
  serialize: identity
};

export function wrapUriSerialization<T>({
  serialize
}: DeSerializer<T>): DeSerializer<T>['serializeToUri'] {
  return function (value) {
    return serialize(value);
  };
}

export function wrapSerialization<T>(
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

export function wrapDeserialization<T>(
  deserialize: DeSerializer<T>['deserialize']
): DeSerializer<T>['serialize'] {
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

export type CustomDeSerializer<T> =
  // infer default types
  DeSerializationMiddleware extends DeSerializationMiddleware<
    infer DefaultBinaryT,
    infer DefaultBooleanT,
    infer DefaultByteT,
    infer DefaultDecimalT,
    infer DefaultDoubleT,
    infer DefaultFloatT,
    infer DefaultInt16T,
    infer DefaultInt32T,
    infer DefaultInt64T,
    infer DefaultGuidT,
    infer DefaultSByteT,
    infer DefaultSingleT,
    infer DefaultStringT,
    infer DefaultAnyT
  >
    ? DeSerializationMiddleware<
        'Edm.Binary' extends keyof T
          ? T['Edm.Binary'] extends DeSerializer<infer BinaryT> | undefined
            ? BinaryT
            : DefaultBinaryT
          : DefaultBinaryT,
        'Edm.Boolean' extends keyof T
          ? T['Edm.Boolean'] extends DeSerializer<infer BooleanT> | undefined
            ? BooleanT
            : DefaultBooleanT
          : DefaultBooleanT,
        'Edm.Byte' extends keyof T
          ? T['Edm.Byte'] extends DeSerializer<infer ByteT> | undefined
            ? ByteT
            : DefaultByteT
          : DefaultByteT,
        'Edm.Decimal' extends keyof T
          ? T['Edm.Decimal'] extends DeSerializer<infer DecimalT> | undefined
            ? DecimalT
            : DefaultDecimalT
          : DefaultDecimalT,
        'Edm.Double' extends keyof T
          ? T['Edm.Double'] extends DeSerializer<infer DoubleT> | undefined
            ? DoubleT
            : DefaultDoubleT
          : DefaultDoubleT,
        'Edm.Float' extends keyof T
          ? T['Edm.Float'] extends DeSerializer<infer FloatT> | undefined
            ? FloatT
            : DefaultFloatT
          : DefaultFloatT,
        'Edm.Int16' extends keyof T
          ? T['Edm.Int16'] extends DeSerializer<infer Int16T> | undefined
            ? Int16T
            : DefaultInt16T
          : DefaultInt16T,
        'Edm.Int32' extends keyof T
          ? T['Edm.Int32'] extends DeSerializer<infer Int32T> | undefined
            ? Int32T
            : DefaultInt32T
          : DefaultInt32T,
        'Edm.Int64' extends keyof T
          ? T['Edm.Int64'] extends DeSerializer<infer Int64T> | undefined
            ? Int64T
            : DefaultInt64T
          : DefaultInt64T,
        'Edm.Guid' extends keyof T
          ? T['Edm.Guid'] extends DeSerializer<infer GuidT> | undefined
            ? GuidT
            : DefaultGuidT
          : DefaultGuidT,
        'Edm.SByte' extends keyof T
          ? T['Edm.SByte'] extends DeSerializer<infer SByteT> | undefined
            ? SByteT
            : DefaultSByteT
          : DefaultSByteT,
        'Edm.Single' extends keyof T
          ? T['Edm.Single'] extends DeSerializer<infer SingleT> | undefined
            ? SingleT
            : DefaultSingleT
          : DefaultSingleT,
        'Edm.String' extends keyof T
          ? T['Edm.String'] extends DeSerializer<infer StringT> | undefined
            ? StringT
            : DefaultStringT
          : DefaultStringT,
        'Edm.Any' extends keyof T
          ? T['Edm.Any'] extends DeSerializer<infer AnyT> | undefined
            ? AnyT
            : DefaultAnyT
          : DefaultAnyT
      >
    : DeSerializationMiddleware;
