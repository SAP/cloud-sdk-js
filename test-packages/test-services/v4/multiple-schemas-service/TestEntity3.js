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
exports.TestEntity3 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntity3RequestBuilder_1 = require('./TestEntity3RequestBuilder');
var TestComplexType2_1 = require('./TestComplexType2');
var TestEnumType2_1 = require('./TestEnumType2');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntity3" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
var TestEntity3 = /** @class */ (function (_super) {
  __extends(TestEntity3, _super);
  function TestEntity3() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntity3`.
   * @returns A builder that constructs instances of entity type `TestEntity3`.
   */
  TestEntity3.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntity3);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity3` entity type.
   * @returns A `TestEntity3` request builder.
   */
  TestEntity3.requestBuilder = function () {
    return new TestEntity3RequestBuilder_1.TestEntity3RequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity3`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity3`.
   */
  TestEntity3.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, TestEntity3);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntity3.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntity3.
   */
  TestEntity3._entityName = 'A_TestEntity3';
  /**
   * Default url path for the according service.
   */
  TestEntity3._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntity3;
})(core_1.EntityV4);
exports.TestEntity3 = TestEntity3;
(function (TestEntity3) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntity3);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity3.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity3.ENUM_PROPERTY = _fieldBuilder.buildEnumField(
    'EnumProperty',
    TestEnumType2_1.TestEnumType2,
    true
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity3.COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    TestComplexType2_1.TestComplexType2Field,
    true
  );
  /**
   * All fields of the TestEntity3 entity.
   */
  TestEntity3._allFields = [
    TestEntity3.KEY_PROPERTY_STRING,
    TestEntity3.ENUM_PROPERTY,
    TestEntity3.COMPLEX_TYPE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntity3.ALL_FIELDS = new core_1.AllFields('*', TestEntity3);
  /**
   * All key fields of the TestEntity3 entity.
   */
  TestEntity3._keyFields = [TestEntity3.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity3.
   */
  TestEntity3._keys = TestEntity3._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity3 = exports.TestEntity3 || (exports.TestEntity3 = {})));
exports.TestEntity3 = TestEntity3;
//# sourceMappingURL=TestEntity3.js.map
