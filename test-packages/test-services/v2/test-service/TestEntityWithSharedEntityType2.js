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
exports.TestEntityWithSharedEntityType2 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityWithSharedEntityType2RequestBuilder_1 = require('./TestEntityWithSharedEntityType2RequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityWithSharedEntityType2" of service "API_TEST_SRV".
 */
var TestEntityWithSharedEntityType2 = /** @class */ (function (_super) {
  __extends(TestEntityWithSharedEntityType2, _super);
  function TestEntityWithSharedEntityType2() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityWithSharedEntityType2`.
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType2`.
   */
  TestEntityWithSharedEntityType2.builder = function () {
    return core_1.EntityV2.entityBuilder(TestEntityWithSharedEntityType2);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithSharedEntityType2` entity type.
   * @returns A `TestEntityWithSharedEntityType2` request builder.
   */
  TestEntityWithSharedEntityType2.requestBuilder = function () {
    return new TestEntityWithSharedEntityType2RequestBuilder_1.TestEntityWithSharedEntityType2RequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithSharedEntityType2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType2`.
   */
  TestEntityWithSharedEntityType2.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(
      fieldName,
      TestEntityWithSharedEntityType2
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityWithSharedEntityType2.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityWithSharedEntityType2.
   */
  TestEntityWithSharedEntityType2._entityName =
    'A_TestEntityWithSharedEntityType2';
  /**
   * Default url path for the according service.
   */
  TestEntityWithSharedEntityType2._defaultServicePath =
    '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityWithSharedEntityType2;
})(core_1.EntityV2);
exports.TestEntityWithSharedEntityType2 = TestEntityWithSharedEntityType2;
(function (TestEntityWithSharedEntityType2) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityWithSharedEntityType2);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityWithSharedEntityType2.KEY_PROPERTY =
    _fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false);
  /**
   * All fields of the TestEntityWithSharedEntityType2 entity.
   */
  TestEntityWithSharedEntityType2._allFields = [
    TestEntityWithSharedEntityType2.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityWithSharedEntityType2.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityWithSharedEntityType2
  );
  /**
   * All key fields of the TestEntityWithSharedEntityType2 entity.
   */
  TestEntityWithSharedEntityType2._keyFields = [
    TestEntityWithSharedEntityType2.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithSharedEntityType2.
   */
  TestEntityWithSharedEntityType2._keys =
    TestEntityWithSharedEntityType2._keyFields.reduce(function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityWithSharedEntityType2 =
    exports.TestEntityWithSharedEntityType2 ||
    (exports.TestEntityWithSharedEntityType2 = {}))
);
exports.TestEntityWithSharedEntityType2 = TestEntityWithSharedEntityType2;
//# sourceMappingURL=TestEntityWithSharedEntityType2.js.map
