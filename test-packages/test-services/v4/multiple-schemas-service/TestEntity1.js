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
exports.TestEntity1 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntity1RequestBuilder_1 = require('./TestEntity1RequestBuilder');
var TestComplexType1_1 = require('./TestComplexType1');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntity1" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
var TestEntity1 = /** @class */ (function (_super) {
  __extends(TestEntity1, _super);
  function TestEntity1() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntity1`.
   * @returns A builder that constructs instances of entity type `TestEntity1`.
   */
  TestEntity1.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntity1);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity1` entity type.
   * @returns A `TestEntity1` request builder.
   */
  TestEntity1.requestBuilder = function () {
    return new TestEntity1RequestBuilder_1.TestEntity1RequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity1`.
   */
  TestEntity1.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, TestEntity1);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntity1.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntity1.
   */
  TestEntity1._entityName = 'A_TestEntity1';
  /**
   * Default url path for the according service.
   */
  TestEntity1._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntity1;
})(core_1.EntityV4);
exports.TestEntity1 = TestEntity1;
(function (TestEntity1) {
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity1.KEY_PROPERTY_STRING = new core_1.StringField(
    'KeyPropertyString',
    TestEntity1,
    'Edm.String'
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity1.INT_16_PROPERTY = new core_1.NumberField(
    'Int16Property',
    TestEntity1,
    'Edm.Int16'
  );
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity1.ENUM_PROPERTY = new core_1.EnumField('EnumProperty', TestEntity1);
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity1.COMPLEX_TYPE_PROPERTY =
    new TestComplexType1_1.TestComplexType1Field(
      'ComplexTypeProperty',
      TestEntity1
    );
  /**
   * All fields of the TestEntity1 entity.
   */
  TestEntity1._allFields = [
    TestEntity1.KEY_PROPERTY_STRING,
    TestEntity1.INT_16_PROPERTY,
    TestEntity1.ENUM_PROPERTY,
    TestEntity1.COMPLEX_TYPE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntity1.ALL_FIELDS = new core_1.AllFields('*', TestEntity1);
  /**
   * All key fields of the TestEntity1 entity.
   */
  TestEntity1._keyFields = [TestEntity1.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity1.
   */
  TestEntity1._keys = TestEntity1._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity1 = exports.TestEntity1 || (exports.TestEntity1 = {})));
exports.TestEntity1 = TestEntity1;
//# sourceMappingURL=TestEntity1.js.map
