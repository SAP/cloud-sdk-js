/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { PhotosApi } from './PhotosApi';
import { PeopleApi } from './PeopleApi';
import { AirlinesApi } from './AirlinesApi';
import { AirportsApi } from './AirportsApi';
import { Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import {
  defaultDeSerializers,
  DeSerializers,
  DefaultDeSerializers,
  mergeDefaultDeSerializersWith
} from '@sap-cloud-sdk/odata-v4';

export function builder<
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
  TimeOfDayT = Time
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
      TimeOfDayT
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
    TimeOfDayT
  >
> {
  return new MicrosoftODataServiceSampleTrippinInMemoryModelsService(
    mergeDefaultDeSerializersWith(deSerializers)
  );
}
export class MicrosoftODataServiceSampleTrippinInMemoryModelsService<
  T extends DeSerializers = DefaultDeSerializers
> {
  private apis: Record<string, any> = {};
  private deSerializers: T;

  constructor(deSerializers: T) {
    this.deSerializers = deSerializers;
  }

  private initApi(key: string, ctor: new (...args: any[]) => any): any {
    if (!this.apis[key]) {
      this.apis[key] = new ctor(this.deSerializers);
    }
    return this.apis[key];
  }

  get photosApi(): PhotosApi<T> {
    const api = this.initApi('photosApi', PhotosApi);

    return api;
  }

  get peopleApi(): PeopleApi<T> {
    const api = this.initApi('peopleApi', PeopleApi);
    const linkedApis = [
      this.initApi('peopleApi', PeopleApi),
      this.initApi('photosApi', PhotosApi)
    ];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get airlinesApi(): AirlinesApi<T> {
    const api = this.initApi('airlinesApi', AirlinesApi);

    return api;
  }

  get airportsApi(): AirportsApi<T> {
    const api = this.initApi('airportsApi', AirportsApi);

    return api;
  }
}
