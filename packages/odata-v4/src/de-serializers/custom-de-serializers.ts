import {
  Time,
  CustomOrDefaultType as CustomOrDefaultTypeCommon
} from '@sap-cloud-sdk/odata-common/internal';
import BigNumber from 'bignumber.js';
import { DeSerializers } from './de-serializers';
import {
  DefaultDeSerializers,
  defaultDeSerializers
} from './default-de-serializers';

/**
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
  AnyT = any,
  DateTimeT = moment.Moment,
  DateTimeOffsetT = moment.Moment,
  TimeT = Time
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
      AnyT,
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >
  >
): CustomDeSerializer<typeof customDeSerializers> {
  return {
    ...(defaultDeSerializers as any),
    ...(customDeSerializers || {})
  };
}

type CustomOrDefaultType<CustomDeSerializerT, EdmT> = CustomOrDefaultTypeCommon<
  CustomDeSerializerT,
  EdmT,
  DefaultDeSerializers
>;

/**
 * Type of the full set of (de-)serialization functions, that include custom (de-)serializers (aka. default (de-)serializers type merged with custom (de-)serializers type).
 */
export type CustomDeSerializer<T> = DeSerializers<
  CustomOrDefaultType<T, 'Edm.Binary'>,
  CustomOrDefaultType<T, 'Edm.Boolean'>,
  CustomOrDefaultType<T, 'Edm.Byte'>,
  CustomOrDefaultType<T, 'Edm.Decimal'>,
  CustomOrDefaultType<T, 'Edm.Double'>,
  CustomOrDefaultType<T, 'Edm.Float'>,
  CustomOrDefaultType<T, 'Edm.Int16'>,
  CustomOrDefaultType<T, 'Edm.Int32'>,
  CustomOrDefaultType<T, 'Edm.Int64'>,
  CustomOrDefaultType<T, 'Edm.Guid'>,
  CustomOrDefaultType<T, 'Edm.SByte'>,
  CustomOrDefaultType<T, 'Edm.Single'>,
  CustomOrDefaultType<T, 'Edm.String'>,
  CustomOrDefaultType<T, 'Edm.Any'>,
  CustomOrDefaultType<T, 'Edm.DateTime'>,
  CustomOrDefaultType<T, 'Edm.DateTimeOffset'>,
  CustomOrDefaultType<T, 'Edm.Time'>
>;
