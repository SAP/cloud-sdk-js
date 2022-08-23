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
  DateTimeT = any,
  DateTimeOffsetT = any,
  TimeT = any
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
   * TODO-JSDOC.
   */
  'Edm.DateTime': DeSerializer<DateTimeT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.DateTimeOffset': DeSerializer<DateTimeOffsetT>;
  /**
   * TODO-JSDOC.
   */
  'Edm.Time': DeSerializer<TimeT>;
}
