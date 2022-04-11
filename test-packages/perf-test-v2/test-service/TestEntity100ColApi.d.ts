import { TestEntity100Col } from './TestEntity100Col';
import { TestEntity100ColRequestBuilder } from './TestEntity100ColRequestBuilder';
import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, OrderableEdmTypeField, EdmTypeField } from '@sap-cloud-sdk/odata-v4';
export declare class TestEntity100ColApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<TestEntity100Col<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof TestEntity100Col;
    requestBuilder(): TestEntity100ColRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<TestEntity100Col<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<TestEntity100Col<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[keyTestEntity100Col]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        KEY_TEST_ENTITY_100_COL: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int32", false, true>;
        /**
         * Static representation of the [[stringProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_1: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_1: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_1: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_2: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_2: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_2: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_3: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_3: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_3: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_4: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_4: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_4: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_5: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_5: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_5: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_11: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_11: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_11: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty11]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_11: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_12: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_12: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_12: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty12]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_12: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_13: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_13: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_13: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty13]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_13: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_14: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_14: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_14: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty14]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_14: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[stringProperty15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_15: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.String", true, true>;
        /**
         * Static representation of the [[guidProperty15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY_15: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Guid", true, true>;
        /**
         * Static representation of the [[booleanProperty15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_15: EdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Boolean", true, true>;
        /**
         * Static representation of the [[int64Property15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Int64", true, true>;
        /**
         * Static representation of the [[doubleProperty15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Double", true, true>;
        /**
         * Static representation of the [[decimalProperty15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Decimal", true, true>;
        /**
         * Static representation of the [[dateProperty15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.Date", true, true>;
        /**
         * Static representation of the [[timeOfDayProperty15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.TimeOfDay", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty15]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_15: OrderableEdmTypeField<TestEntity100Col<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, "Edm.DateTimeOffset", true, true>;
    };
}
//# sourceMappingURL=TestEntity100ColApi.d.ts.map