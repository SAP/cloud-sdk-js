import { TestEntity1Api } from './TestEntity1Api';
import { TestEntity2Api } from './TestEntity2Api';
import { TestEntity3Api } from './TestEntity3Api';
import { TestEntity4Api } from './TestEntity4Api';
import { Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import { DeSerializers } from '@sap-cloud-sdk/odata-v4';
export declare class MultipleSchemasService<BinaryT = string, BooleanT = boolean, ByteT = number, DecimalT = BigNumber, DoubleT = number, FloatT = number, Int16T = number, Int32T = number, Int64T = BigNumber, GuidT = string, SByteT = number, SingleT = number, StringT = string, AnyT = any, DateTimeOffsetT = Moment, DateT = Moment, DurationT = Duration, TimeOfDayT = Time> {
    private apis;
    private deSerializers;
    constructor(deSerializers?: Partial<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>);
    private initApi;
    get testEntity1Api(): TestEntity1Api<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>;
    get testEntity2Api(): TestEntity2Api<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>;
    get testEntity3Api(): TestEntity3Api<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>;
    get testEntity4Api(): TestEntity4Api<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>;
}
//# sourceMappingURL=service.d.ts.map