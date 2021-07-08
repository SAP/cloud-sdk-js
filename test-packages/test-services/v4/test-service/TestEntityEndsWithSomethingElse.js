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
exports.TestEntityEndsWithSomethingElse = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityEndsWithSomethingElseRequestBuilder_1 = require('./TestEntityEndsWithSomethingElseRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityEndsWithSomethingElse" of service "API_TEST_SRV".
 */
var TestEntityEndsWithSomethingElse = /** @class */ (function (_super) {
  __extends(TestEntityEndsWithSomethingElse, _super);
  function TestEntityEndsWithSomethingElse() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityEndsWithSomethingElse`.
   * @returns A builder that constructs instances of entity type `TestEntityEndsWithSomethingElse`.
   */
  TestEntityEndsWithSomethingElse.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntityEndsWithSomethingElse);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityEndsWithSomethingElse` entity type.
   * @returns A `TestEntityEndsWithSomethingElse` request builder.
   */
  TestEntityEndsWithSomethingElse.requestBuilder = function () {
    return new TestEntityEndsWithSomethingElseRequestBuilder_1.TestEntityEndsWithSomethingElseRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityEndsWithSomethingElse`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityEndsWithSomethingElse`.
   */
  TestEntityEndsWithSomethingElse.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(
      fieldName,
      TestEntityEndsWithSomethingElse
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityEndsWithSomethingElse.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityEndsWithSomethingElse.
   */
  TestEntityEndsWithSomethingElse._entityName =
    'A_TestEntityEndsWithSomethingElse';
  /**
   * Default url path for the according service.
   */
  TestEntityEndsWithSomethingElse._defaultServicePath =
    '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityEndsWithSomethingElse;
})(core_1.EntityV4);
exports.TestEntityEndsWithSomethingElse = TestEntityEndsWithSomethingElse;
(function (TestEntityEndsWithSomethingElse) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityEndsWithSomethingElse);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityEndsWithSomethingElse.KEY_PROPERTY =
    _fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false);
  /**
   * All fields of the TestEntityEndsWithSomethingElse entity.
   */
  TestEntityEndsWithSomethingElse._allFields = [
    TestEntityEndsWithSomethingElse.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityEndsWithSomethingElse.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityEndsWithSomethingElse
  );
  /**
   * All key fields of the TestEntityEndsWithSomethingElse entity.
   */
  TestEntityEndsWithSomethingElse._keyFields = [
    TestEntityEndsWithSomethingElse.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityEndsWithSomethingElse.
   */
  TestEntityEndsWithSomethingElse._keys =
    TestEntityEndsWithSomethingElse._keyFields.reduce(function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityEndsWithSomethingElse =
    exports.TestEntityEndsWithSomethingElse ||
    (exports.TestEntityEndsWithSomethingElse = {}))
);
exports.TestEntityEndsWithSomethingElse = TestEntityEndsWithSomethingElse;
//# sourceMappingURL=TestEntityEndsWithSomethingElse.js.map
