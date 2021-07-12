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
exports.TestEntity4 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntity4RequestBuilder_1 = require('./TestEntity4RequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntity4" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
var TestEntity4 = /** @class */ (function (_super) {
  __extends(TestEntity4, _super);
  function TestEntity4() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntity4`.
   * @returns A builder that constructs instances of entity type `TestEntity4`.
   */
  TestEntity4.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntity4);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity4` entity type.
   * @returns A `TestEntity4` request builder.
   */
  TestEntity4.requestBuilder = function () {
    return new TestEntity4RequestBuilder_1.TestEntity4RequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity4`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity4`.
   */
  TestEntity4.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, TestEntity4);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntity4.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntity4.
   */
  TestEntity4._entityName = 'A_TestEntity4';
  /**
   * Default url path for the according service.
   */
  TestEntity4._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntity4;
})(core_1.EntityV4);
exports.TestEntity4 = TestEntity4;
(function (TestEntity4) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntity4);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity4.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity4.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * All fields of the TestEntity4 entity.
   */
  TestEntity4._allFields = [
    TestEntity4.KEY_PROPERTY_STRING,
    TestEntity4.BOOLEAN_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntity4.ALL_FIELDS = new core_1.AllFields('*', TestEntity4);
  /**
   * All key fields of the TestEntity4 entity.
   */
  TestEntity4._keyFields = [TestEntity4.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity4.
   */
  TestEntity4._keys = TestEntity4._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity4 = exports.TestEntity4 || (exports.TestEntity4 = {})));
exports.TestEntity4 = TestEntity4;
//# sourceMappingURL=TestEntity4.js.map
