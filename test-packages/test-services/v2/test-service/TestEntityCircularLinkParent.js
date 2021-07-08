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
exports.TestEntityCircularLinkParent = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityCircularLinkParentRequestBuilder_1 = require('./TestEntityCircularLinkParentRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityCircularLinkParent" of service "API_TEST_SRV".
 */
var TestEntityCircularLinkParent = /** @class */ (function (_super) {
  __extends(TestEntityCircularLinkParent, _super);
  function TestEntityCircularLinkParent() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityCircularLinkParent`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkParent`.
   */
  TestEntityCircularLinkParent.builder = function () {
    return core_1.EntityV2.entityBuilder(TestEntityCircularLinkParent);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityCircularLinkParent` entity type.
   * @returns A `TestEntityCircularLinkParent` request builder.
   */
  TestEntityCircularLinkParent.requestBuilder = function () {
    return new TestEntityCircularLinkParentRequestBuilder_1.TestEntityCircularLinkParentRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityCircularLinkParent`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkParent`.
   */
  TestEntityCircularLinkParent.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(
      fieldName,
      TestEntityCircularLinkParent
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityCircularLinkParent.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityCircularLinkParent.
   */
  TestEntityCircularLinkParent._entityName = 'A_TestEntityCircularLinkParent';
  /**
   * Default url path for the according service.
   */
  TestEntityCircularLinkParent._defaultServicePath =
    '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityCircularLinkParent;
})(core_1.EntityV2);
exports.TestEntityCircularLinkParent = TestEntityCircularLinkParent;
var TestEntityCircularLinkChild_1 = require('./TestEntityCircularLinkChild');
(function (TestEntityCircularLinkParent) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityCircularLinkParent);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityCircularLinkParent.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the one-to-many navigation property [[toChild]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityCircularLinkParent.TO_CHILD = new core_1.Link(
    'to_Child',
    TestEntityCircularLinkParent,
    TestEntityCircularLinkChild_1.TestEntityCircularLinkChild
  );
  /**
   * All fields of the TestEntityCircularLinkParent entity.
   */
  TestEntityCircularLinkParent._allFields = [
    TestEntityCircularLinkParent.KEY_PROPERTY,
    TestEntityCircularLinkParent.TO_CHILD
  ];
  /**
   * All fields selector.
   */
  TestEntityCircularLinkParent.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityCircularLinkParent
  );
  /**
   * All key fields of the TestEntityCircularLinkParent entity.
   */
  TestEntityCircularLinkParent._keyFields = [
    TestEntityCircularLinkParent.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkParent.
   */
  TestEntityCircularLinkParent._keys =
    TestEntityCircularLinkParent._keyFields.reduce(function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityCircularLinkParent =
    exports.TestEntityCircularLinkParent ||
    (exports.TestEntityCircularLinkParent = {}))
);
exports.TestEntityCircularLinkParent = TestEntityCircularLinkParent;
//# sourceMappingURL=TestEntityCircularLinkParent.js.map
