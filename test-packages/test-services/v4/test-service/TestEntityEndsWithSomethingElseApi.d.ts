import { TestEntityEndsWithSomethingElse } from './TestEntityEndsWithSomethingElse';
import { TestEntityEndsWithSomethingElseRequestBuilder } from './TestEntityEndsWithSomethingElseRequestBuilder';
import { CustomField, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { EdmTypeField, AllFields, EntityBuilderType, EntityApi, Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export declare class TestEntityEndsWithSomethingElseApi<BinaryT = string, BooleanT = boolean, ByteT = number, DecimalT = BigNumber, DoubleT = number, FloatT = number, Int16T = number, Int32T = number, Int64T = BigNumber, GuidT = string, SByteT = number, SingleT = number, StringT = string, AnyT = any, DateTimeOffsetT = Moment, DateT = Moment, DurationT = Duration, TimeOfDayT = Time> implements EntityApi<TestEntityEndsWithSomethingElse<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>> {
    deSerializers: DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>;
    constructor(deSerializers?: Partial<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof TestEntityEndsWithSomethingElse;
    requestBuilder(): TestEntityEndsWithSomethingElseRequestBuilder<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>;
    entityBuilder(): EntityBuilderType<TestEntityEndsWithSomethingElse<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntityEndsWithSomethingElse<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<TestEntityEndsWithSomethingElse<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        KEY_PROPERTY: EdmTypeField<TestEntityEndsWithSomethingElse<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, "Edm.String", false, true>;
    };
}
//# sourceMappingURL=TestEntityEndsWithSomethingElseApi.d.ts.map