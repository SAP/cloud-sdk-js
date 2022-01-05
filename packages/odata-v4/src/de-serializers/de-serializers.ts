import {
  DeSerializer,
  DeSerializers as DeSerializersCommon,
  DeserializedType as DeserializedTypeCommon
} from '@sap-cloud-sdk/odata-common/internal';

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
  AnyT = any,
  DateT = any,
  DateTimeOffsetT = any,
  DurationT = any,
  TimeOfDayT = any,
  EnumT = any
> extends DeSerializersCommon<
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
  > {
  'Edm.Date': DeSerializer<DateT>;
  'Edm.DateTimeOffset': DeSerializer<DateTimeOffsetT>;
  'Edm.Duration': DeSerializer<DurationT>;
  'Edm.TimeOfDay': DeSerializer<TimeOfDayT>;
  'Edm.Enum': DeSerializer<EnumT>;
}

export type DeserializedType<DeSerializersT extends DeSerializers, EdmT> = DeserializedTypeCommon<DeSerializersT, EdmT>;
