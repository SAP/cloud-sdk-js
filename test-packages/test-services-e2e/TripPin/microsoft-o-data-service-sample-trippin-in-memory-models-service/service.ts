/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PhotosApi } from './PhotosApi';
import { PeopleApi } from './PeopleApi';
import { AirlinesApi } from './AirlinesApi';
import { AirportsApi } from './AirportsApi';
import {
  getNearestAirport,
  resetDataSource,
  GetNearestAirportParameters,
  ResetDataSourceParameters
} from './operations';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import {
  defaultDeSerializers,
  DeSerializers,
  DefaultDeSerializers,
  mergeDefaultDeSerializersWith,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';

export function microsoftODataServiceSampleTrippinInMemoryModelsService<
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
  deSerializers: Partial<
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
  > = defaultDeSerializers as any
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
> {
  return new MicrosoftODataServiceSampleTrippinInMemoryModelsService(
    mergeDefaultDeSerializersWith(deSerializers)
  );
}
class MicrosoftODataServiceSampleTrippinInMemoryModelsService<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis: Record<string, any> = {};
  private deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT) {
    this.deSerializers = deSerializers;
  }

  private initApi(key: string, entityApi: any): any {
    if (!this.apis[key]) {
      this.apis[key] = entityApi._privateFactory(this.deSerializers);
    }
    return this.apis[key];
  }

  get photosApi(): PhotosApi<DeSerializersT> {
    return this.initApi('photosApi', PhotosApi);
  }

  get peopleApi(): PeopleApi<DeSerializersT> {
    const api = this.initApi('peopleApi', PeopleApi);
    const linkedApis = [
      this.initApi('peopleApi', PeopleApi),
      this.initApi('photosApi', PhotosApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get airlinesApi(): AirlinesApi<DeSerializersT> {
    return this.initApi('airlinesApi', AirlinesApi);
  }

  get airportsApi(): AirportsApi<DeSerializersT> {
    return this.initApi('airportsApi', AirportsApi);
  }

  get operations() {
    return {
      getNearestAirport: (
        parameter: GetNearestAirportParameters<DeSerializersT>
      ) => getNearestAirport(parameter, this.deSerializers),
      resetDataSource: (parameter: ResetDataSourceParameters<DeSerializersT>) =>
        resetDataSource(parameter, this.deSerializers)
    };
  }

  get batch(): typeof batch {
    return batch;
  }

  get changeset(): typeof changeset {
    return changeset;
  }
}
