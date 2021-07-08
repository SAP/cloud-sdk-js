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
exports.TestEntityWithSharedEntityType1 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityWithSharedEntityType1RequestBuilder_1 = require('./TestEntityWithSharedEntityType1RequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityWithSharedEntityType1" of service "API_TEST_SRV".
 */
var TestEntityWithSharedEntityType1 = /** @class */ (function (_super) {
  __extends(TestEntityWithSharedEntityType1, _super);
  function TestEntityWithSharedEntityType1() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityWithSharedEntityType1`.
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType1`.
   */
  TestEntityWithSharedEntityType1.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntityWithSharedEntityType1);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithSharedEntityType1` entity type.
   * @returns A `TestEntityWithSharedEntityType1` request builder.
   */
  TestEntityWithSharedEntityType1.requestBuilder = function () {
    return new TestEntityWithSharedEntityType1RequestBuilder_1.TestEntityWithSharedEntityType1RequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithSharedEntityType1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType1`.
   */
  TestEntityWithSharedEntityType1.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(
      fieldName,
      TestEntityWithSharedEntityType1
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityWithSharedEntityType1.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityWithSharedEntityType1.
   */
  TestEntityWithSharedEntityType1._entityName =
    'A_TestEntityWithSharedEntityType1';
  /**
   * Default url path for the according service.
   */
  TestEntityWithSharedEntityType1._defaultServicePath =
    '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityWithSharedEntityType1;
})(core_1.EntityV4);
exports.TestEntityWithSharedEntityType1 = TestEntityWithSharedEntityType1;
(function (TestEntityWithSharedEntityType1) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityWithSharedEntityType1);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityWithSharedEntityType1.KEY_PROPERTY =
    _fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false);
  /**
   * All fields of the TestEntityWithSharedEntityType1 entity.
   */
  TestEntityWithSharedEntityType1._allFields = [
    TestEntityWithSharedEntityType1.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityWithSharedEntityType1.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityWithSharedEntityType1
  );
  /**
   * All key fields of the TestEntityWithSharedEntityType1 entity.
   */
  TestEntityWithSharedEntityType1._keyFields = [
    TestEntityWithSharedEntityType1.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithSharedEntityType1.
   */
  TestEntityWithSharedEntityType1._keys =
    TestEntityWithSharedEntityType1._keyFields.reduce(function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityWithSharedEntityType1 =
    exports.TestEntityWithSharedEntityType1 ||
    (exports.TestEntityWithSharedEntityType1 = {}))
);
exports.TestEntityWithSharedEntityType1 = TestEntityWithSharedEntityType1;
//# sourceMappingURL=TestEntityWithSharedEntityType1.js.map
