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
exports.TestEntityLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var TestEntityLinkRequestBuilder_1 = require('./TestEntityLinkRequestBuilder');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "TestEntityLink" of service "TestService".
 */
var TestEntityLink = /** @class */ (function (_super) {
  __extends(TestEntityLink, _super);
  function TestEntityLink() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `TestEntityLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLink`.
   */
  TestEntityLink.builder = function () {
    return core_1.EntityV4.entityBuilder(TestEntityLink);
  };
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLink` entity type.
   * @returns A `TestEntityLink` request builder.
   */
  TestEntityLink.requestBuilder = function () {
    return new TestEntityLinkRequestBuilder_1.TestEntityLinkRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLink`.
   */
  TestEntityLink.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, TestEntityLink);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  TestEntityLink.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for TestEntityLink.
   */
  TestEntityLink._entityName = 'TestEntityLink';
  /**
   * Default url path for the according service.
   */
  TestEntityLink._defaultServicePath = '/odata/test-service';
  return TestEntityLink;
})(core_1.EntityV4);
exports.TestEntityLink = TestEntityLink;
(function (TestEntityLink) {
  var _fieldBuilder = new core_1.FieldBuilder(TestEntityLink);
  /**
   * Static representation of the [[keyTestEntityLink]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLink.KEY_TEST_ENTITY_LINK = _fieldBuilder.buildEdmTypeField(
    'KeyTestEntityLink',
    'Edm.Int32',
    false
  );
  /**
   * Static representation of the [[keyToTestEntity]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLink.KEY_TO_TEST_ENTITY = _fieldBuilder.buildEdmTypeField(
    'KeyToTestEntity',
    'Edm.Int32',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * All fields of the TestEntityLink entity.
   */
  TestEntityLink._allFields = [
    TestEntityLink.KEY_TEST_ENTITY_LINK,
    TestEntityLink.KEY_TO_TEST_ENTITY,
    TestEntityLink.STRING_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityLink.ALL_FIELDS = new core_1.AllFields('*', TestEntityLink);
  /**
   * All key fields of the TestEntityLink entity.
   */
  TestEntityLink._keyFields = [
    TestEntityLink.KEY_TEST_ENTITY_LINK,
    TestEntityLink.KEY_TO_TEST_ENTITY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLink.
   */
  TestEntityLink._keys = TestEntityLink._keyFields.reduce(function (
    acc,
    field
  ) {
    acc[field._fieldName] = field;
    return acc;
  },
  {});
})((TestEntityLink = exports.TestEntityLink || (exports.TestEntityLink = {})));
exports.TestEntityLink = TestEntityLink;
//# sourceMappingURL=TestEntityLink.js.map
