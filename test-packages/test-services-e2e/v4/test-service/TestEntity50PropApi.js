"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity50PropApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity50Prop_1 = require("./TestEntity50Prop");
const TestEntity50PropRequestBuilder_1 = require("./TestEntity50PropRequestBuilder");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class TestEntity50PropApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = TestEntity50Prop_1.TestEntity50Prop;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new TestEntity50PropRequestBuilder_1.TestEntity50PropRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(TestEntity50Prop_1.TestEntity50Prop, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link keyTestEntity50Prop} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                KEY_TEST_ENTITY_50_PROP: fieldBuilder.buildEdmTypeField('KeyTestEntity50Prop', 'Edm.Int32', false),
                /**
                 * Static representation of the {@link stringProperty1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_1: fieldBuilder.buildEdmTypeField('StringProperty1', 'Edm.String', true),
                /**
                 * Static representation of the {@link guidProperty1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_1: fieldBuilder.buildEdmTypeField('GuidProperty1', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link booleanProperty1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_1: fieldBuilder.buildEdmTypeField('BooleanProperty1', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link int64Property1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_1: fieldBuilder.buildEdmTypeField('Int64Property1', 'Edm.Int64', true),
                /**
                 * Static representation of the {@link doubleProperty1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_1: fieldBuilder.buildEdmTypeField('DoubleProperty1', 'Edm.Double', true),
                /**
                 * Static representation of the {@link decimalProperty1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_1: fieldBuilder.buildEdmTypeField('DecimalProperty1', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link dateProperty1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_1: fieldBuilder.buildEdmTypeField('DateProperty1', 'Edm.Date', true),
                /**
                 * Static representation of the {@link timeOfDayProperty1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_1: fieldBuilder.buildEdmTypeField('TimeOfDayProperty1', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the {@link dataTimeOffsetDataTimeProperty1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty1', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link dataTimeOffsetTimestampProperty1} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty1', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link stringProperty2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_2: fieldBuilder.buildEdmTypeField('StringProperty2', 'Edm.String', true),
                /**
                 * Static representation of the {@link guidProperty2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_2: fieldBuilder.buildEdmTypeField('GuidProperty2', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link booleanProperty2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_2: fieldBuilder.buildEdmTypeField('BooleanProperty2', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link int64Property2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_2: fieldBuilder.buildEdmTypeField('Int64Property2', 'Edm.Int64', true),
                /**
                 * Static representation of the {@link doubleProperty2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_2: fieldBuilder.buildEdmTypeField('DoubleProperty2', 'Edm.Double', true),
                /**
                 * Static representation of the {@link decimalProperty2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_2: fieldBuilder.buildEdmTypeField('DecimalProperty2', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link dateProperty2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_2: fieldBuilder.buildEdmTypeField('DateProperty2', 'Edm.Date', true),
                /**
                 * Static representation of the {@link timeOfDayProperty2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_2: fieldBuilder.buildEdmTypeField('TimeOfDayProperty2', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the {@link dataTimeOffsetDataTimeProperty2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty2', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link dataTimeOffsetTimestampProperty2} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty2', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link stringProperty3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_3: fieldBuilder.buildEdmTypeField('StringProperty3', 'Edm.String', true),
                /**
                 * Static representation of the {@link guidProperty3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_3: fieldBuilder.buildEdmTypeField('GuidProperty3', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link booleanProperty3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_3: fieldBuilder.buildEdmTypeField('BooleanProperty3', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link int64Property3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_3: fieldBuilder.buildEdmTypeField('Int64Property3', 'Edm.Int64', true),
                /**
                 * Static representation of the {@link doubleProperty3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_3: fieldBuilder.buildEdmTypeField('DoubleProperty3', 'Edm.Double', true),
                /**
                 * Static representation of the {@link decimalProperty3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_3: fieldBuilder.buildEdmTypeField('DecimalProperty3', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link dateProperty3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_3: fieldBuilder.buildEdmTypeField('DateProperty3', 'Edm.Date', true),
                /**
                 * Static representation of the {@link timeOfDayProperty3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_3: fieldBuilder.buildEdmTypeField('TimeOfDayProperty3', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the {@link dataTimeOffsetDataTimeProperty3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty3', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link dataTimeOffsetTimestampProperty3} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty3', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link stringProperty4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_4: fieldBuilder.buildEdmTypeField('StringProperty4', 'Edm.String', true),
                /**
                 * Static representation of the {@link guidProperty4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_4: fieldBuilder.buildEdmTypeField('GuidProperty4', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link booleanProperty4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_4: fieldBuilder.buildEdmTypeField('BooleanProperty4', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link int64Property4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_4: fieldBuilder.buildEdmTypeField('Int64Property4', 'Edm.Int64', true),
                /**
                 * Static representation of the {@link doubleProperty4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_4: fieldBuilder.buildEdmTypeField('DoubleProperty4', 'Edm.Double', true),
                /**
                 * Static representation of the {@link decimalProperty4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_4: fieldBuilder.buildEdmTypeField('DecimalProperty4', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link dateProperty4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_4: fieldBuilder.buildEdmTypeField('DateProperty4', 'Edm.Date', true),
                /**
                 * Static representation of the {@link timeOfDayProperty4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_4: fieldBuilder.buildEdmTypeField('TimeOfDayProperty4', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the {@link dataTimeOffsetDataTimeProperty4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty4', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link dataTimeOffsetTimestampProperty4} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty4', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link stringProperty5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_5: fieldBuilder.buildEdmTypeField('StringProperty5', 'Edm.String', true),
                /**
                 * Static representation of the {@link guidProperty5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_5: fieldBuilder.buildEdmTypeField('GuidProperty5', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link booleanProperty5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_5: fieldBuilder.buildEdmTypeField('BooleanProperty5', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link int64Property5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_5: fieldBuilder.buildEdmTypeField('Int64Property5', 'Edm.Int64', true),
                /**
                 * Static representation of the {@link doubleProperty5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_5: fieldBuilder.buildEdmTypeField('DoubleProperty5', 'Edm.Double', true),
                /**
                 * Static representation of the {@link decimalProperty5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_5: fieldBuilder.buildEdmTypeField('DecimalProperty5', 'Edm.Decimal', true),
                /**
                 * Static representation of the {@link dateProperty5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_5: fieldBuilder.buildEdmTypeField('DateProperty5', 'Edm.Date', true),
                /**
                 * Static representation of the {@link timeOfDayProperty5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_5: fieldBuilder.buildEdmTypeField('TimeOfDayProperty5', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the {@link dataTimeOffsetDataTimeProperty5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty5', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the {@link dataTimeOffsetTimestampProperty5} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty5', 'Edm.DateTimeOffset', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', TestEntity50Prop_1.TestEntity50Prop)
            };
        }
        return this._schema;
    }
}
exports.TestEntity50PropApi = TestEntity50PropApi;
//# sourceMappingURL=TestEntity50PropApi.js.map