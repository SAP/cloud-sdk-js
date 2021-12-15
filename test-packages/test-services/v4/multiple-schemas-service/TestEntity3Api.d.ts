import { TestEntity3 } from './TestEntity3';
import { TestEntity3RequestBuilder } from './TestEntity3RequestBuilder';
import { TestComplexType2Field } from './TestComplexType2';
import { TestEnumType2 } from './TestEnumType2';
import { CustomField, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { EdmTypeField, EnumField, AllFields, EntityBuilderType, EntityApi, Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export declare class TestEntity3Api<BinaryT = string, BooleanT = boolean, ByteT = number, DecimalT = BigNumber, DoubleT = number, FloatT = number, Int16T = number, Int32T = number, Int64T = BigNumber, GuidT = string, SByteT = number, SingleT = number, StringT = string, AnyT = any, DateTimeOffsetT = Moment, DateT = Moment, DurationT = Duration, TimeOfDayT = Time> implements EntityApi<TestEntity3<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>> {
    deSerializers: DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>;
    constructor(deSerializers?: Partial<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof TestEntity3;
    requestBuilder(): TestEntity3RequestBuilder<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>;
    entityBuilder(): EntityBuilderType<TestEntity3<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntity3<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<TestEntity3<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        KEY_PROPERTY_STRING: EdmTypeField<TestEntity3<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, "Edm.String", false, true>;
        /**
         * Static representation of the [[enumProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_PROPERTY: EnumField<TestEntity3<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, TestEnumType2, true, true>;
        /**
         * Static representation of the [[complexTypeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPLEX_TYPE_PROPERTY: TestComplexType2Field<TestEntity3<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, true, true>;
    };
}
//# sourceMappingURL=TestEntity3Api.d.ts.map