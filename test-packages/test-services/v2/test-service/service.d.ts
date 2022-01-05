import { TestEntityApi } from './TestEntityApi';
import { TestEntityMultiLinkApi } from './TestEntityMultiLinkApi';
import { TestEntityOtherMultiLinkApi } from './TestEntityOtherMultiLinkApi';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import { TestEntityWithSharedEntityType1Api } from './TestEntityWithSharedEntityType1Api';
import { TestEntityWithSharedEntityType2Api } from './TestEntityWithSharedEntityType2Api';
import { TestEntityCircularLinkParentApi } from './TestEntityCircularLinkParentApi';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import { TestEntityEndsWithApi } from './TestEntityEndsWithApi';
import { TestEntityEndsWithSomethingElseApi } from './TestEntityEndsWithSomethingElseApi';
import { CaseTestApi } from './CaseTestApi';
import { Casetest_1Api } from './Casetest_1Api';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v2';
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
  DateTimeT = Moment,
  TimeT = Time
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
      DateTimeT,
      TimeT
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
    DateTimeT,
    TimeT
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
  get testEntityMultiLinkApi(): TestEntityMultiLinkApi<DeSerializersT>;
  get testEntityOtherMultiLinkApi(): TestEntityOtherMultiLinkApi<DeSerializersT>;
  get testEntityLvl2MultiLinkApi(): TestEntityLvl2MultiLinkApi<DeSerializersT>;
  get testEntitySingleLinkApi(): TestEntitySingleLinkApi<DeSerializersT>;
  get testEntityLvl2SingleLinkApi(): TestEntityLvl2SingleLinkApi<DeSerializersT>;
  get testEntityWithSharedEntityType1Api(): TestEntityWithSharedEntityType1Api<DeSerializersT>;
  get testEntityWithSharedEntityType2Api(): TestEntityWithSharedEntityType2Api<DeSerializersT>;
  get testEntityCircularLinkParentApi(): TestEntityCircularLinkParentApi<DeSerializersT>;
  get testEntityCircularLinkChildApi(): TestEntityCircularLinkChildApi<DeSerializersT>;
  get testEntityEndsWithApi(): TestEntityEndsWithApi<DeSerializersT>;
  get testEntityEndsWithSomethingElseApi(): TestEntityEndsWithSomethingElseApi<DeSerializersT>;
  get caseTestApi(): CaseTestApi<DeSerializersT>;
  get casetest_1Api(): Casetest_1Api<DeSerializersT>;
}
//# sourceMappingURL=service.d.ts.map
