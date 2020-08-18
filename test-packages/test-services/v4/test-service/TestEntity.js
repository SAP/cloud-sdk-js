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
exports.TestEntity = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityRequestBuilder_1 = require("./TestEntityRequestBuilder");
var string_1 = require("./string");
var TestComplexType_1 = require("./TestComplexType");
var v4_1 = require("@sap-cloud-sdk/core/v4");
/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
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
    TestEntity._entityName = 'A_TestEntity';
    /**
     * @deprecated Since v1.0.1 Use [[_defaultServicePath]] instead.
     * Technical service name for TestEntity.
     */
    TestEntity._serviceName = 'API_TEST_SRV';
    /**
     * Default url path for the according service.
     */
    TestEntity._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    return TestEntity;
}(v4_1.Entity));
exports.TestEntity = TestEntity;
var TestEntityMultiLink_1 = require("./TestEntityMultiLink");
var TestEntitySingleLink_1 = require("./TestEntitySingleLink");
(function (TestEntity) {
    /**
     * Static representation of the [[keyPropertyGuid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.KEY_PROPERTY_GUID = new v4_1.StringField('KeyPropertyGuid', TestEntity, 'Edm.Guid');
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
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.BOOLEAN_PROPERTY = new v4_1.BooleanField('BooleanProperty', TestEntity, 'Edm.Boolean');
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.GUID_PROPERTY = new v4_1.StringField('GuidProperty', TestEntity, 'Edm.Guid');
    /**
     * Static representation of the [[int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.INT_16_PROPERTY = new v4_1.NumberField('Int16Property', TestEntity, 'Edm.Int16');
    /**
     * Static representation of the [[int32Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.INT_32_PROPERTY = new v4_1.NumberField('Int32Property', TestEntity, 'Edm.Int32');
    /**
     * Static representation of the [[int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.INT_64_PROPERTY = new v4_1.BigNumberField('Int64Property', TestEntity, 'Edm.Int64');
    /**
     * Static representation of the [[decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.DECIMAL_PROPERTY = new v4_1.BigNumberField('DecimalProperty', TestEntity, 'Edm.Decimal');
    /**
     * Static representation of the [[singleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.SINGLE_PROPERTY = new v4_1.NumberField('SingleProperty', TestEntity, 'Edm.Single');
    /**
     * Static representation of the [[doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.DOUBLE_PROPERTY = new v4_1.NumberField('DoubleProperty', TestEntity, 'Edm.Double');
    /**
     * Static representation of the [[floatProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.FLOAT_PROPERTY = new v4_1.NumberField('FloatProperty', TestEntity, 'Edm.Float');
    /**
     * Static representation of the [[timeOfDayProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.TIME_OF_DAY_PROPERTY = new v4_1.TimeField('TimeOfDayProperty', TestEntity, 'Edm.TimeOfDay');
    /**
     * Static representation of the [[dateProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.DATE_PROPERTY = new v4_1.DateField('DateProperty', TestEntity, 'Edm.Date');
    /**
     * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.DATE_TIME_OFF_SET_PROPERTY = new v4_1.DateField('DateTimeOffSetProperty', TestEntity, 'Edm.DateTimeOffset');
    /**
     * Static representation of the [[durationProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.DURATION_PROPERTY = new v4_1.DurationField('DurationProperty', TestEntity, 'Edm.Duration');
    /**
     * Static representation of the [[byteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.BYTE_PROPERTY = new v4_1.NumberField('ByteProperty', TestEntity, 'Edm.Byte');
    /**
     * Static representation of the [[sByteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.S_BYTE_PROPERTY = new v4_1.NumberField('SByteProperty', TestEntity, 'Edm.SByte');
    /**
     * Static representation of the [[geographyPointProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.GEOGRAPHY_POINT_PROPERTY = new v4_1.AnyField('GeographyPointProperty', TestEntity, 'Edm.Any');
    /**
     * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT = new v4_1.AnyField('SomethingTheSDKDoesNotSupport', TestEntity, 'Edm.Any');
    /**
     * Static representation of the [[collectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.COLLECTION_PROPERTY = new v4_1.CollectionField('CollectionProperty', TestEntity, string_1.string);
    /**
     * Static representation of the [[complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.COMPLEX_TYPE_PROPERTY = new TestComplexType_1.TestComplexTypeField('ComplexTypeProperty', TestEntity);
    /**
     * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.COMPLEX_TYPE_COLLECTION_PROPERTY = new v4_1.CollectionField('ComplexTypeCollectionProperty', TestEntity, TestComplexType_1.TestComplexType);
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.TO_MULTI_LINK = new v4_1.OneToManyLink('to_MultiLink', TestEntity, TestEntityMultiLink_1.TestEntityMultiLink);
    /**
     * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.TO_OTHER_MULTI_LINK = new v4_1.OneToManyLink('to_OtherMultiLink', TestEntity, TestEntityMultiLink_1.TestEntityMultiLink);
    /**
     * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntity.TO_SINGLE_LINK = new v4_1.OneToOneLink('to_SingleLink', TestEntity, TestEntitySingleLink_1.TestEntitySingleLink);
    /**
     * All fields of the TestEntity entity.
     */
    TestEntity._allFields = [
        TestEntity.KEY_PROPERTY_GUID,
        TestEntity.KEY_PROPERTY_STRING,
        TestEntity.STRING_PROPERTY,
        TestEntity.BOOLEAN_PROPERTY,
        TestEntity.GUID_PROPERTY,
        TestEntity.INT_16_PROPERTY,
        TestEntity.INT_32_PROPERTY,
        TestEntity.INT_64_PROPERTY,
        TestEntity.DECIMAL_PROPERTY,
        TestEntity.SINGLE_PROPERTY,
        TestEntity.DOUBLE_PROPERTY,
        TestEntity.FLOAT_PROPERTY,
        TestEntity.TIME_OF_DAY_PROPERTY,
        TestEntity.DATE_PROPERTY,
        TestEntity.DATE_TIME_OFF_SET_PROPERTY,
        TestEntity.DURATION_PROPERTY,
        TestEntity.BYTE_PROPERTY,
        TestEntity.S_BYTE_PROPERTY,
        TestEntity.GEOGRAPHY_POINT_PROPERTY,
        TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
        TestEntity.COLLECTION_PROPERTY,
        TestEntity.COMPLEX_TYPE_PROPERTY,
        TestEntity.COMPLEX_TYPE_COLLECTION_PROPERTY,
        TestEntity.TO_MULTI_LINK,
        TestEntity.TO_OTHER_MULTI_LINK,
        TestEntity.TO_SINGLE_LINK
    ];
    /**
     * All fields selector.
     */
    TestEntity.ALL_FIELDS = new v4_1.AllFields('*', TestEntity);
    /**
     * All key fields of the TestEntity entity.
     */
    TestEntity._keyFields = [TestEntity.KEY_PROPERTY_GUID, TestEntity.KEY_PROPERTY_STRING];
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