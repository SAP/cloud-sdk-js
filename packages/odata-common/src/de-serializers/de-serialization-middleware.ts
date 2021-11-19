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
