import { TestEntity } from './TestEntity';
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { CustomField, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import {
  Time,
  EntityBuilderType,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
export declare class TestEntityApi<
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
  DateTimeT = Moment,
  DateTimeOffsetT = Moment,
  TimeT = Time
> implements
    EntityApi<
      TestEntity<
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
          DateTimeT,
          DateTimeOffsetT,
          TimeT
        >
      >,
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
        DateTimeT,
        DateTimeOffsetT,
        TimeT
      >
    >
{
  deSerializers: DeSerializers<
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
    DateTimeT,
    DateTimeOffsetT,
    TimeT
  >;
  schema: Record<string, any>;
  constructor(
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
        DateTimeT,
        DateTimeOffsetT,
        TimeT
      >
    >
  );
  entityConstructor: typeof TestEntity;
  requestBuilder(): TestEntityRequestBuilder<
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
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >
  >;
  entityBuilder(): EntityBuilderType<
    TestEntity<
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
        DateTimeT,
        DateTimeOffsetT,
        TimeT
      >
    >,
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
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntity<
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
        DateTimeT,
        DateTimeOffsetT,
        TimeT
      >
    >,
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
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >,
    NullableT
  >;
}
//# sourceMappingURL=TestEntityApi.d.ts.map
