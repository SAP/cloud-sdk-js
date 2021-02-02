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
exports.TestEntitySharesEntityType = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntitySharesEntityTypeRequestBuilder_1 = require("./TestEntitySharesEntityTypeRequestBuilder");
var TestComplexType_1 = require("./TestComplexType");
var core_1 = require("@sap-cloud-sdk/core");
/**
 * This class represents the entity "A_TestEntitySharesEntityType" of service "API_TEST_SRV".
 */
var TestEntitySharesEntityType = /** @class */ (function (_super) {
    __extends(TestEntitySharesEntityType, _super);
    function TestEntitySharesEntityType() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns an entity builder to construct instances of `TestEntitySharesEntityType`.
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType`.
     */
    TestEntitySharesEntityType.builder = function () {
        return core_1.EntityV4.entityBuilder(TestEntitySharesEntityType);
    };
    /**
     * Returns a request builder to construct requests for operations on the `TestEntitySharesEntityType` entity type.
     * @returns A `TestEntitySharesEntityType` request builder.
     */
    TestEntitySharesEntityType.requestBuilder = function () {
        return new TestEntitySharesEntityTypeRequestBuilder_1.TestEntitySharesEntityTypeRequestBuilder();
    };
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySharesEntityType`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntitySharesEntityType`.
     */
    TestEntitySharesEntityType.customField = function (fieldName) {
        return core_1.EntityV4.customFieldSelector(fieldName, TestEntitySharesEntityType);
    };
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    TestEntitySharesEntityType.prototype.toJSON = function () {
        return __assign(__assign({}, this), this._customFields);
    };
    /**
     * Technical entity name for TestEntitySharesEntityType.
     */
    TestEntitySharesEntityType._entityName = 'A_TestEntitySharesEntityType';
    /**
     * Default url path for the according service.
     */
    TestEntitySharesEntityType._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
    return TestEntitySharesEntityType;
}(core_1.EntityV4));
exports.TestEntitySharesEntityType = TestEntitySharesEntityType;
var TestEntityMultiLink_1 = require("./TestEntityMultiLink");
var TestEntitySingleLink_1 = require("./TestEntitySingleLink");
(function (TestEntitySharesEntityType) {
    /**
     * Static representation of the [[keyPropertyGuid]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.KEY_PROPERTY_GUID = new core_1.StringField('KeyPropertyGuid', TestEntitySharesEntityType, 'Edm.Guid');
    /**
     * Static representation of the [[keyPropertyString]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.KEY_PROPERTY_STRING = new core_1.StringField('KeyPropertyString', TestEntitySharesEntityType, 'Edm.String');
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.STRING_PROPERTY = new core_1.StringField('StringProperty', TestEntitySharesEntityType, 'Edm.String');
    /**
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.BOOLEAN_PROPERTY = new core_1.BooleanField('BooleanProperty', TestEntitySharesEntityType, 'Edm.Boolean');
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.GUID_PROPERTY = new core_1.StringField('GuidProperty', TestEntitySharesEntityType, 'Edm.Guid');
    /**
     * Static representation of the [[int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.INT_16_PROPERTY = new core_1.NumberField('Int16Property', TestEntitySharesEntityType, 'Edm.Int16');
    /**
     * Static representation of the [[int32Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.INT_32_PROPERTY = new core_1.NumberField('Int32Property', TestEntitySharesEntityType, 'Edm.Int32');
    /**
     * Static representation of the [[int64Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.INT_64_PROPERTY = new core_1.BigNumberField('Int64Property', TestEntitySharesEntityType, 'Edm.Int64');
    /**
     * Static representation of the [[decimalProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.DECIMAL_PROPERTY = new core_1.BigNumberField('DecimalProperty', TestEntitySharesEntityType, 'Edm.Decimal');
    /**
     * Static representation of the [[singleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.SINGLE_PROPERTY = new core_1.NumberField('SingleProperty', TestEntitySharesEntityType, 'Edm.Single');
    /**
     * Static representation of the [[doubleProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.DOUBLE_PROPERTY = new core_1.NumberField('DoubleProperty', TestEntitySharesEntityType, 'Edm.Double');
    /**
     * Static representation of the [[floatProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.FLOAT_PROPERTY = new core_1.NumberField('FloatProperty', TestEntitySharesEntityType, 'Edm.Float');
    /**
     * Static representation of the [[timeOfDayProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.TIME_OF_DAY_PROPERTY = new core_1.TimeField('TimeOfDayProperty', TestEntitySharesEntityType, 'Edm.TimeOfDay');
    /**
     * Static representation of the [[dateProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.DATE_PROPERTY = new core_1.DateField('DateProperty', TestEntitySharesEntityType, 'Edm.Date');
    /**
     * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.DATE_TIME_OFF_SET_PROPERTY = new core_1.DateField('DateTimeOffSetProperty', TestEntitySharesEntityType, 'Edm.DateTimeOffset');
    /**
     * Static representation of the [[durationProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.DURATION_PROPERTY = new core_1.DurationField('DurationProperty', TestEntitySharesEntityType, 'Edm.Duration');
    /**
     * Static representation of the [[byteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.BYTE_PROPERTY = new core_1.NumberField('ByteProperty', TestEntitySharesEntityType, 'Edm.Byte');
    /**
     * Static representation of the [[sByteProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.S_BYTE_PROPERTY = new core_1.NumberField('SByteProperty', TestEntitySharesEntityType, 'Edm.SByte');
    /**
     * Static representation of the [[geographyPointProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.GEOGRAPHY_POINT_PROPERTY = new core_1.AnyField('GeographyPointProperty', TestEntitySharesEntityType, 'Edm.Any');
    /**
     * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.SOMETHING_THE_SDK_DOES_NOT_SUPPORT = new core_1.AnyField('SomethingTheSDKDoesNotSupport', TestEntitySharesEntityType, 'Edm.Any');
    /**
     * Static representation of the [[collectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.COLLECTION_PROPERTY = new core_1.CollectionField('CollectionProperty', TestEntitySharesEntityType, 'Edm.String');
    /**
     * Static representation of the [[complexTypeProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.COMPLEX_TYPE_PROPERTY = new TestComplexType_1.TestComplexTypeField('ComplexTypeProperty', TestEntitySharesEntityType);
    /**
     * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.COMPLEX_TYPE_COLLECTION_PROPERTY = new core_1.CollectionField('ComplexTypeCollectionProperty', TestEntitySharesEntityType, TestComplexType_1.TestComplexType);
    /**
     * Static representation of the [[enumProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.ENUM_PROPERTY = new core_1.EnumField('EnumProperty', TestEntitySharesEntityType);
    /**
     * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.ENUM_PROPERTY_WITH_ONE_MEMBER = new core_1.EnumField('EnumPropertyWithOneMember', TestEntitySharesEntityType);
    /**
     * Static representation of the [[enumCollectionProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.ENUM_COLLECTION_PROPERTY = new core_1.CollectionField('EnumCollectionProperty', TestEntitySharesEntityType, 'Edm.Enum');
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.TO_MULTI_LINK = new core_1.OneToManyLink('to_MultiLink', TestEntitySharesEntityType, TestEntityMultiLink_1.TestEntityMultiLink);
    /**
     * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.TO_OTHER_MULTI_LINK = new core_1.OneToManyLink('to_OtherMultiLink', TestEntitySharesEntityType, TestEntityMultiLink_1.TestEntityMultiLink);
    /**
     * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntitySharesEntityType.TO_SINGLE_LINK = new core_1.OneToOneLink('to_SingleLink', TestEntitySharesEntityType, TestEntitySingleLink_1.TestEntitySingleLink);
    /**
     * All fields of the TestEntitySharesEntityType entity.
     */
    TestEntitySharesEntityType._allFields = [
        TestEntitySharesEntityType.KEY_PROPERTY_GUID,
        TestEntitySharesEntityType.KEY_PROPERTY_STRING,
        TestEntitySharesEntityType.STRING_PROPERTY,
        TestEntitySharesEntityType.BOOLEAN_PROPERTY,
        TestEntitySharesEntityType.GUID_PROPERTY,
        TestEntitySharesEntityType.INT_16_PROPERTY,
        TestEntitySharesEntityType.INT_32_PROPERTY,
        TestEntitySharesEntityType.INT_64_PROPERTY,
        TestEntitySharesEntityType.DECIMAL_PROPERTY,
        TestEntitySharesEntityType.SINGLE_PROPERTY,
        TestEntitySharesEntityType.DOUBLE_PROPERTY,
        TestEntitySharesEntityType.FLOAT_PROPERTY,
        TestEntitySharesEntityType.TIME_OF_DAY_PROPERTY,
        TestEntitySharesEntityType.DATE_PROPERTY,
        TestEntitySharesEntityType.DATE_TIME_OFF_SET_PROPERTY,
        TestEntitySharesEntityType.DURATION_PROPERTY,
        TestEntitySharesEntityType.BYTE_PROPERTY,
        TestEntitySharesEntityType.S_BYTE_PROPERTY,
        TestEntitySharesEntityType.GEOGRAPHY_POINT_PROPERTY,
        TestEntitySharesEntityType.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
        TestEntitySharesEntityType.COLLECTION_PROPERTY,
        TestEntitySharesEntityType.COMPLEX_TYPE_PROPERTY,
        TestEntitySharesEntityType.COMPLEX_TYPE_COLLECTION_PROPERTY,
        TestEntitySharesEntityType.ENUM_PROPERTY,
        TestEntitySharesEntityType.ENUM_PROPERTY_WITH_ONE_MEMBER,
        TestEntitySharesEntityType.ENUM_COLLECTION_PROPERTY,
        TestEntitySharesEntityType.TO_MULTI_LINK,
        TestEntitySharesEntityType.TO_OTHER_MULTI_LINK,
        TestEntitySharesEntityType.TO_SINGLE_LINK
    ];
    /**
     * All fields selector.
     */
    TestEntitySharesEntityType.ALL_FIELDS = new core_1.AllFields('*', TestEntitySharesEntityType);
    /**
     * All key fields of the TestEntitySharesEntityType entity.
     */
    TestEntitySharesEntityType._keyFields = [TestEntitySharesEntityType.KEY_PROPERTY_GUID, TestEntitySharesEntityType.KEY_PROPERTY_STRING];
    /**
     * Mapping of all key field names to the respective static field property TestEntitySharesEntityType.
     */
    TestEntitySharesEntityType._keys = TestEntitySharesEntityType._keyFields.reduce(function (acc, field) {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(TestEntitySharesEntityType = exports.TestEntitySharesEntityType || (exports.TestEntitySharesEntityType = {}));
exports.TestEntitySharesEntityType = TestEntitySharesEntityType;
//# sourceMappingURL=TestEntitySharesEntityType.js.map