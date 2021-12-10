import { TestEntityCircularLinkChild } from './TestEntityCircularLinkChild';
import { TestEntityCircularLinkChildRequestBuilder } from './TestEntityCircularLinkChildRequestBuilder';
import { CustomField, DeSerializers } from '@sap-cloud-sdk/odata-v2';
import {
  EntityBuilderType,
  EntityApi,
  Time
} from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
export declare class TestEntityCircularLinkChildApi<
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
      TestEntityCircularLinkChild<
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
  entityConstructor: typeof TestEntityCircularLinkChild;
  requestBuilder(): TestEntityCircularLinkChildRequestBuilder<
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
    TestEntityCircularLinkChild<
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
    TestEntityCircularLinkChild<
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
//# sourceMappingURL=TestEntityCircularLinkChildApi.d.ts.map
