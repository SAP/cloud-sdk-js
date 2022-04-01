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
exports.TestEntity50Col = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntity50ColRequestBuilder_1 = require("./TestEntity50ColRequestBuilder");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "TestEntity50Col" of service "TestService".
 */
var TestEntity50Col = /** @class */ (function (_super) {
    __extends(TestEntity50Col, _super);
    function TestEntity50Col() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances of `TestEntity50Col`.
     * @returns A builder that constructs instances of entity type `TestEntity50Col`.
     */
    TestEntity50Col.builder = function () {
        return core_1.EntityV4.entityBuilder(TestEntity50Col);
    };
    /**
     * Returns a request builder to construct requests for operations on the `TestEntity50Col` entity type.
     * @returns A `TestEntity50Col` request builder.
     */
    TestEntity50Col.requestBuilder = function () {
        return new TestEntity50ColRequestBuilder_1.TestEntity50ColRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity50Col`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntity50Col`.
     */
    TestEntity50Col.customField = function (fieldName) {
        return core_1.EntityV4.customFieldSelector(fieldName, TestEntity50Col);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    TestEntity50Col.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for TestEntity50Col.
     */
    TestEntity50Col._entityName = 'TestEntity50Col';
    /**
     * Default url path for the according service.
     */
    TestEntity50Col._defaultServicePath = '/odata/test-service';
    return TestEntity50Col;
}(core_1.EntityV4));
exports.TestEntity50Col = TestEntity50Col;
(function (TestEntity50Col) {
    var _fieldBuilder = new core_1.FieldBuilder(TestEntity50Col);
    /**
     * Static representation of the [[keyTestEntity50Col]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.KEY_TEST_ENTITY_50_COL = _fieldBuilder.buildEdmTypeField('KeyTestEntity50Col', 'Edm.Int32', false);
    /**
     * Static representation of the [[stringProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.STRING_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('StringProperty1', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.GUID_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('GuidProperty1', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.BOOLEAN_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('BooleanProperty1', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.INT_64_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('Int64Property1', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DOUBLE_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DoubleProperty1', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DECIMAL_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DecimalProperty1', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATE_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DateProperty1', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.TIME_OF_DAY_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty1', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty1', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty1]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty1', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.STRING_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('StringProperty2', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.GUID_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('GuidProperty2', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.BOOLEAN_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('BooleanProperty2', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.INT_64_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('Int64Property2', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DOUBLE_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DoubleProperty2', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DECIMAL_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DecimalProperty2', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATE_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DateProperty2', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.TIME_OF_DAY_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty2', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty2', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty2]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty2', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.STRING_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('StringProperty3', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.GUID_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('GuidProperty3', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.BOOLEAN_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('BooleanProperty3', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.INT_64_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('Int64Property3', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DOUBLE_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DoubleProperty3', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DECIMAL_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DecimalProperty3', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATE_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DateProperty3', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.TIME_OF_DAY_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty3', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty3', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty3]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty3', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.STRING_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('StringProperty4', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.GUID_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('GuidProperty4', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.BOOLEAN_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('BooleanProperty4', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.INT_64_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('Int64Property4', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DOUBLE_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DoubleProperty4', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DECIMAL_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DecimalProperty4', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATE_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DateProperty4', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.TIME_OF_DAY_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty4', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty4', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty4]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty4', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[stringProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.STRING_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('StringProperty5', 'Edm.String', true);
    /**
     * Static representation of the [[guidProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.GUID_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('GuidProperty5', 'Edm.Guid', true);
    /**
     * Static representation of the [[booleanProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.BOOLEAN_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('BooleanProperty5', 'Edm.Boolean', true);
    /**
     * Static representation of the [[int64Property5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.INT_64_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('Int64Property5', 'Edm.Int64', true);
    /**
     * Static representation of the [[doubleProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DOUBLE_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DoubleProperty5', 'Edm.Double', true);
    /**
     * Static representation of the [[decimalProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DECIMAL_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DecimalProperty5', 'Edm.Decimal', true);
    /**
     * Static representation of the [[dateProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATE_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DateProperty5', 'Edm.Date', true);
    /**
     * Static representation of the [[timeOfDayProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.TIME_OF_DAY_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('TimeOfDayProperty5', 'Edm.TimeOfDay', true);
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetDataTimeProperty5', 'Edm.DateTimeOffset', true);
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty5]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5 = _fieldBuilder.buildEdmTypeField('DataTimeOffsetTimestampProperty5', 'Edm.DateTimeOffset', true);
    /**
     * All fields of the TestEntity50Col entity.
     */
    TestEntity50Col._allFields = [
        TestEntity50Col.KEY_TEST_ENTITY_50_COL,
        TestEntity50Col.STRING_PROPERTY_1,
        TestEntity50Col.GUID_PROPERTY_1,
        TestEntity50Col.BOOLEAN_PROPERTY_1,
        TestEntity50Col.INT_64_PROPERTY_1,
        TestEntity50Col.DOUBLE_PROPERTY_1,
        TestEntity50Col.DECIMAL_PROPERTY_1,
        TestEntity50Col.DATE_PROPERTY_1,
        TestEntity50Col.TIME_OF_DAY_PROPERTY_1,
        TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_1,
        TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_1,
        TestEntity50Col.STRING_PROPERTY_2,
        TestEntity50Col.GUID_PROPERTY_2,
        TestEntity50Col.BOOLEAN_PROPERTY_2,
        TestEntity50Col.INT_64_PROPERTY_2,
        TestEntity50Col.DOUBLE_PROPERTY_2,
        TestEntity50Col.DECIMAL_PROPERTY_2,
        TestEntity50Col.DATE_PROPERTY_2,
        TestEntity50Col.TIME_OF_DAY_PROPERTY_2,
        TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_2,
        TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_2,
        TestEntity50Col.STRING_PROPERTY_3,
        TestEntity50Col.GUID_PROPERTY_3,
        TestEntity50Col.BOOLEAN_PROPERTY_3,
        TestEntity50Col.INT_64_PROPERTY_3,
        TestEntity50Col.DOUBLE_PROPERTY_3,
        TestEntity50Col.DECIMAL_PROPERTY_3,
        TestEntity50Col.DATE_PROPERTY_3,
        TestEntity50Col.TIME_OF_DAY_PROPERTY_3,
        TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_3,
        TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_3,
        TestEntity50Col.STRING_PROPERTY_4,
        TestEntity50Col.GUID_PROPERTY_4,
        TestEntity50Col.BOOLEAN_PROPERTY_4,
        TestEntity50Col.INT_64_PROPERTY_4,
        TestEntity50Col.DOUBLE_PROPERTY_4,
        TestEntity50Col.DECIMAL_PROPERTY_4,
        TestEntity50Col.DATE_PROPERTY_4,
        TestEntity50Col.TIME_OF_DAY_PROPERTY_4,
        TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_4,
        TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_4,
        TestEntity50Col.STRING_PROPERTY_5,
        TestEntity50Col.GUID_PROPERTY_5,
        TestEntity50Col.BOOLEAN_PROPERTY_5,
        TestEntity50Col.INT_64_PROPERTY_5,
        TestEntity50Col.DOUBLE_PROPERTY_5,
        TestEntity50Col.DECIMAL_PROPERTY_5,
        TestEntity50Col.DATE_PROPERTY_5,
        TestEntity50Col.TIME_OF_DAY_PROPERTY_5,
        TestEntity50Col.DATA_TIME_OFFSET_DATA_TIME_PROPERTY_5,
        TestEntity50Col.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY_5
    ];
    /**
     * All fields selector.
     */
    TestEntity50Col.ALL_FIELDS = new core_1.AllFields('*', TestEntity50Col);
    /**
     * All key fields of the TestEntity50Col entity.
     */
    TestEntity50Col._keyFields = [TestEntity50Col.KEY_TEST_ENTITY_50_COL];
    /**
     * Mapping of all key field names to the respective static field property TestEntity50Col.
     */
    TestEntity50Col._keys = TestEntity50Col._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(TestEntity50Col = exports.TestEntity50Col || (exports.TestEntity50Col = {}));
exports.TestEntity50Col = TestEntity50Col;
//# sourceMappingURL=TestEntity50Col.js.map