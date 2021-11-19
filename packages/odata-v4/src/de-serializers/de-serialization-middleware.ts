import BigNumber from 'bignumber.js';
import { Time } from '@sap-cloud-sdk/odata-common/internal';
import moment from 'moment';
import {
  DeSerializer,
  DeSerializationMiddleware as DeSerializationMiddlewareBase
} from '@sap-cloud-sdk/odata-common/src/de-serializers/de-serialization-middleware';

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
  AnyT = any,
  DateT = moment.Moment,
  DateTimeOffsetT = moment.Moment,
  DurationT = moment.Duration,
  TimeOfDayT = Time,
  EnumT = any
> extends DeSerializationMiddlewareBase<
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
