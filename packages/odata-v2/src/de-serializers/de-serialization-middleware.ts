import BigNumber from 'bignumber.js';
import {
  DeSerializationMiddleware as DeSerializationMiddlewareBase,
  DeSerializer,
  EdmTypeCommon,
  ExclusiveEdmTypeV2,
  Time
} from '@sap-cloud-sdk/odata-common';
import moment from 'moment';

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
  DateTimeT = moment.Moment,
  DateTimeOffsetT = moment.Moment,
  TimeT = Time
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
  'Edm.DateTime': DeSerializer<DateTimeT>;
  'Edm.DateTimeOffset': DeSerializer<DateTimeOffsetT>;
  'Edm.Time': DeSerializer<TimeT>;
}

export type DeSerializationMiddlewareV2BASE = {
  [P in EdmTypeCommon | ExclusiveEdmTypeV2]: DeSerializer<any>;
};
