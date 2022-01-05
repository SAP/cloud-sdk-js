import { TestEntityApi } from './TestEntityApi';
import { TestEntityWithEnumKeyApi } from './TestEntityWithEnumKeyApi';
import { TestEntityWithSharedEntityType1Api } from './TestEntityWithSharedEntityType1Api';
import { TestEntityWithSharedEntityType2Api } from './TestEntityWithSharedEntityType2Api';
import { TestEntityMultiLinkApi } from './TestEntityMultiLinkApi';
import { TestEntityOtherMultiLinkApi } from './TestEntityOtherMultiLinkApi';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntityLvl3MultiLinkApi } from './TestEntityLvl3MultiLinkApi';
import { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import { TestEntityCircularLinkParentApi } from './TestEntityCircularLinkParentApi';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import { TestEntityEndsWithApi } from './TestEntityEndsWithApi';
import { TestEntityEndsWithSomethingElseApi } from './TestEntityEndsWithSomethingElseApi';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v4';
export declare function testService<
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
      TimeOfDayT
    >
  >
): TestService<
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
>;
export declare class TestService<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get testEntityApi(): TestEntityApi<DeSerializersT>;
  get testEntityWithEnumKeyApi(): TestEntityWithEnumKeyApi<DeSerializersT>;
  get testEntityWithSharedEntityType1Api(): TestEntityWithSharedEntityType1Api<DeSerializersT>;
  get testEntityWithSharedEntityType2Api(): TestEntityWithSharedEntityType2Api<DeSerializersT>;
  get testEntityMultiLinkApi(): TestEntityMultiLinkApi<DeSerializersT>;
  get testEntityOtherMultiLinkApi(): TestEntityOtherMultiLinkApi<DeSerializersT>;
  get testEntityLvl2MultiLinkApi(): TestEntityLvl2MultiLinkApi<DeSerializersT>;
  get testEntityLvl3MultiLinkApi(): TestEntityLvl3MultiLinkApi<DeSerializersT>;
  get testEntitySingleLinkApi(): TestEntitySingleLinkApi<DeSerializersT>;
  get testEntityLvl2SingleLinkApi(): TestEntityLvl2SingleLinkApi<DeSerializersT>;
  get testEntityCircularLinkParentApi(): TestEntityCircularLinkParentApi<DeSerializersT>;
  get testEntityCircularLinkChildApi(): TestEntityCircularLinkChildApi<DeSerializersT>;
  get testEntityEndsWithApi(): TestEntityEndsWithApi<DeSerializersT>;
  get testEntityEndsWithSomethingElseApi(): TestEntityEndsWithSomethingElseApi<DeSerializersT>;
}
//# sourceMappingURL=service.d.ts.map
