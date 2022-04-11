"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntity100Col = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntity100ColRequestBuilder_1 = require("./TestEntity100ColRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "TestEntity100Col" of service "TestService".
 */
var TestEntity100Col = /** @class */ (function (_super) {
    __extends(TestEntity100Col, _super);
    function TestEntity100Col() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances of `TestEntity100Col`.
     * @returns A builder that constructs instances of entity type `TestEntity100Col`.
     */
    TestEntity100Col.builder = function () {
        return core_1.EntityV4.entityBuilder(TestEntity100Col);
    };
    /**
     * Returns a request builder to construct requests for operations on the `TestEntity100Col` entity type.
     * @returns A `TestEntity100Col` request builder.
     */
    TestEntity100Col.requestBuilder = function () {
        return new TestEntity100ColRequestBuilder_1.TestEntity100ColRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity100Col`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntity100Col`.
     */
    TestEntity100Col.customField = function (fieldName) {
        return core_1.EntityV4.customFieldSelector(fieldName, TestEntity100Col);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    TestEntity100Col.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for TestEntity100Col.
     */
    TestEntity100Col._entityName = 'TestEntity100Col';
    /**
     * Default url path for the according service.
     */
    TestEntity100Col._defaultServicePath = '/odata/test-service';
    return TestEntity100Col;
}(core_1.EntityV4));
exports.TestEntity100Col = TestEntity100Col;
(function (TestEntity100Col) {
    var _fieldBuilder = new core_1.FieldBuilder(TestEntity100Col);
    /**
     * Static representation of the [[keyTestEntity100Col]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.KEY_TEST_ENTITY_100_COL = _fieldBuilder.buildEdmTypeField('KeyTestEntity100Col', 'Edm.Int32', false);
    /**
     * Static representation of the [[stringProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('StringProperty1', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('GuidProperty1', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('BooleanProperty1', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('Int64Property1', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DoubleProperty1', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DecimalProperty1', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DateProperty1', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty1', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty1', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty1', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('StringProperty2', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('GuidProperty2', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('BooleanProperty2', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('Int64Property2', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DoubleProperty2', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DecimalProperty2', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DateProperty2', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty2', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty2', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty2', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('StringProperty3', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('GuidProperty3', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('BooleanProperty3', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('Int64Property3', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DoubleProperty3', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DecimalProperty3', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DateProperty3', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty3', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty3', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty3', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('StringProperty4', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('GuidProperty4', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('BooleanProperty4', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('Int64Property4', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DoubleProperty4', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DecimalProperty4', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DateProperty4', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty4', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty4', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty4', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('StringProperty5', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('GuidProperty5', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('BooleanProperty5', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('Int64Property5', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DoubleProperty5', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DecimalProperty5', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DateProperty5', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty5', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty5', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty5', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('StringProperty11', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('GuidProperty11', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('BooleanProperty11', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('Int64Property11', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('DoubleProperty11', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('DecimalProperty11', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('DateProperty11', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty11', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty11', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty11]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_11 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty11', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('StringProperty12', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('GuidProperty12', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('BooleanProperty12', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('Int64Property12', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('DoubleProperty12', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('DecimalProperty12', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('DateProperty12', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty12', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty12', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty12]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_12 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty12', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('StringProperty13', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('GuidProperty13', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('BooleanProperty13', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('Int64Property13', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('DoubleProperty13', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('DecimalProperty13', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('DateProperty13', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty13', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty13', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty13]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_13 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty13', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('StringProperty14', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('GuidProperty14', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('BooleanProperty14', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('Int64Property14', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('DoubleProperty14', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('DecimalProperty14', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('DateProperty14', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty14', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty14', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty14]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_14 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty14', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.STRING_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('StringProperty15', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.GUID_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('GuidProperty15', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.BOOLEAN_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('BooleanProperty15', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.INT_64_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('Int64Property15', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DOUBLE_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('DoubleProperty15', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DECIMAL_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('DecimalProperty15', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATE_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('DateProperty15', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.TIME_OF_DAY_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty15', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty15', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty15]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_15 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty15', 'Edm.DateTimeOffset', true);
    /**
     * All fields of the TestEntity100Col entity.
     */
    TestEntity100Col._allFields = [
        TestEntity100Col.KEY_TEST_ENTITY_100_COL,
        TestEntity100Col.STRING_PROPERTY_1,
        TestEntity100Col.GUID_PROPERTY_1,
        TestEntity100Col.BOOLEAN_PROPERTY_1,
        TestEntity100Col.INT_64_PROPERTY_1,
        TestEntity100Col.DOUBLE_PROPERTY_1,
        TestEntity100Col.DECIMAL_PROPERTY_1,
        TestEntity100Col.DATE_PROPERTY_1,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_1,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1,
        TestEntity100Col.STRING_PROPERTY_2,
        TestEntity100Col.GUID_PROPERTY_2,
        TestEntity100Col.BOOLEAN_PROPERTY_2,
        TestEntity100Col.INT_64_PROPERTY_2,
        TestEntity100Col.DOUBLE_PROPERTY_2,
        TestEntity100Col.DECIMAL_PROPERTY_2,
        TestEntity100Col.DATE_PROPERTY_2,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_2,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2,
        TestEntity100Col.STRING_PROPERTY_3,
        TestEntity100Col.GUID_PROPERTY_3,
        TestEntity100Col.BOOLEAN_PROPERTY_3,
        TestEntity100Col.INT_64_PROPERTY_3,
        TestEntity100Col.DOUBLE_PROPERTY_3,
        TestEntity100Col.DECIMAL_PROPERTY_3,
        TestEntity100Col.DATE_PROPERTY_3,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_3,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3,
        TestEntity100Col.STRING_PROPERTY_4,
        TestEntity100Col.GUID_PROPERTY_4,
        TestEntity100Col.BOOLEAN_PROPERTY_4,
        TestEntity100Col.INT_64_PROPERTY_4,
        TestEntity100Col.DOUBLE_PROPERTY_4,
        TestEntity100Col.DECIMAL_PROPERTY_4,
        TestEntity100Col.DATE_PROPERTY_4,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_4,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4,
        TestEntity100Col.STRING_PROPERTY_5,
        TestEntity100Col.GUID_PROPERTY_5,
        TestEntity100Col.BOOLEAN_PROPERTY_5,
        TestEntity100Col.INT_64_PROPERTY_5,
        TestEntity100Col.DOUBLE_PROPERTY_5,
        TestEntity100Col.DECIMAL_PROPERTY_5,
        TestEntity100Col.DATE_PROPERTY_5,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_5,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5,
        TestEntity100Col.STRING_PROPERTY_11,
        TestEntity100Col.GUID_PROPERTY_11,
        TestEntity100Col.BOOLEAN_PROPERTY_11,
        TestEntity100Col.INT_64_PROPERTY_11,
        TestEntity100Col.DOUBLE_PROPERTY_11,
        TestEntity100Col.DECIMAL_PROPERTY_11,
        TestEntity100Col.DATE_PROPERTY_11,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_11,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_11,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_11,
        TestEntity100Col.STRING_PROPERTY_12,
        TestEntity100Col.GUID_PROPERTY_12,
        TestEntity100Col.BOOLEAN_PROPERTY_12,
        TestEntity100Col.INT_64_PROPERTY_12,
        TestEntity100Col.DOUBLE_PROPERTY_12,
        TestEntity100Col.DECIMAL_PROPERTY_12,
        TestEntity100Col.DATE_PROPERTY_12,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_12,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_12,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_12,
        TestEntity100Col.STRING_PROPERTY_13,
        TestEntity100Col.GUID_PROPERTY_13,
        TestEntity100Col.BOOLEAN_PROPERTY_13,
        TestEntity100Col.INT_64_PROPERTY_13,
        TestEntity100Col.DOUBLE_PROPERTY_13,
        TestEntity100Col.DECIMAL_PROPERTY_13,
        TestEntity100Col.DATE_PROPERTY_13,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_13,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_13,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_13,
        TestEntity100Col.STRING_PROPERTY_14,
        TestEntity100Col.GUID_PROPERTY_14,
        TestEntity100Col.BOOLEAN_PROPERTY_14,
        TestEntity100Col.INT_64_PROPERTY_14,
        TestEntity100Col.DOUBLE_PROPERTY_14,
        TestEntity100Col.DECIMAL_PROPERTY_14,
        TestEntity100Col.DATE_PROPERTY_14,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_14,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_14,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_14,
        TestEntity100Col.STRING_PROPERTY_15,
        TestEntity100Col.GUID_PROPERTY_15,
        TestEntity100Col.BOOLEAN_PROPERTY_15,
        TestEntity100Col.INT_64_PROPERTY_15,
        TestEntity100Col.DOUBLE_PROPERTY_15,
        TestEntity100Col.DECIMAL_PROPERTY_15,
        TestEntity100Col.DATE_PROPERTY_15,
        TestEntity100Col.TIME_OF_DAY_PROPERTY_15,
        TestEntity100Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_15,
        TestEntity100Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_15
    ];
    /**
     * All fields selector.
     */
    TestEntity100Col.ALL_FIELDS = new core_1.AllFields('*', TestEntity100Col);
    /**
     * All key fields of the TestEntity100Col entity.
     */
    TestEntity100Col._keyFields = [TestEntity100Col.KEY_TEST_ENTITY_100_COL];
    /**
     * Mapping of all key field names to the respective static field property TestEntity100Col.
     */
    TestEntity100Col._keys = TestEntity100Col._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(TestEntity100Col = exports.TestEntity100Col || (exports.TestEntity100Col = {}));
exports.TestEntity100Col = TestEntity100Col;
//# sourceMappingURL=TestEntity100Col.js.map