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
exports.TestEntityEndsWith = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityEndsWithRequestBuilder_1 = require('./TestEntityEndsWithRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityEndsWithCollection" of service "API_TEST_SRV".
 */
var TestEntityEndsWith = /** @class */ (function (_super) {
  __extends(TestEntityEndsWith, _super);
  function TestEntityEndsWith() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityEndsWith`.
   * @returns A builder that constructs instances of entity type `TestEntityEndsWith`.
   */
  TestEntityEndsWith.builder = function () {
    return core_1.EntityV2.entityBuilder(TestEntityEndsWith);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityEndsWith` entity type.
   * @returns A `TestEntityEndsWith` request builder.
   */
  TestEntityEndsWith.requestBuilder = function () {
    return new TestEntityEndsWithRequestBuilder_1.TestEntityEndsWithRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityEndsWith`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityEndsWith`.
   */
  TestEntityEndsWith.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(fieldName, TestEntityEndsWith);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityEndsWith.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityEndsWith.
   */
  TestEntityEndsWith._entityName = 'A_TestEntityEndsWithCollection';
  /**
   * Default url path for the according service.
   */
  TestEntityEndsWith._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityEndsWith;
})(core_1.EntityV2);
exports.TestEntityEndsWith = TestEntityEndsWith;
(function (TestEntityEndsWith) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityEndsWith);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityEndsWith.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the TestEntityEndsWith entity.
   */
  TestEntityEndsWith._allFields = [TestEntityEndsWith.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  TestEntityEndsWith.ALL_FIELDS = new core_1.AllFields('*', TestEntityEndsWith);
  /**
   * All key fields of the TestEntityEndsWith entity.
   */
  TestEntityEndsWith._keyFields = [TestEntityEndsWith.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityEndsWith.
   */
  TestEntityEndsWith._keys = TestEntityEndsWith._keyFields.reduce(function (
    acc,
    field
  ) {
    acc[field._fieldName] = field;
    return acc;
  },
  {});
})(
  (TestEntityEndsWith =
    exports.TestEntityEndsWith || (exports.TestEntityEndsWith = {}))
);
exports.TestEntityEndsWith = TestEntityEndsWith;
//# sourceMappingURL=TestEntityEndsWith.js.map
