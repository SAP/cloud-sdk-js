import { MultiSchemaTestEntityApi } from './MultiSchemaTestEntityApi';
import { Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
import { DeSerializers } from '@sap-cloud-sdk/odata-v2';
export declare class MultipleSchemasService<BinaryT = string, BooleanT = boolean, ByteT = number, DecimalT = BigNumber, DoubleT = number, FloatT = number, Int16T = number, Int32T = number, Int64T = BigNumber, GuidT = string, SByteT = number, SingleT = number, StringT = string, AnyT = any, DateTimeOffsetT = Moment, DateTimeT = Moment, TimeT = Time> {
    private apis;
    private deSerializers;
    constructor(deSerializers?: Partial<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateTimeT, TimeT>>);
    private initApi;
    get multiSchemaTestEntityApi(): MultiSchemaTestEntityApi<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateTimeT, TimeT>;
}
//# sourceMappingURL=service.d.ts.map