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
import { Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import { DeSerializers, DefaultDeSerializers } from '@sap-cloud-sdk/odata-v4';
export declare function builder<
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
  T extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: T);
  private initApi;
  get testEntityApi(): TestEntityApi<T>;
  get testEntityWithEnumKeyApi(): TestEntityWithEnumKeyApi<T>;
  get testEntityWithSharedEntityType1Api(): TestEntityWithSharedEntityType1Api<T>;
  get testEntityWithSharedEntityType2Api(): TestEntityWithSharedEntityType2Api<T>;
  get testEntityMultiLinkApi(): TestEntityMultiLinkApi<T>;
  get testEntityOtherMultiLinkApi(): TestEntityOtherMultiLinkApi<T>;
  get testEntityLvl2MultiLinkApi(): TestEntityLvl2MultiLinkApi<T>;
  get testEntityLvl3MultiLinkApi(): TestEntityLvl3MultiLinkApi<T>;
  get testEntitySingleLinkApi(): TestEntitySingleLinkApi<T>;
  get testEntityLvl2SingleLinkApi(): TestEntityLvl2SingleLinkApi<T>;
  get testEntityCircularLinkParentApi(): TestEntityCircularLinkParentApi<T>;
  get testEntityCircularLinkChildApi(): TestEntityCircularLinkChildApi<T>;
  get testEntityEndsWithApi(): TestEntityEndsWithApi<T>;
  get testEntityEndsWithSomethingElseApi(): TestEntityEndsWithSomethingElseApi<T>;
}
//# sourceMappingURL=service.d.ts.map
