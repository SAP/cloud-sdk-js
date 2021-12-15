import { TestEntitySingleLink } from './TestEntitySingleLink';
import { TestEntitySingleLinkRequestBuilder } from './TestEntitySingleLinkRequestBuilder';
import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import { CustomField, DeSerializers } from '@sap-cloud-sdk/odata-v4';
import { EdmTypeField, OrderableEdmTypeField, OneToManyLink, OneToOneLink, AllFields, EntityBuilderType, EntityApi, Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export declare class TestEntitySingleLinkApi<BinaryT = string, BooleanT = boolean, ByteT = number, DecimalT = BigNumber, DoubleT = number, FloatT = number, Int16T = number, Int32T = number, Int64T = BigNumber, GuidT = string, SByteT = number, SingleT = number, StringT = string, AnyT = any, DateTimeOffsetT = Moment, DateT = Moment, DurationT = Duration, TimeOfDayT = Time> implements EntityApi<TestEntitySingleLink<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>> {
    deSerializers: DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>;
    constructor(deSerializers?: Partial<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        TestEntityLvl2MultiLinkApi<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>,
        TestEntityLvl2SingleLinkApi<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>
    ]): this;
    entityConstructor: typeof TestEntitySingleLink;
    requestBuilder(): TestEntitySingleLinkRequestBuilder<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>;
    entityBuilder(): EntityBuilderType<TestEntitySingleLink<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntitySingleLink<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT>, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<TestEntitySingleLink<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_MULTI_LINK: OneToManyLink<TestEntitySingleLink<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, TestEntityLvl2MultiLink<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>>>;
        /**
         * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SINGLE_LINK: OneToOneLink<TestEntitySingleLink<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, TestEntityLvl2SingleLink<DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>>>;
        /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        STRING_PROPERTY: EdmTypeField<TestEntitySingleLink<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, "Edm.String", true, true>;
        /**
         * Static representation of the [[booleanProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY: EdmTypeField<TestEntitySingleLink<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[guidProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY: EdmTypeField<TestEntitySingleLink<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[int16Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_16_PROPERTY: OrderableEdmTypeField<TestEntitySingleLink<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, "Edm.Int16", true, true>;
        /**
         * Static representation of the [[keyProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY: EdmTypeField<TestEntitySingleLink<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializers<BinaryT, BooleanT, ByteT, DecimalT, DoubleT, FloatT, Int16T, Int32T, Int64T, GuidT, SByteT, SingleT, StringT, AnyT, DateTimeOffsetT, DateT, DurationT, TimeOfDayT, any>, "Edm.String", false, true>;
    };
}
//# sourceMappingURL=TestEntitySingleLinkApi.d.ts.map