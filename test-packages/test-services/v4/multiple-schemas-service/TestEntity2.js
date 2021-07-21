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
exports.TestEntity2 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntity2RequestBuilder_1 = require('./TestEntity2RequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntity2" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
var TestEntity2 = /** @class */ (function (_super) {
  __extends(TestEntity2, _super);
  function TestEntity2() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntity2`.
   * @returns A builder that constructs instances of entity type `TestEntity2`.
   */
  TestEntity2.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntity2);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity2` entity type.
   * @returns A `TestEntity2` request builder.
   */
  TestEntity2.requestBuilder = function () {
    return new TestEntity2RequestBuilder_1.TestEntity2RequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity2`.
   */
  TestEntity2.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, TestEntity2);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntity2.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntity2.
   */
  TestEntity2._entityName = 'A_TestEntity2';
  /**
   * Default url path for the according service.
   */
  TestEntity2._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntity2;
})(core_1.EntityV4);
exports.TestEntity2 = TestEntity2;
(function (TestEntity2) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntity2);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity2.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity2.SINGLE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'SingleProperty',
    'Edm.Single',
    true
  );
  /**
   * All fields of the TestEntity2 entity.
   */
  TestEntity2._allFields = [
    TestEntity2.KEY_PROPERTY_STRING,
    TestEntity2.SINGLE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntity2.ALL_FIELDS = new core_1.AllFields('*', TestEntity2);
  /**
   * All key fields of the TestEntity2 entity.
   */
  TestEntity2._keyFields = [TestEntity2.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity2.
   */
  TestEntity2._keys = TestEntity2._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity2 = exports.TestEntity2 || (exports.TestEntity2 = {})));
exports.TestEntity2 = TestEntity2;
//# sourceMappingURL=TestEntity2.js.map
