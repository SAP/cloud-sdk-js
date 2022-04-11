"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity100ColApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity100Col_1 = require("./TestEntity100Col");
const TestEntity100ColRequestBuilder_1 = require("./TestEntity100ColRequestBuilder");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class TestEntity100ColApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = TestEntity100Col_1.TestEntity100Col;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new TestEntity100ColRequestBuilder_1.TestEntity100ColRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(TestEntity100Col_1.TestEntity100Col, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
             * Static representation of the [[keyTestEntity100Col]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
                KEY_TEST_ENTITY_100_COL: fieldBuilder.buildEdmTypeField('KeyTestEntity100Col', 'Edm.Int32', false),
                /**
                 * Static representation of the [[stringProperty1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_1: fieldBuilder.buildEdmTypeField('StringProperty1', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_1: fieldBuilder.buildEdmTypeField('GuidProperty1', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_1: fieldBuilder.buildEdmTypeField('BooleanProperty1', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_1: fieldBuilder.buildEdmTypeField('Int64Property1', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_1: fieldBuilder.buildEdmTypeField('DoubleProperty1', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_1: fieldBuilder.buildEdmTypeField('DecimalProperty1', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_1: fieldBuilder.buildEdmTypeField('DateProperty1', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_1: fieldBuilder.buildEdmTypeField('TimeOfDayProperty1', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty1', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty1]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty1', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[stringProperty2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_2: fieldBuilder.buildEdmTypeField('StringProperty2', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_2: fieldBuilder.buildEdmTypeField('GuidProperty2', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_2: fieldBuilder.buildEdmTypeField('BooleanProperty2', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_2: fieldBuilder.buildEdmTypeField('Int64Property2', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_2: fieldBuilder.buildEdmTypeField('DoubleProperty2', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_2: fieldBuilder.buildEdmTypeField('DecimalProperty2', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_2: fieldBuilder.buildEdmTypeField('DateProperty2', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_2: fieldBuilder.buildEdmTypeField('TimeOfDayProperty2', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty2', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty2]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty2', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[stringProperty3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_3: fieldBuilder.buildEdmTypeField('StringProperty3', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_3: fieldBuilder.buildEdmTypeField('GuidProperty3', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_3: fieldBuilder.buildEdmTypeField('BooleanProperty3', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_3: fieldBuilder.buildEdmTypeField('Int64Property3', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_3: fieldBuilder.buildEdmTypeField('DoubleProperty3', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_3: fieldBuilder.buildEdmTypeField('DecimalProperty3', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_3: fieldBuilder.buildEdmTypeField('DateProperty3', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_3: fieldBuilder.buildEdmTypeField('TimeOfDayProperty3', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty3', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty3]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty3', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[stringProperty4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_4: fieldBuilder.buildEdmTypeField('StringProperty4', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_4: fieldBuilder.buildEdmTypeField('GuidProperty4', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_4: fieldBuilder.buildEdmTypeField('BooleanProperty4', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_4: fieldBuilder.buildEdmTypeField('Int64Property4', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_4: fieldBuilder.buildEdmTypeField('DoubleProperty4', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_4: fieldBuilder.buildEdmTypeField('DecimalProperty4', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_4: fieldBuilder.buildEdmTypeField('DateProperty4', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_4: fieldBuilder.buildEdmTypeField('TimeOfDayProperty4', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty4', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty4]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty4', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[stringProperty5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_5: fieldBuilder.buildEdmTypeField('StringProperty5', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_5: fieldBuilder.buildEdmTypeField('GuidProperty5', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_5: fieldBuilder.buildEdmTypeField('BooleanProperty5', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_5: fieldBuilder.buildEdmTypeField('Int64Property5', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_5: fieldBuilder.buildEdmTypeField('DoubleProperty5', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_5: fieldBuilder.buildEdmTypeField('DecimalProperty5', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_5: fieldBuilder.buildEdmTypeField('DateProperty5', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_5: fieldBuilder.buildEdmTypeField('TimeOfDayProperty5', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty5', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty5]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty5', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[stringProperty11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_11: fieldBuilder.buildEdmTypeField('StringProperty11', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_11: fieldBuilder.buildEdmTypeField('GuidProperty11', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_11: fieldBuilder.buildEdmTypeField('BooleanProperty11', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_11: fieldBuilder.buildEdmTypeField('Int64Property11', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_11: fieldBuilder.buildEdmTypeField('DoubleProperty11', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_11: fieldBuilder.buildEdmTypeField('DecimalProperty11', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_11: fieldBuilder.buildEdmTypeField('DateProperty11', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_11: fieldBuilder.buildEdmTypeField('TimeOfDayProperty11', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_11: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty11', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty11]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_11: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty11', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[stringProperty12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_12: fieldBuilder.buildEdmTypeField('StringProperty12', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_12: fieldBuilder.buildEdmTypeField('GuidProperty12', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_12: fieldBuilder.buildEdmTypeField('BooleanProperty12', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_12: fieldBuilder.buildEdmTypeField('Int64Property12', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_12: fieldBuilder.buildEdmTypeField('DoubleProperty12', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_12: fieldBuilder.buildEdmTypeField('DecimalProperty12', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_12: fieldBuilder.buildEdmTypeField('DateProperty12', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_12: fieldBuilder.buildEdmTypeField('TimeOfDayProperty12', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_12: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty12', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty12]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_12: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty12', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[stringProperty13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_13: fieldBuilder.buildEdmTypeField('StringProperty13', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_13: fieldBuilder.buildEdmTypeField('GuidProperty13', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_13: fieldBuilder.buildEdmTypeField('BooleanProperty13', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_13: fieldBuilder.buildEdmTypeField('Int64Property13', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_13: fieldBuilder.buildEdmTypeField('DoubleProperty13', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_13: fieldBuilder.buildEdmTypeField('DecimalProperty13', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_13: fieldBuilder.buildEdmTypeField('DateProperty13', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_13: fieldBuilder.buildEdmTypeField('TimeOfDayProperty13', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_13: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty13', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty13]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_13: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty13', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[stringProperty14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_14: fieldBuilder.buildEdmTypeField('StringProperty14', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_14: fieldBuilder.buildEdmTypeField('GuidProperty14', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_14: fieldBuilder.buildEdmTypeField('BooleanProperty14', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_14: fieldBuilder.buildEdmTypeField('Int64Property14', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_14: fieldBuilder.buildEdmTypeField('DoubleProperty14', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_14: fieldBuilder.buildEdmTypeField('DecimalProperty14', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_14: fieldBuilder.buildEdmTypeField('DateProperty14', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_14: fieldBuilder.buildEdmTypeField('TimeOfDayProperty14', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_14: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty14', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty14]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_14: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty14', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[stringProperty15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_15: fieldBuilder.buildEdmTypeField('StringProperty15', 'Edm.String', true),
                /**
                 * Static representation of the [[guidProperty15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY_15: fieldBuilder.buildEdmTypeField('GuidProperty15', 'Edm.Guid', true),
                /**
                 * Static representation of the [[booleanProperty15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_15: fieldBuilder.buildEdmTypeField('BooleanProperty15', 'Edm.Boolean', true),
                /**
                 * Static representation of the [[int64Property15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_64_PROPERTY_15: fieldBuilder.buildEdmTypeField('Int64Property15', 'Edm.Int64', true),
                /**
                 * Static representation of the [[doubleProperty15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DOUBLE_PROPERTY_15: fieldBuilder.buildEdmTypeField('DoubleProperty15', 'Edm.Double', true),
                /**
                 * Static representation of the [[decimalProperty15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DECIMAL_PROPERTY_15: fieldBuilder.buildEdmTypeField('DecimalProperty15', 'Edm.Decimal', true),
                /**
                 * Static representation of the [[dateProperty15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATE_PROPERTY_15: fieldBuilder.buildEdmTypeField('DateProperty15', 'Edm.Date', true),
                /**
                 * Static representation of the [[timeOfDayProperty15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TIME_OF_DAY_PROPERTY_15: fieldBuilder.buildEdmTypeField('TimeOfDayProperty15', 'Edm.TimeOfDay', true),
                /**
                 * Static representation of the [[dataTimeOffsetDataTimeProperty15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_DATA_TIME_PROPERTY_15: fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty15', 'Edm.DateTimeOffset', true),
                /**
                 * Static representation of the [[dataTimeOffsetTimestampProperty15]] property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_15: fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty15', 'Edm.DateTimeOffset', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', TestEntity100Col_1.TestEntity100Col)
            };
        }
        return this._schema;
    }
}
exports.TestEntity100ColApi = TestEntity100ColApi;
//# sourceMappingURL=TestEntity100ColApi.js.map