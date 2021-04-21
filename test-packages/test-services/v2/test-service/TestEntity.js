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
    return core_1.EntityV2.entityBuilder(TestEntity);
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
    return core_1.EntityV2.customFieldSelector(fieldName, TestEntity);
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
})(core_1.EntityV2);
exports.TestEntity = TestEntity;
var TestEntityMultiLink_1 = require('./TestEntityMultiLink');
var TestEntityOtherMultiLink_1 = require('./TestEntityOtherMultiLink');
var TestEntitySingleLink_1 = require('./TestEntitySingleLink');
(function (TestEntity) {
  /**
   * Static representation of the [[keyPropertyGuid]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.KEY_PROPERTY_GUID = new core_1.StringField(
    'KeyPropertyGuid',
    TestEntity,
    'Edm.Guid'
  );
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.KEY_PROPERTY_STRING = new core_1.StringField(
    'KeyPropertyString',
    TestEntity,
    'Edm.String'
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.STRING_PROPERTY = new core_1.StringField(
    'StringProperty',
    TestEntity,
    'Edm.String'
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.BOOLEAN_PROPERTY = new core_1.BooleanField(
    'BooleanProperty',
    TestEntity,
    'Edm.Boolean'
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.GUID_PROPERTY = new core_1.StringField(
    'GuidProperty',
    TestEntity,
    'Edm.Guid'
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.INT_16_PROPERTY = new core_1.NumberField(
    'Int16Property',
    TestEntity,
    'Edm.Int16'
  );
  /**
   * Static representation of the [[int32Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.INT_32_PROPERTY = new core_1.NumberField(
    'Int32Property',
    TestEntity,
    'Edm.Int32'
  );
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.INT_64_PROPERTY = new core_1.BigNumberField(
    'Int64Property',
    TestEntity,
    'Edm.Int64'
  );
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DECIMAL_PROPERTY = new core_1.BigNumberField(
    'DecimalProperty',
    TestEntity,
    'Edm.Decimal'
  );
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.SINGLE_PROPERTY = new core_1.NumberField(
    'SingleProperty',
    TestEntity,
    'Edm.Single'
  );
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DOUBLE_PROPERTY = new core_1.NumberField(
    'DoubleProperty',
    TestEntity,
    'Edm.Double'
  );
  /**
   * Static representation of the [[floatProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.FLOAT_PROPERTY = new core_1.NumberField(
    'FloatProperty',
    TestEntity,
    'Edm.Float'
  );
  /**
   * Static representation of the [[timeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.TIME_PROPERTY = new core_1.TimeField(
    'TimeProperty',
    TestEntity,
    'Edm.Time'
  );
  /**
   * Static representation of the [[dateTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DATE_TIME_PROPERTY = new core_1.DateField(
    'DateTimeProperty',
    TestEntity,
    'Edm.DateTime'
  );
  /**
   * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DATE_TIME_OFF_SET_PROPERTY = new core_1.DateField(
    'DateTimeOffSetProperty',
    TestEntity,
    'Edm.DateTimeOffset'
  );
  /**
   * Static representation of the [[byteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.BYTE_PROPERTY = new core_1.NumberField(
    'ByteProperty',
    TestEntity,
    'Edm.Byte'
  );
  /**
   * Static representation of the [[sByteProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.S_BYTE_PROPERTY = new core_1.NumberField(
    'SByteProperty',
    TestEntity,
    'Edm.SByte'
  );
  /**
   * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT = new core_1.AnyField(
    'SomethingTheSDKDoesNotSupport',
    TestEntity,
    'Edm.Any'
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.COMPLEX_TYPE_PROPERTY = new TestComplexType_1.TestComplexTypeField(
    'ComplexTypeProperty',
    TestEntity
  );
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.TO_MULTI_LINK = new core_1.Link(
    'to_MultiLink',
    TestEntity,
    TestEntityMultiLink_1.TestEntityMultiLink
  );
  /**
   * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.TO_OTHER_MULTI_LINK = new core_1.Link(
    'to_OtherMultiLink',
    TestEntity,
    TestEntityOtherMultiLink_1.TestEntityOtherMultiLink
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
    TestEntity.TIME_PROPERTY,
    TestEntity.DATE_TIME_PROPERTY,
    TestEntity.DATE_TIME_OFF_SET_PROPERTY,
    TestEntity.BYTE_PROPERTY,
    TestEntity.S_BYTE_PROPERTY,
    TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
    TestEntity.COMPLEX_TYPE_PROPERTY,
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
