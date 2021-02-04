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
exports.TestEntitySharesEntityType1 = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntitySharesEntityType1RequestBuilder_1 = require("./TestEntitySharesEntityType1RequestBuilder");
var TestComplexType_1 = require("./TestComplexType");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "A_TestEntitySharesEntityType1" of service "API_TEST_SRV".
 */
var TestEntitySharesEntityType1 = /** @class */ (function (_super) {
    __extends(TestEntitySharesEntityType1, _super);
    function TestEntitySharesEntityType1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances of `TestEntitySharesEntityType1`.
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
     */
    TestEntitySharesEntityType1.builder = function () {
        return core_1.EntityV4.entityBuilder(TestEntitySharesEntityType1);
    };
    /**
     * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType1` entity type.
     * @returns A `TestEntitySharesEntityType1` request builder.
     */
    TestEntitySharesEntityType1.requestBuilder = function () {
        return new TestEntitySharesEntityType1RequestBuilder_1.TestEntitySharesEntityType1RequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType1`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType1`.
     */
    TestEntitySharesEntityType1.customField = function (fieldName) {
        return core_1.EntityV4.customFieldSelector(fieldName, TestEntitySharesEntityType1);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    TestEntitySharesEntityType1.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for TestEntitySharesEntityType1.
     */
    TestEntitySharesEntityType1._entityName = 'A_TestEntitySharesEntityType1';
    /**
     * Default url path for the according service.
     */
    TestEntitySharesEntityType1._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    return TestEntitySharesEntityType1;
}(core_1.EntityV4));
exports.TestEntitySharesEntityType1 = TestEntitySharesEntityType1;
(function (TestEntitySharesEntityType1) {
    /**
     * Static representation of the [[keyPropertyGuid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.KEY_PROPERTY_GUID = new core_1.StringField('KeyPropertyGuid', TestEntitySharesEntityType1, 'Edm.Guid');
    /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.KEY_PROPERTY_STRING = new core_1.StringField('KeyPropertyString', TestEntitySharesEntityType1, 'Edm.String');
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.STRING_PROPERTY = new core_1.StringField('StringProperty', TestEntitySharesEntityType1, 'Edm.String');
    /**
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.BOOLEAN_PROPERTY = new core_1.BooleanField('BooleanProperty', TestEntitySharesEntityType1, 'Edm.Boolean');
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.GUID_PROPERTY = new core_1.StringField('GuidProperty', TestEntitySharesEntityType1, 'Edm.Guid');
    /**
     * Static representation of the [[int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.INT_16_PROPERTY = new core_1.NumberField('Int16Property', TestEntitySharesEntityType1, 'Edm.Int16');
    /**
     * Static representation of the [[int32Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.INT_32_PROPERTY = new core_1.NumberField('Int32Property', TestEntitySharesEntityType1, 'Edm.Int32');
    /**
     * Static representation of the [[int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.INT_64_PROPERTY = new core_1.BigNumberField('Int64Property', TestEntitySharesEntityType1, 'Edm.Int64');
    /**
     * Static representation of the [[decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.DECIMAL_PROPERTY = new core_1.BigNumberField('DecimalProperty', TestEntitySharesEntityType1, 'Edm.Decimal');
    /**
     * Static representation of the [[singleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.SINGLE_PROPERTY = new core_1.NumberField('SingleProperty', TestEntitySharesEntityType1, 'Edm.Single');
    /**
     * Static representation of the [[doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.DOUBLE_PROPERTY = new core_1.NumberField('DoubleProperty', TestEntitySharesEntityType1, 'Edm.Double');
    /**
     * Static representation of the [[floatProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.FLOAT_PROPERTY = new core_1.NumberField('FloatProperty', TestEntitySharesEntityType1, 'Edm.Float');
    /**
     * Static representation of the [[timeOfDayProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.TIME_OF_DAY_PROPERTY = new core_1.TimeField('TimeOfDayProperty', TestEntitySharesEntityType1, 'Edm.TimeOfDay');
    /**
     * Static representation of the [[dateProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.DATE_PROPERTY = new core_1.DateField('DateProperty', TestEntitySharesEntityType1, 'Edm.Date');
    /**
     * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.DATE_TIME_OFF_SET_PROPERTY = new core_1.DateField('DateTimeOffSetProperty', TestEntitySharesEntityType1, 'Edm.DateTimeOffset');
    /**
     * Static representation of the [[durationProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.DURATION_PROPERTY = new core_1.DurationField('DurationProperty', TestEntitySharesEntityType1, 'Edm.Duration');
    /**
     * Static representation of the [[byteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.BYTE_PROPERTY = new core_1.NumberField('ByteProperty', TestEntitySharesEntityType1, 'Edm.Byte');
    /**
     * Static representation of the [[sByteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.S_BYTE_PROPERTY = new core_1.NumberField('SByteProperty', TestEntitySharesEntityType1, 'Edm.SByte');
    /**
     * Static representation of the [[geographyPointProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.GEOGRAPHY_POINT_PROPERTY = new core_1.AnyField('GeographyPointProperty', TestEntitySharesEntityType1, 'Edm.Any');
    /**
     * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.SOMETHING_THE_SDK_DOES_NOT_SUPPORT = new core_1.AnyField('SomethingTheSDKDoesNotSupport', TestEntitySharesEntityType1, 'Edm.Any');
    /**
     * Static representation of the [[collectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.COLLECTION_PROPERTY = new core_1.CollectionField('CollectionProperty', TestEntitySharesEntityType1, 'Edm.String');
    /**
     * Static representation of the [[complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.COMPLEX_TYPE_PROPERTY = new TestComplexType_1.TestComplexTypeField('ComplexTypeProperty', TestEntitySharesEntityType1);
    /**
     * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.COMPLEX_TYPE_COLLECTION_PROPERTY = new core_1.CollectionField('ComplexTypeCollectionProperty', TestEntitySharesEntityType1, TestComplexType_1.TestComplexType);
    /**
     * Static representation of the [[enumProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.ENUM_PROPERTY = new core_1.EnumField('EnumProperty', TestEntitySharesEntityType1);
    /**
     * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.ENUM_PROPERTY_WITH_ONE_MEMBER = new core_1.EnumField('EnumPropertyWithOneMember', TestEntitySharesEntityType1);
    /**
     * Static representation of the [[enumCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType1.ENUM_COLLECTION_PROPERTY = new core_1.CollectionField('EnumCollectionProperty', TestEntitySharesEntityType1, 'Edm.Enum');
    /**
     * All fields of the TestEntitySharesEntityType1 entity.
     */
    TestEntitySharesEntityType1._allFields = [
        TestEntitySharesEntityType1.KEY_PROPERTY_GUID,
        TestEntitySharesEntityType1.KEY_PROPERTY_STRING,
        TestEntitySharesEntityType1.STRING_PROPERTY,
        TestEntitySharesEntityType1.BOOLEAN_PROPERTY,
        TestEntitySharesEntityType1.GUID_PROPERTY,
        TestEntitySharesEntityType1.INT_16_PROPERTY,
        TestEntitySharesEntityType1.INT_32_PROPERTY,
        TestEntitySharesEntityType1.INT_64_PROPERTY,
        TestEntitySharesEntityType1.DECIMAL_PROPERTY,
        TestEntitySharesEntityType1.SINGLE_PROPERTY,
        TestEntitySharesEntityType1.DOUBLE_PROPERTY,
        TestEntitySharesEntityType1.FLOAT_PROPERTY,
        TestEntitySharesEntityType1.TIME_OF_DAY_PROPERTY,
        TestEntitySharesEntityType1.DATE_PROPERTY,
        TestEntitySharesEntityType1.DATE_TIME_OFF_SET_PROPERTY,
        TestEntitySharesEntityType1.DURATION_PROPERTY,
        TestEntitySharesEntityType1.BYTE_PROPERTY,
        TestEntitySharesEntityType1.S_BYTE_PROPERTY,
        TestEntitySharesEntityType1.GEOGRAPHY_POINT_PROPERTY,
        TestEntitySharesEntityType1.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
        TestEntitySharesEntityType1.COLLECTION_PROPERTY,
        TestEntitySharesEntityType1.COMPLEX_TYPE_PROPERTY,
        TestEntitySharesEntityType1.COMPLEX_TYPE_COLLECTION_PROPERTY,
        TestEntitySharesEntityType1.ENUM_PROPERTY,
        TestEntitySharesEntityType1.ENUM_PROPERTY_WITH_ONE_MEMBER,
        TestEntitySharesEntityType1.ENUM_COLLECTION_PROPERTY
    ];
    /**
     * All fields selector.
     */
    TestEntitySharesEntityType1.ALL_FIELDS = new core_1.AllFields('*', TestEntitySharesEntityType1);
    /**
     * All key fields of the TestEntitySharesEntityType1 entity.
     */
    TestEntitySharesEntityType1._keyFields = [TestEntitySharesEntityType1.KEY_PROPERTY_GUID, TestEntitySharesEntityType1.KEY_PROPERTY_STRING];
    /**
     * Mapping of all key field names to the respective static field property TestEntitySharesEntityType1.
     */
    TestEntitySharesEntityType1._keys = TestEntitySharesEntityType1._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(TestEntitySharesEntityType1 = exports.TestEntitySharesEntityType1 || (exports.TestEntitySharesEntityType1 = {}));
exports.TestEntitySharesEntityType1 = TestEntitySharesEntityType1;
//# sourceMappingURL=TestEntitySharesEntityType1.js.map