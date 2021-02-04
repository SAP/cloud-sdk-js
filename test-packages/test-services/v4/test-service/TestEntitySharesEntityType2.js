"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
exports.TestEntitySharesEntityType2 = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntitySharesEntityType2RequestBuilder_1 = require("./TestEntitySharesEntityType2RequestBuilder");
var TestComplexType_1 = require("./TestComplexType");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "A_TestEntitySharesEntityType2" of service "API_TEST_SRV".
 */
var TestEntitySharesEntityType2 = /** @class */ (function (_super) {
    __extends(TestEntitySharesEntityType2, _super);
    function TestEntitySharesEntityType2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances of `TestEntitySharesEntityType2`.
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
     */
    TestEntitySharesEntityType2.builder = function () {
        return core_1.EntityV4.entityBuilder(TestEntitySharesEntityType2);
    };
    /**
     * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType2` entity type.
     * @returns A `TestEntitySharesEntityType2` request builder.
     */
    TestEntitySharesEntityType2.requestBuilder = function () {
        return new TestEntitySharesEntityType2RequestBuilder_1.TestEntitySharesEntityType2RequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType2`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType2`.
     */
    TestEntitySharesEntityType2.customField = function (fieldName) {
        return core_1.EntityV4.customFieldSelector(fieldName, TestEntitySharesEntityType2);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    TestEntitySharesEntityType2.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for TestEntitySharesEntityType2.
     */
    TestEntitySharesEntityType2._entityName = 'A_TestEntitySharesEntityType2';
    /**
     * Default url path for the according service.
     */
    TestEntitySharesEntityType2._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    return TestEntitySharesEntityType2;
}(core_1.EntityV4));
exports.TestEntitySharesEntityType2 = TestEntitySharesEntityType2;
(function (TestEntitySharesEntityType2) {
    /**
     * Static representation of the [[keyPropertyGuid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.KEY_PROPERTY_GUID = new core_1.StringField('KeyPropertyGuid', TestEntitySharesEntityType2, 'Edm.Guid');
    /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.KEY_PROPERTY_STRING = new core_1.StringField('KeyPropertyString', TestEntitySharesEntityType2, 'Edm.String');
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.STRING_PROPERTY = new core_1.StringField('StringProperty', TestEntitySharesEntityType2, 'Edm.String');
    /**
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.BOOLEAN_PROPERTY = new core_1.BooleanField('BooleanProperty', TestEntitySharesEntityType2, 'Edm.Boolean');
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.GUID_PROPERTY = new core_1.StringField('GuidProperty', TestEntitySharesEntityType2, 'Edm.Guid');
    /**
     * Static representation of the [[int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.INT_16_PROPERTY = new core_1.NumberField('Int16Property', TestEntitySharesEntityType2, 'Edm.Int16');
    /**
     * Static representation of the [[int32Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.INT_32_PROPERTY = new core_1.NumberField('Int32Property', TestEntitySharesEntityType2, 'Edm.Int32');
    /**
     * Static representation of the [[int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.INT_64_PROPERTY = new core_1.BigNumberField('Int64Property', TestEntitySharesEntityType2, 'Edm.Int64');
    /**
     * Static representation of the [[decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.DECIMAL_PROPERTY = new core_1.BigNumberField('DecimalProperty', TestEntitySharesEntityType2, 'Edm.Decimal');
    /**
     * Static representation of the [[singleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.SINGLE_PROPERTY = new core_1.NumberField('SingleProperty', TestEntitySharesEntityType2, 'Edm.Single');
    /**
     * Static representation of the [[doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.DOUBLE_PROPERTY = new core_1.NumberField('DoubleProperty', TestEntitySharesEntityType2, 'Edm.Double');
    /**
     * Static representation of the [[floatProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.FLOAT_PROPERTY = new core_1.NumberField('FloatProperty', TestEntitySharesEntityType2, 'Edm.Float');
    /**
     * Static representation of the [[timeOfDayProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.TIME_OF_DAY_PROPERTY = new core_1.TimeField('TimeOfDayProperty', TestEntitySharesEntityType2, 'Edm.TimeOfDay');
    /**
     * Static representation of the [[dateProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.DATE_PROPERTY = new core_1.DateField('DateProperty', TestEntitySharesEntityType2, 'Edm.Date');
    /**
     * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.DATE_TIME_OFF_SET_PROPERTY = new core_1.DateField('DateTimeOffSetProperty', TestEntitySharesEntityType2, 'Edm.DateTimeOffset');
    /**
     * Static representation of the [[durationProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.DURATION_PROPERTY = new core_1.DurationField('DurationProperty', TestEntitySharesEntityType2, 'Edm.Duration');
    /**
     * Static representation of the [[byteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.BYTE_PROPERTY = new core_1.NumberField('ByteProperty', TestEntitySharesEntityType2, 'Edm.Byte');
    /**
     * Static representation of the [[sByteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.S_BYTE_PROPERTY = new core_1.NumberField('SByteProperty', TestEntitySharesEntityType2, 'Edm.SByte');
    /**
     * Static representation of the [[geographyPointProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.GEOGRAPHY_POINT_PROPERTY = new core_1.AnyField('GeographyPointProperty', TestEntitySharesEntityType2, 'Edm.Any');
    /**
     * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.SOMETHING_THE_SDK_DOES_NOT_SUPPORT = new core_1.AnyField('SomethingTheSDKDoesNotSupport', TestEntitySharesEntityType2, 'Edm.Any');
    /**
     * Static representation of the [[collectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.COLLECTION_PROPERTY = new core_1.CollectionField('CollectionProperty', TestEntitySharesEntityType2, 'Edm.String');
    /**
     * Static representation of the [[complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.COMPLEX_TYPE_PROPERTY = new TestComplexType_1.TestComplexTypeField('ComplexTypeProperty', TestEntitySharesEntityType2);
    /**
     * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.COMPLEX_TYPE_COLLECTION_PROPERTY = new core_1.CollectionField('ComplexTypeCollectionProperty', TestEntitySharesEntityType2, TestComplexType_1.TestComplexType);
    /**
     * Static representation of the [[enumProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.ENUM_PROPERTY = new core_1.EnumField('EnumProperty', TestEntitySharesEntityType2);
    /**
     * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.ENUM_PROPERTY_WITH_ONE_MEMBER = new core_1.EnumField('EnumPropertyWithOneMember', TestEntitySharesEntityType2);
    /**
     * Static representation of the [[enumCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType2.ENUM_COLLECTION_PROPERTY = new core_1.CollectionField('EnumCollectionProperty', TestEntitySharesEntityType2, 'Edm.Enum');
    /**
     * All fields of the TestEntitySharesEntityType2 entity.
     */
    TestEntitySharesEntityType2._allFields = [
        TestEntitySharesEntityType2.KEY_PROPERTY_GUID,
        TestEntitySharesEntityType2.KEY_PROPERTY_STRING,
        TestEntitySharesEntityType2.STRING_PROPERTY,
        TestEntitySharesEntityType2.BOOLEAN_PROPERTY,
        TestEntitySharesEntityType2.GUID_PROPERTY,
        TestEntitySharesEntityType2.INT_16_PROPERTY,
        TestEntitySharesEntityType2.INT_32_PROPERTY,
        TestEntitySharesEntityType2.INT_64_PROPERTY,
        TestEntitySharesEntityType2.DECIMAL_PROPERTY,
        TestEntitySharesEntityType2.SINGLE_PROPERTY,
        TestEntitySharesEntityType2.DOUBLE_PROPERTY,
        TestEntitySharesEntityType2.FLOAT_PROPERTY,
        TestEntitySharesEntityType2.TIME_OF_DAY_PROPERTY,
        TestEntitySharesEntityType2.DATE_PROPERTY,
        TestEntitySharesEntityType2.DATE_TIME_OFF_SET_PROPERTY,
        TestEntitySharesEntityType2.DURATION_PROPERTY,
        TestEntitySharesEntityType2.BYTE_PROPERTY,
        TestEntitySharesEntityType2.S_BYTE_PROPERTY,
        TestEntitySharesEntityType2.GEOGRAPHY_POINT_PROPERTY,
        TestEntitySharesEntityType2.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
        TestEntitySharesEntityType2.COLLECTION_PROPERTY,
        TestEntitySharesEntityType2.COMPLEX_TYPE_PROPERTY,
        TestEntitySharesEntityType2.COMPLEX_TYPE_COLLECTION_PROPERTY,
        TestEntitySharesEntityType2.ENUM_PROPERTY,
        TestEntitySharesEntityType2.ENUM_PROPERTY_WITH_ONE_MEMBER,
        TestEntitySharesEntityType2.ENUM_COLLECTION_PROPERTY
    ];
    /**
     * All fields selector.
     */
    TestEntitySharesEntityType2.ALL_FIELDS = new core_1.AllFields('*', TestEntitySharesEntityType2);
    /**
     * All key fields of the TestEntitySharesEntityType2 entity.
     */
    TestEntitySharesEntityType2._keyFields = [TestEntitySharesEntityType2.KEY_PROPERTY_GUID, TestEntitySharesEntityType2.KEY_PROPERTY_STRING];
    /**
     * Mapping of all key field names to the respective static field property TestEntitySharesEntityType2.
     */
    TestEntitySharesEntityType2._keys = TestEntitySharesEntityType2._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(TestEntitySharesEntityType2 = exports.TestEntitySharesEntityType2 || (exports.TestEntitySharesEntityType2 = {}));
exports.TestEntitySharesEntityType2 = TestEntitySharesEntityType2;
//# sourceMappingURL=TestEntitySharesEntityType2.js.map