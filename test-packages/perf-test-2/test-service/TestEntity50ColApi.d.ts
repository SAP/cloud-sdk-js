import { TestEntity50Col } from './TestEntity50Col';
import { TestEntity50ColRequestBuilder } from './TestEntity50ColRequestBuilder';
import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, OrderableEdmTypeField, EdmTypeField } from '@sap-cloud-sdk/odata-v4';
export declare class TestEntity50ColApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<TestEntity50Col<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof TestEntity50Col;
    requestBuilder(): TestEntity50ColRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<TestEntity50Col<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntity50Col<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[keyTestEntity50Col]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        KEY_TEST_ENTITY_50_COL: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int32", false, true>;
        /**
         * Static representation of the [[stringProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_1: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_1: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_1: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_2: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_2: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_2: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_3: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_3: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_3: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_4: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_4: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_4: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_5: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_5: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_5: EdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5: OrderableEdmTypeField<TestEntity50Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
    };
}
//# sourceMappingURL=TestEntity50ColApi.d.ts.map