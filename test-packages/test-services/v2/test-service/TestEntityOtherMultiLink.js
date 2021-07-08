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
exports.TestEntityOtherMultiLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityOtherMultiLinkRequestBuilder_1 = require('./TestEntityOtherMultiLinkRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityOtherMultiLink" of service "API_TEST_SRV".
 */
var TestEntityOtherMultiLink = /** @class */ (function (_super) {
  __extends(TestEntityOtherMultiLink, _super);
  function TestEntityOtherMultiLink() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityOtherMultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityOtherMultiLink`.
   */
  TestEntityOtherMultiLink.builder = function () {
    return core_1.EntityV2.entityBuilder(TestEntityOtherMultiLink);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityOtherMultiLink` entity type.
   * @returns A `TestEntityOtherMultiLink` request builder.
   */
  TestEntityOtherMultiLink.requestBuilder = function () {
    return new TestEntityOtherMultiLinkRequestBuilder_1.TestEntityOtherMultiLinkRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityOtherMultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityOtherMultiLink`.
   */
  TestEntityOtherMultiLink.customField = function (fieldName) {
    return core_1.EntityV2.customFieldSelector(
      fieldName,
      TestEntityOtherMultiLink
    );
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityOtherMultiLink.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityOtherMultiLink.
   */
  TestEntityOtherMultiLink._entityName = 'A_TestEntityOtherMultiLink';
  /**
   * Default url path for the according service.
   */
  TestEntityOtherMultiLink._defaultServicePath =
    '/sap/opu/odata/sap/API_TEST_SRV';
  return TestEntityOtherMultiLink;
})(core_1.EntityV2);
exports.TestEntityOtherMultiLink = TestEntityOtherMultiLink;
(function (TestEntityOtherMultiLink) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityOtherMultiLink);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityOtherMultiLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the TestEntityOtherMultiLink entity.
   */
  TestEntityOtherMultiLink._allFields = [TestEntityOtherMultiLink.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  TestEntityOtherMultiLink.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityOtherMultiLink
  );
  /**
   * All key fields of the TestEntityOtherMultiLink entity.
   */
  TestEntityOtherMultiLink._keyFields = [TestEntityOtherMultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityOtherMultiLink.
   */
  TestEntityOtherMultiLink._keys = TestEntityOtherMultiLink._keyFields.reduce(
    function (acc, field) {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityOtherMultiLink =
    exports.TestEntityOtherMultiLink || (exports.TestEntityOtherMultiLink = {}))
);
exports.TestEntityOtherMultiLink = TestEntityOtherMultiLink;
//# sourceMappingURL=TestEntityOtherMultiLink.js.map
