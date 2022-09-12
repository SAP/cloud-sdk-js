import { PhotosApi } from './PhotosApi';
import { PeopleApi } from './PeopleApi';
import { AirlinesApi } from './AirlinesApi';
import { AirportsApi } from './AirportsApi';
import { GetNearestAirportParameters } from './function-imports';
import { ResetDataSourceParameters } from './action-imports';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';
export declare function microsoftODataServiceSampleTrippinInMemoryModelsService<
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
  DateTimeOffsetT = Moment,
  DateT = Moment,
  DurationT = Duration,
  TimeOfDayT = Time,
  EnumT = any
>(
  deSerializers?: Partial<
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
      DateTimeOffsetT,
      DateT,
      DurationT,
      TimeOfDayT,
      EnumT
    >
  >
): MicrosoftODataServiceSampleTrippinInMemoryModelsService<
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
    DateTimeOffsetT,
    DateT,
    DurationT,
    TimeOfDayT,
    EnumT
  >
>;
declare class MicrosoftODataServiceSampleTrippinInMemoryModelsService<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get photosApi(): PhotosApi<DeSerializersT>;
  get peopleApi(): PeopleApi<DeSerializersT>;
  get airlinesApi(): AirlinesApi<DeSerializersT>;
  get airportsApi(): AirportsApi<DeSerializersT>;
  get functionImports(): {
    getNearestAirport: (
      parameter: GetNearestAirportParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      GetNearestAirportParameters<DeSerializersT>,
      import('./Airports').Airports<DefaultDeSerializers>
    >;
  };
  get actionImports(): {
    resetDataSource: (
      parameter: ResetDataSourceParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
      DeSerializersT,
      ResetDataSourceParameters<DeSerializersT>,
      undefined
    >;
  };
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
//# sourceMappingURL=service.d.ts.map
