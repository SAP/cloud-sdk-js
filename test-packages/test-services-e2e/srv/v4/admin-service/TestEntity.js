"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
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
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityRequestBuilder_1 = require("./TestEntityRequestBuilder");
var v4_1 = require("@sap-cloud-sdk/core/v4");
/**
 * This class represents the entity "TestEntity" of service "AdminService".
 */
var TestEntity = /** @class */ (function (_super) {
    __extends(TestEntity, _super);
    function TestEntity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances `TestEntity`.
     * @returns A builder that constructs instances of entity type `TestEntity`.
     */
    TestEntity.builder = function () {
        return v4_1.Entity.entityBuilder(TestEntity);
    };
    /**
     * Returns a request builder to construct requests for operations on the `TestEntity` entity type.
     * @returns A `TestEntity` request builder.
     */
    TestEntity.requestBuilder = function () {
        return new TestEntityRequestBuilder_1.TestEntityRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntity`.
     */
    TestEntity.customField = function (fieldName) {
        return v4_1.Entity.customFieldSelector(fieldName, TestEntity);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    TestEntity.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for TestEntity.
     */
    TestEntity._entityName = 'TestEntity';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for TestEntity.
     */
    TestEntity._serviceName = 'AdminService';
    /**
     * Default url path for the according service.
     */
    TestEntity._defaultServicePath = 'VALUE_IS_UNDEFINED';
    return TestEntity;
}(v4_1.Entity));
exports.TestEntity = TestEntity;
(function (TestEntity) {
    /**
     * Static representation of the [[keyPropInt]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.KEY_PROP_INT = new v4_1.NumberField('KeyPropInt', TestEntity, 'Edm.Int32');
    /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.KEY_PROPERTY_STRING = new v4_1.StringField('KeyPropertyString', TestEntity, 'Edm.String');
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.STRING_PROPERTY = new v4_1.StringField('StringProperty', TestEntity, 'Edm.String');
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.GUID_PROPERTY = new v4_1.StringField('GuidProperty', TestEntity, 'Edm.Guid');
    /**
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.BOOLEAN_PROPERTY = new v4_1.BooleanField('BooleanProperty', TestEntity, 'Edm.Boolean');
    /**
     * Static representation of the [[int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.INT_64_PROPERTY = new v4_1.BigNumberField('Int64Property', TestEntity, 'Edm.Int64');
    /**
     * Static representation of the [[doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.DOUBLE_PROPERTY = new v4_1.NumberField('DoubleProperty', TestEntity, 'Edm.Double');
    /**
     * Static representation of the [[decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.DECIMAL_PROPERTY = new v4_1.BigNumberField('DecimalProperty', TestEntity, 'Edm.Decimal');
    ;
    new v4_1.any('DateProperty', TestEntity, 'Edm.Date');
    ;
    new v4_1.any('TimeOfDayProperty', TestEntity, 'Edm.TimeOfDay');
    /**
     * Static representation of the [[dataTimeOffsetDataTimeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.DATA_TIME_OFFSET_DATA_TIME_PROPERTY = new v4_1.DateField('DataTimeOffsetDataTimeProperty', TestEntity, 'Edm.DateTimeOffset');
    /**
     * Static representation of the [[dataTimeOffsetTimestampProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY = new v4_1.DateField('DataTimeOffsetTimestampProperty', TestEntity, 'Edm.DateTimeOffset');
     | v4_1.DateField < TestEntity >> ;
    [
        TestEntity.KEY_PROP_INT,
        TestEntity.KEY_PROPERTY_STRING,
        TestEntity.STRING_PROPERTY,
        TestEntity.GUID_PROPERTY,
        TestEntity.BOOLEAN_PROPERTY,
        TestEntity.INT_64_PROPERTY,
        TestEntity.DOUBLE_PROPERTY,
        TestEntity.DECIMAL_PROPERTY,
        TestEntity.DATE_PROPERTY,
        TestEntity.TIME_OF_DAY_PROPERTY,
        TestEntity.DATA_TIME_OFFSET_DATA_TIME_PROPERTY,
        TestEntity.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY
    ];
    /**
     * All fields selector.
     */
    TestEntity.ALL_FIELDS = new v4_1.AllFields('*', TestEntity);
    /**
     * All key fields of the TestEntity entity.
     */
    TestEntity._keyFields = [TestEntity.KEY_PROP_INT, TestEntity.KEY_PROPERTY_STRING];
    /**
     * Mapping of all key field names to the respective static field property TestEntity.
     */
    TestEntity._keys = TestEntity._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(TestEntity = exports.TestEntity || (exports.TestEntity = {}));
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map