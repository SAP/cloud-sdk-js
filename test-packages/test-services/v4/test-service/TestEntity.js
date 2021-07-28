'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityRequestBuilder_1 = require('./TestEntityRequestBuilder');
var TestComplexType_1 = require('./TestComplexType');
var TestEnumType_1 = require('./TestEnumType');
var TestEnumTypeInt64_1 = require('./TestEnumTypeInt64');
var TestEnumTypeWithOneMember_1 = require('./TestEnumTypeWithOneMember');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
var TestEntity = /** @class */ (function (_super) {
  __extends(TestEntity, _super);
  function TestEntity() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntity`.
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  TestEntity.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntity);
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
    return core_1.EntityV4.customFieldSelector(fieldName, TestEntity);
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
   * Default url path for the according service.
   */
  TestEntity._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntity;
})(core_1.EntityV4);
exports.TestEntity = TestEntity;
var TestEntityMultiLink_1 = require('./TestEntityMultiLink');
var TestEntitySingleLink_1 = require('./TestEntitySingleLink');
(function (TestEntity) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntity);
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.KEY_PROPERTY_GUID = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyGuid',
    'Edm.Guid',
    false
  );
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.INT_32_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int32Property',
    'Edm.Int32',
    true
  );
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.INT_64_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int64Property',
    'Edm.Int64',
    true
  );
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DECIMAL_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DecimalProperty',
    'Edm.Decimal',
    true
  );
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.SINGLE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'SingleProperty',
    'Edm.Single',
    true
  );
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DOUBLE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DoubleProperty',
    'Edm.Double',
    true
  );
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.FLOAT_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'FloatProperty',
    'Edm.Float',
    true
  );
  /**
   * Static representation of the [[timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.TIME_OF_DAY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'TimeOfDayProperty',
    'Edm.TimeOfDay',
    true
  );
  /**
   * Static representation of the [[dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DATE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DateProperty',
    'Edm.Date',
    true
  );
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DATE_TIME_OFF_SET_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DateTimeOffSetProperty',
    'Edm.DateTimeOffset',
    true
  );
  /**
   * Static representation of the [[durationProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DURATION_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DurationProperty',
    'Edm.Duration',
    true
  );
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.BYTE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'ByteProperty',
    'Edm.Byte',
    true
  );
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.S_BYTE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'SByteProperty',
    'Edm.SByte',
    true
  );
  /**
   * Static representation of the [[geographyPointProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.GEOGRAPHY_POINT_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GeographyPointProperty',
    'Edm.Any',
    true
  );
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT =
    _fieldBuilder.buildEdmTypeField(
      'SomethingTheSDKDoesNotSupport',
      'Edm.Any',
      true
    );
  /**
   * Static representation of the [[collectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.COLLECTION_PROPERTY = _fieldBuilder.buildCollectionField(
    'CollectionProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    TestComplexType_1.TestComplexTypeField,
    true
  );
  /**
   * Static representation of the [[complexTypeCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.COMPLEX_TYPE_COLLECTION_PROPERTY =
    _fieldBuilder.buildCollectionField(
      'ComplexTypeCollectionProperty',
      TestComplexType_1.TestComplexType,
      true
    );
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.ENUM_PROPERTY = _fieldBuilder.buildEnumField(
    'EnumProperty',
    TestEnumType_1.TestEnumType,
    true
  );
  /**
   * Static representation of the [[enumPropertyInt64]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.ENUM_PROPERTY_INT_64 = _fieldBuilder.buildEnumField(
    'EnumPropertyInt64',
    TestEnumTypeInt64_1.TestEnumTypeInt64,
    true
  );
  /**
   * Static representation of the [[enumPropertyWithOneMember]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.ENUM_PROPERTY_WITH_ONE_MEMBER = _fieldBuilder.buildEnumField(
    'EnumPropertyWithOneMember',
    TestEnumTypeWithOneMember_1.TestEnumTypeWithOneMember,
    true
  );
  /**
   * Static representation of the [[enumCollectionProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.ENUM_COLLECTION_PROPERTY = _fieldBuilder.buildCollectionField(
    'EnumCollectionProperty',
    TestEnumType_1.TestEnumType,
    true
  );
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.TO_MULTI_LINK = new core_1.OneToManyLink(
    'to_MultiLink',
    TestEntity,
    TestEntityMultiLink_1.TestEntityMultiLink
  );
  /**
   * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.TO_OTHER_MULTI_LINK = new core_1.OneToManyLink(
    'to_OtherMultiLink',
    TestEntity,
    TestEntityMultiLink_1.TestEntityMultiLink
  );
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.TO_SINGLE_LINK = new core_1.OneToOneLink(
    'to_SingleLink',
    TestEntity,
    TestEntitySingleLink_1.TestEntitySingleLink
  );
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
    TestEntity.ENUM_PROPERTY,
    TestEntity.ENUM_PROPERTY_INT_64,
    TestEntity.ENUM_PROPERTY_WITH_ONE_MEMBER,
    TestEntity.ENUM_COLLECTION_PROPERTY,
    TestEntity.TO_MULTI_LINK,
    TestEntity.TO_OTHER_MULTI_LINK,
    TestEntity.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  TestEntity.ALL_FIELDS = new core_1.AllFields('*', TestEntity);
  /**
   * All key fields of the TestEntity entity.
   */
  TestEntity._keyFields = [
    TestEntity.KEY_PROPERTY_GUID,
    TestEntity.KEY_PROPERTY_STRING
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntity.
   */
  TestEntity._keys = TestEntity._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity = exports.TestEntity || (exports.TestEntity = {})));
exports.TestEntity = TestEntity;
//# sourceMappingURL=TestEntity.js.map
