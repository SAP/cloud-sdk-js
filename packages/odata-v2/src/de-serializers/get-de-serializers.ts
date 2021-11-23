import { Time } from '@sap-cloud-sdk/odata-common/internal';
import {
  DeSerializationMiddlewareBASE,
  DeSerializer
} from '@sap-cloud-sdk/odata-common/src/de-serializers/de-serialization-middleware';
import BigNumber from 'bignumber.js';
import { DeSerializationMiddleware } from './de-serialization-middleware';
import { defaultDeSerializers } from './default-de-serializers';

export function getDeSerializers<
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
  AnyT = any,
  DateTimeT = moment.Moment,
  DateTimeOffsetT = moment.Moment,
  TimeT = Time
>(
  deSerializers: Partial<
    DeSerializationMiddleware<
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
      AnyT,
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >
  >
): CustomDeSerializer<typeof deSerializers> {
  return {
    ...(defaultDeSerializers as any),
    ...(deSerializers || {})
  };
}

// Cannot get this to work
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
    infer DefaultAnyT,
    infer DefaultDateTimeT,
    infer DefaultDateTimeOffsetT,
    infer DefaultTimeT
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
          : DefaultAnyT,
        'Edm.DateTime' extends keyof T
          ? T['Edm.DateTime'] extends DeSerializer<infer DateTimeT> | undefined
            ? DateTimeT
            : DefaultDateTimeT
          : DefaultDateTimeT,
        'Edm.DateTimeOffset' extends keyof T
          ? T['Edm.DateTimeOffset'] extends
              | DeSerializer<infer DateTimeOffsetT>
              | undefined
            ? DateTimeOffsetT
            : DefaultDateTimeOffsetT
          : DefaultDateTimeOffsetT,
        'Edm.Time' extends keyof T
          ? T['Edm.Time'] extends DeSerializer<infer TimeT> | undefined
            ? TimeT
            : DefaultTimeT
          : DefaultTimeT
      >
    : DeSerializationMiddleware;

const c = {
  'Edm.String': {
    deserialize: (val: any): number => 3,
    serialize: (val: number): any => '3'
  } as DeSerializer<number>
};

type C = CustomDeSerializer<typeof c>; // ['Edm.String'];
type D = CustomDeSerializer<typeof undefined>; // ['Edm.String'];

type Test<T extends Partial<DeSerializationMiddlewareBASE>> = T;
type TestC = Test<typeof c>;

// const d: C = {
//   'Edm.String': {
//     deserialize: (val: any): number => 3,
//     serialize: (val: number): any => '3'
//   } as DeSerializer<number>
// };

// const e: D = {
//   'Edm.String': {
//     deserialize: (val: any): string => 'tre',
//     serialize: (val: string): any => '3'
//   } as DeSerializer<string>
// };

const a = getDeSerializers({
  'Edm.String': {
    deserialize: (val: any): number => 3,
    serialize: (val: number): any => '3'
  } // as DeSerializer<number>
});

const b1 = a['Edm.String'].deserialize('1');
const b2 = a['Edm.String'].serialize(2);
const b3 = a['Edm.String'];
const b4 = a['Edm.Int32'];
