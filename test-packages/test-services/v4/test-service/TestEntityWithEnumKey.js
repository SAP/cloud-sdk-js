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
exports.TestEntityWithEnumKey = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityWithEnumKeyRequestBuilder_1 = require('./TestEntityWithEnumKeyRequestBuilder');
var TestEnumType_1 = require('./TestEnumType');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityWithEnumKey" of service "API_TEST_SRV".
 */
var TestEntityWithEnumKey = /** @class */ (function (_super) {
  __extends(TestEntityWithEnumKey, _super);
  function TestEntityWithEnumKey() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityWithEnumKey`.
   * @returns A builder that constructs instances of entity type `TestEntityWithEnumKey`.
   */
  TestEntityWithEnumKey.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntityWithEnumKey);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithEnumKey` entity type.
   * @returns A `TestEntityWithEnumKey` request builder.
   */
  TestEntityWithEnumKey.requestBuilder = function () {
    return new TestEntityWithEnumKeyRequestBuilder_1.TestEntityWithEnumKeyRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithEnumKey`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithEnumKey`.
   */
  TestEntityWithEnumKey.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(
      fieldName,
      TestEntityWithEnumKey
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityWithEnumKey.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityWithEnumKey.
   */
  TestEntityWithEnumKey._entityName = 'A_TestEntityWithEnumKey';
  /**
   * Default url path for the according service.
   */
  TestEntityWithEnumKey._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityWithEnumKey;
})(core_1.EntityV4);
exports.TestEntityWithEnumKey = TestEntityWithEnumKey;
(function (TestEntityWithEnumKey) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityWithEnumKey);
  /**
   * Static representation of the [[keyPropertyEnum1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityWithEnumKey.KEY_PROPERTY_ENUM_1 = _fieldBuilder.buildEnumField(
    'KeyPropertyEnum1',
    TestEnumType_1.TestEnumType,
    false
  );
  /**
   * All fields of the TestEntityWithEnumKey entity.
   */
  TestEntityWithEnumKey._allFields = [
    TestEntityWithEnumKey.KEY_PROPERTY_ENUM_1
  ];
  /**
   * All fields selector.
   */
  TestEntityWithEnumKey.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityWithEnumKey
  );
  /**
   * All key fields of the TestEntityWithEnumKey entity.
   */
  TestEntityWithEnumKey._keyFields = [
    TestEntityWithEnumKey.KEY_PROPERTY_ENUM_1
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithEnumKey.
   */
  TestEntityWithEnumKey._keys = TestEntityWithEnumKey._keyFields.reduce(
    function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityWithEnumKey =
    exports.TestEntityWithEnumKey || (exports.TestEntityWithEnumKey = {}))
);
exports.TestEntityWithEnumKey = TestEntityWithEnumKey;
//# sourceMappingURL=TestEntityWithEnumKey.js.map
