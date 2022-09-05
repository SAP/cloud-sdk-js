import {
  DeSerializer,
  DeSerializers as DeSerializersCommon
} from '@sap-cloud-sdk/odata-common';

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
  /**
   * DeSerializer for `Edm.DateTime` to the generic type `DateTimeT`.
   */
  'Edm.Date': DeSerializer<DateT>;
  /**
   * DeSerializer for `Edm.DateTimeOffset` to the generic type `DateTimeOffsetT`.
   */
  'Edm.DateTimeOffset': DeSerializer<DateTimeOffsetT>;
  /**
   * DeSerializer for `Edm.Duration` to the generic type `DurationT`.
   */
  'Edm.Duration': DeSerializer<DurationT>;
  /**
   * DeSerializer for `Edm.TimeOfDay` to the generic type `TimeOfDayT`.
   */
  'Edm.TimeOfDay': DeSerializer<TimeOfDayT>;
  /**
   * DeSerializer for `Edm.Enum` to the generic type `EnumT`.
   */
  'Edm.Enum': DeSerializer<EnumT>;
}
